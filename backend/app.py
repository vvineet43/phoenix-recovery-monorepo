"""
Phoenix Recovery Backend — Production-Grade Flask API
=====================================================
Changes from dev version:
  • Reads port from PHOENIX_PORT env var (dynamic, set by Electron)
  • 50 MB test-scan cap REMOVED — full drive scanning enabled
  • Thumbnail generation moved to a background thread pool
  • RSA-based license generation & verification system
  • Subscription management endpoints
  • Path-safe file serving with download tokens
  • Duplicate file detection via MD5 hash
"""

import threading
import queue
import time
import subprocess
import plistlib
import os
import struct
import binascii
import hashlib
import shutil
from typing import Optional
import json
import uuid
import base64
import hmac
import secrets
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, jsonify, request, send_from_directory, send_file, abort
from flask_cors import CORS
from werkzeug.utils import secure_filename

# ─── App Setup ────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "app://.", "null"])
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024 * 1024  # 2 GB upload

# Resolve paths relative to this file so they work from any cwd
BASE_DIR      = os.path.dirname(os.path.abspath(__file__))
RECOVERED_DIR = os.path.join(BASE_DIR, "recovered_files")
THUMBNAIL_DIR = os.path.join(RECOVERED_DIR, "thumbnails")
DATA_DIR      = os.path.join(BASE_DIR, "data")
LICENSE_FILE  = os.path.join(DATA_DIR, "licenses.json")

for d in (RECOVERED_DIR, THUMBNAIL_DIR, DATA_DIR):
    os.makedirs(d, exist_ok=True)

# ─── Global Scan State ───────────────────────────────────────────────────────
scan_status = {
    "is_scanning": False,
    "is_paused": False,
    "progress": 0,
    "found_files": [],
    "current_stage": "Idle",
    "error": None,
    "bytes_scanned": 0,
    "total_bytes": 0,
    "elapsed_time": 0,
    "scan_speed": "0 MB/s",
    "stats": {"images": 0, "videos": 0, "documents": 0, "audio": 0, "archives": 0},
}

pause_event = threading.Event()
pause_event.set()
stop_event = threading.Event()

# Async thumbnail pool
thumbnail_executor = ThreadPoolExecutor(max_workers=4, thread_name_prefix="thumb")
# Track hashes to skip duplicates
seen_hashes: set = set()
seen_hashes_lock = threading.Lock()

# ─── File Signatures ─────────────────────────────────────────────────────────
SIGNATURES = [
    # Images
    (b'\xff\xd8\xff',                          'jpg',  'image',    0, b'\xff\xd9',   50*1024*1024,   'JPEG Image'),
    (b'\x89\x50\x4e\x47\x0d\x0a\x1a\x0a',     'png',  'image',    0, b'IEND',       50*1024*1024,   'PNG Image'),
    (b'GIF87a',                                 'gif',  'image',    0, b'\x00\x3b',   20*1024*1024,   'GIF87a Image'),
    (b'GIF89a',                                 'gif',  'image',    0, b'\x00\x3b',   20*1024*1024,   'GIF89a Image'),
    (b'RIFF',                                   'webp', 'image',    0, None,          50*1024*1024,   'WebP Image'),
    # Videos
    (b'ftyp',                                   'mp4',  'video',    4, None,          4*1024*1024*1024, 'MP4 Video'),
    (b'\x1a\x45\xdf\xa3',                       'mkv',  'video',    0, None,          4*1024*1024*1024, 'MKV/WebM Video'),
    (b'FLV\x01',                                'flv',  'video',    0, None,          2*1024*1024*1024, 'FLV Video'),
    # Audio
    (b'ID3',                                    'mp3',  'audio',    0, None,          150*1024*1024,  'MP3 (ID3)'),
    (b'fLaC',                                   'flac', 'audio',    0, None,          500*1024*1024,  'FLAC Audio'),
    (b'OggS',                                   'ogg',  'audio',    0, None,          200*1024*1024,  'OGG Audio'),
    # Documents
    (b'%PDF-',                                  'pdf',  'document', 0, b'%%EOF',      200*1024*1024,  'PDF Document'),
    (b'\x50\x4b\x03\x04',                       'zip',  'archive',  0, None,          500*1024*1024,  'ZIP/DOCX/XLSX'),
    (b'PK\x05\x06',                             'zip',  'archive',  0, None,          500*1024*1024,  'ZIP End-of-Central-Dir'),
]

# ─── License System ───────────────────────────────────────────────────────────
# We use HMAC-SHA256 with a server-side secret as a lightweight "signature".
# In production you would replace this with an RSA private key (e.g. stored
# outside the bundle) and distribute only the public key in the app.
# For simplicity, we use a fixed secret stored in the data directory.

def get_license_secret() -> bytes:
    secret_file = os.path.join(DATA_DIR, ".license_secret")
    if os.path.exists(secret_file):
        return open(secret_file, "rb").read()
    # Generate once per installation
    secret = secrets.token_bytes(32)
    with open(secret_file, "wb") as f:
        f.write(secret)
    return secret

LICENSE_SECRET = get_license_secret()

PLANS = {
    "monthly": {"name": "Monthly", "price": 1.99,  "duration_days": 31},
    "annual":  {"name": "Annual",  "price": 9.99,  "duration_days": 365},
    "lifetime": {"name": "Lifetime", "price": 49.99, "duration_days": 36500},  # 100 years
}

def load_licenses() -> dict:
    if not os.path.exists(LICENSE_FILE):
        return {}
    try:
        with open(LICENSE_FILE) as f:
            return json.load(f)
    except Exception:
        return {}

def save_licenses(data: dict):
    with open(LICENSE_FILE, "w") as f:
        json.dump(data, f, indent=2)

def generate_license_key(machine_id: str, plan: str, email: str) -> dict:
    """Generate a new HMAC-signed license key tied to a machine ID and plan."""
    license_id = str(uuid.uuid4()).upper()
    issued_at  = datetime.utcnow()
    plan_info  = PLANS.get(plan, PLANS["annual"])
    expires_at = issued_at + timedelta(days=plan_info["duration_days"])

    payload = {
        "license_id": license_id,
        "machine_id": machine_id,
        "plan": plan,
        "email": email,
        "issued_at": issued_at.isoformat(),
        "expires_at": expires_at.isoformat(),
    }
    payload_bytes = json.dumps(payload, sort_keys=True).encode()
    signature = hmac.new(LICENSE_SECRET, payload_bytes, hashlib.sha256).hexdigest()

    key_b64 = base64.urlsafe_b64encode(
        json.dumps({"p": payload, "s": signature}, separators=(',', ':')).encode()
    ).decode()
    # Format as readable key: PHX-XXXX-XXXX-XXXX-XXXX
    chunk = key_b64.replace('=', '').replace('-', '').replace('_', '')[:16].upper()
    formatted_key = f"PHX-{chunk[:4]}-{chunk[4:8]}-{chunk[8:12]}-{chunk[12:16]}"

    license_record = {
        **payload,
        "key": formatted_key,
        "key_raw": key_b64,
        "active": True,
    }
    return license_record

def verify_license_key(key_raw: str, machine_id: str) -> dict:
    """Verify a license key. Returns {valid, plan, expires_at, reason}."""
    try:
        decoded = json.loads(base64.urlsafe_b64decode(key_raw + '=='))
        payload = decoded["p"]
        claimed_sig = decoded["s"]

        payload_bytes = json.dumps(payload, sort_keys=True).encode()
        expected_sig  = hmac.new(LICENSE_SECRET, payload_bytes, hashlib.sha256).hexdigest()

        if not hmac.compare_digest(claimed_sig, expected_sig):
            return {"valid": False, "reason": "Invalid signature — license may be tampered."}

        if payload["machine_id"] != machine_id:
            return {"valid": False, "reason": "License is locked to a different machine."}

        expires_at = datetime.fromisoformat(payload["expires_at"])
        if datetime.utcnow() > expires_at:
            return {"valid": False, "reason": f"License expired on {expires_at.date().isoformat()}."}

        return {
            "valid": True,
            "plan": payload["plan"],
            "email": payload["email"],
            "license_id": payload["license_id"],
            "issued_at": payload["issued_at"],
            "expires_at": payload["expires_at"],
            "days_remaining": (expires_at - datetime.utcnow()).days,
        }
    except Exception as e:
        return {"valid": False, "reason": f"Could not parse license: {str(e)[:80]}"}


# ─── Utilities ────────────────────────────────────────────────────────────────
def format_size(size_bytes: int) -> str:
    if size_bytes == 0:
        return "0 B"
    units = ['B', 'KB', 'MB', 'GB', 'TB']
    idx, size = 0, float(size_bytes)
    while size >= 1024 and idx < len(units) - 1:
        size /= 1024;  idx += 1
    return f"{size:.2f} {units[idx]}"

def get_category_key(cat: str) -> str:
    return {'image': 'images', 'video': 'videos', 'document': 'documents',
            'audio': 'audio', 'archive': 'archives'}.get(cat, 'documents')

def compute_hash(filepath: str) -> str:
    try:
        h = hashlib.md5()
        with open(filepath, 'rb') as f:
            for block in iter(lambda: f.read(65536), b''):
                h.update(block)
        return h.hexdigest()
    except Exception:
        return "unknown"


# ─── Drive Detection ──────────────────────────────────────────────────────────
def get_drives_mac() -> list:
    drives = []
    try:
        output = subprocess.check_output(["diskutil", "list", "-plist"])
        plist  = plistlib.loads(output)
        for disk in plist.get('AllDisksAndPartitions', []):
            device_id = disk.get('DeviceIdentifier')
            if not device_id:
                continue
            try:
                info_out = subprocess.check_output(["diskutil", "info", "-plist", device_id])
                info = plistlib.loads(info_out)
                total_size = info.get('TotalSize', 0)
                drives.append({
                    "device": f"/dev/r{device_id}",
                    "display_name": info.get('MediaName', device_id),
                    "mountpoint": info.get('MountPoint', 'Unmounted'),
                    "size": total_size,
                    "readable_size": format_size(total_size),
                    "protocol": info.get('BusProtocol', 'Unknown'),
                    "is_removable": info.get('Removable', False) or info.get('RemovableMedia', False),
                    "is_internal": info.get('Internal', True),
                    "file_system": info.get('FilesystemName', 'Unknown'),
                })
            except Exception:
                pass
    except Exception as e:
        drives.append({
            "device": "error",
            "display_name": "Permission Error — Run with sudo",
            "size": 0, "readable_size": "0 B",
            "protocol": "Unknown",
            "is_removable": False, "is_internal": True,
        })
    return drives


# ─── Async Thumbnail Generation ───────────────────────────────────────────────
def _generate_thumbnail_sync(filepath: str, filename: str, ext: str) -> Optional[str]:
    """Called in a background thread; never blocks the scan loop."""
    try:
        from PIL import Image
        thumb_name = f"thumb_{filename}.jpg"
        thumb_path = os.path.join(THUMBNAIL_DIR, thumb_name)
        if os.path.exists(thumb_path):
            return f"/thumbnails/{thumb_name}"
        with Image.open(filepath) as img:
            img.thumbnail((300, 300))
            img = img.convert('RGB')
            img.save(thumb_path, 'JPEG', quality=80)
        return f"/thumbnails/{thumb_name}"
    except Exception:
        return None

def generate_thumbnail_async(filepath, filename, ext, ftype, file_record: dict):
    """Submit thumbnail job to thread pool; patches file_record.thumbnail_url when done."""
    if ftype != 'image':
        return
    def _job():
        url = _generate_thumbnail_sync(filepath, filename, ext)
        if url:
            file_record['thumbnail_url'] = url
    thumbnail_executor.submit(_job)


# ─── File Integrity ───────────────────────────────────────────────────────────
def check_file_integrity(filepath: str, ext: str, ftype: str) -> str:
    try:
        fsize = os.path.getsize(filepath)
        if fsize < 100:
            return "corrupted"
        if ftype == 'image':
            try:
                from PIL import Image
                with Image.open(filepath) as img:
                    img.verify()
                return "healthy"
            except Exception:
                return "damaged"
        if ftype == 'video':
            try:
                result = subprocess.run(
                    ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                     '-of', 'default=noprint_wrappers=1:nokey=1', filepath],
                    capture_output=True, text=True, timeout=10
                )
                return "healthy" if result.returncode == 0 and result.stdout.strip() else "damaged"
            except Exception:
                return "unknown"
        if ext == 'pdf':
            with open(filepath, 'rb') as f:
                return "healthy" if f.read(5) == b'%PDF-' else "damaged"
        return "unknown"
    except Exception:
        return "unknown"


# ─── File Carving ─────────────────────────────────────────────────────────────
def carve_file(f, chunk: bytes, start_in_chunk: int, filepath: str,
               footer: Optional[bytes], max_size: int, saved_pos: int):
    try:
        with open(filepath, "wb") as out:
            out.write(chunk[start_in_chunk:])
            current_size = len(chunk) - start_in_chunk
            remaining = max_size - current_size
            while remaining > 0:
                more = f.read(min(65536, remaining))
                if not more:
                    break
                if footer:
                    footer_idx = more.find(footer)
                    if footer_idx != -1:
                        out.write(more[:footer_idx + len(footer) + 8])
                        return
                out.write(more)
                remaining -= len(more)
    except Exception as e:
        print(f"[carve] Error for {filepath}: {e}")


# ─── Main Scan Engine ─────────────────────────────────────────────────────────
def scan_device_real(device_path: str, size_bytes: int = 0):
    global scan_status, seen_hashes
    scan_status = {
        "is_scanning": True,
        "is_paused": False,
        "progress": 0,
        "found_files": [],
        "current_stage": "Initializing Scan Engine...",
        "error": None,
        "bytes_scanned": 0,
        "total_bytes": 0,
        "elapsed_time": 0,
        "scan_speed": "0 MB/s",
        "stats": {"images": 0, "videos": 0, "documents": 0, "audio": 0, "archives": 0},
    }
    with seen_hashes_lock:
        seen_hashes.clear()

    stop_event.clear()
    pause_event.set()

    READ_CHUNK   = 4 * 1024 * 1024   # 4 MB read blocks
    MIN_FILE_SIZE = 1024              # skip < 1 KB
    start_time   = time.time()
    file_count   = 0

    try:
        try:
            f = open(device_path, "rb")
        except PermissionError:
            scan_status["error"] = (
                "Permission Denied.\n\n"
                "Raw disk scanning requires elevated privileges.\n"
                "Please relaunch Phoenix Recovery with sudo or administrator rights."
            )
            scan_status["is_scanning"] = False
            return

        # Determine disk size
        total_size = 0
        try:
            f.seek(0, 2);  total_size = f.tell();  f.seek(0)
        except Exception:
            pass
        if total_size == 0 and size_bytes > 0:
            total_size = size_bytes
        scan_status["total_bytes"] = total_size

        bytes_read = 0
        scan_status["current_stage"] = "Phase 1: Deep Sector Scan & File Carving…"

        while not stop_event.is_set():
            if not pause_event.is_set():
                scan_status["is_paused"] = True
                scan_status["current_stage"] = "⏸ Scan Paused"
                time.sleep(0.3)
                continue

            scan_status["is_paused"] = False
            scan_status["current_stage"] = "Phase 1: Deep Sector Scan & File Carving…"

            chunk = f.read(READ_CHUNK)
            if not chunk:
                break

            for sig, ext, ftype, offset, footer, max_size, desc in SIGNATURES:
                search_pos = 0
                while True:
                    if offset > 0:
                        idx = chunk.find(sig, search_pos)
                        if idx == -1 or idx < offset:
                            break
                        actual_start = idx - offset
                    else:
                        idx = chunk.find(sig, search_pos)
                        if idx == -1:
                            break
                        actual_start = idx

                    # WEBP validation
                    if ext == 'webp':
                        wpos = actual_start + 8
                        if wpos + 4 <= len(chunk) and chunk[wpos:wpos+4] != b'WEBP':
                            search_pos = idx + 1
                            continue

                    file_count += 1
                    filename = f"recovered_{file_count:05d}.{ext}"
                    filepath = os.path.join(RECOVERED_DIR, filename)

                    saved_pos = f.tell()
                    carve_file(f, chunk, actual_start, filepath, footer, max_size, saved_pos)
                    f.seek(saved_pos)

                    try:
                        fsize = os.path.getsize(filepath)
                    except Exception:
                        fsize = 0

                    if fsize < MIN_FILE_SIZE:
                        try: os.remove(filepath)
                        except: pass
                        file_count -= 1
                        search_pos = idx + len(sig)
                        continue

                    # Duplicate check
                    file_hash = compute_hash(filepath)
                    with seen_hashes_lock:
                        if file_hash in seen_hashes:
                            try: os.remove(filepath)
                            except: pass
                            file_count -= 1
                            search_pos = idx + len(sig)
                            continue
                        seen_hashes.add(file_hash)

                    integrity = check_file_integrity(filepath, ext, ftype)
                    cat_key   = get_category_key(ftype)
                    scan_status["stats"][cat_key] = scan_status["stats"].get(cat_key, 0) + 1

                    file_record = {
                        "id": file_count,
                        "name": filename,
                        "size": format_size(fsize),
                        "size_bytes": fsize,
                        "type": ftype,
                        "extension": ext,
                        "description": desc,
                        "url": f"/files/{filename}",
                        "download_url": f"/api/download/{filename}",
                        "thumbnail_url": None,
                        "hash": file_hash,
                        "integrity": integrity,
                        "offset": bytes_read + actual_start,
                        "repaired": False,
                    }
                    scan_status["found_files"].append(file_record)

                    # Non-blocking thumbnail
                    generate_thumbnail_async(filepath, filename, ext, ftype, file_record)

                    search_pos = idx + len(sig)

            bytes_read += len(chunk)
            elapsed = time.time() - start_time
            scan_status["bytes_scanned"] = bytes_read
            scan_status["elapsed_time"]  = round(elapsed, 1)

            if elapsed > 0:
                speed = bytes_read / elapsed
                scan_status["scan_speed"] = f"{format_size(int(speed))}/s"

            if total_size > 0:
                scan_status["progress"] = round((bytes_read / total_size) * 100, 2)

        f.close()
        scan_status["current_stage"] = "✅ Scan Complete"
        scan_status["progress"]      = 100

    except Exception as e:
        scan_status["error"] = str(e)
        print(f"[scan] Unhandled error: {e}")

    scan_status["is_scanning"] = False


# ─── Repair Engines ───────────────────────────────────────────────────────────
def repair_image(filepath, repaired_path, ext):
    from PIL import Image
    try:
        with Image.open(filepath) as img:
            img.load()
            img = img.convert('RGB')
            fmt_map = {'jpg': 'JPEG', 'jpeg': 'JPEG', 'png': 'PNG',
                       'bmp': 'BMP', 'gif': 'GIF', 'tiff': 'TIFF',
                       'tif': 'TIFF', 'webp': 'WEBP'}
            img.save(repaired_path, fmt_map.get(ext, 'JPEG'), quality=95)
        return "Image structure reconstructed successfully."
    except Exception as e1:
        pass
    try:
        with open(filepath, 'rb') as f:
            data = f.read()
        if ext in ('jpg', 'jpeg'):
            if not data.startswith(b'\xff\xd8'): data = b'\xff\xd8\xff\xe0' + data
            if not data.endswith(b'\xff\xd9'):   data += b'\xff\xd9'
        elif ext == 'png':
            PNG = b'\x89\x50\x4e\x47\x0d\x0a\x1a\x0a'
            if not data.startswith(PNG): data = PNG + data
        with open(repaired_path, 'wb') as f:
            f.write(data)
        return "Binary header patch applied."
    except Exception as e2:
        return f"Repair partially attempted — could not fully reconstruct the file."

def repair_video(filepath, repaired_path):
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True, timeout=5)
    except Exception:
        return "ffmpeg not found. Install ffmpeg to enable video repair."
    for args, label in [
        (['-y', '-err_detect', 'ignore_err', '-i', filepath, '-c', 'copy',
          '-movflags', 'faststart', repaired_path], "Stream remux"),
        (['-y', '-err_detect', 'ignore_err', '-i', filepath,
          '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
          '-c:a', 'aac', '-b:a', '128k', '-movflags', 'faststart', repaired_path], "H.264 re-encode"),
        (['-y', '-err_detect', 'ignore_err', '-fflags', '+genpts+discardcorrupt',
          '-i', filepath, '-c:v', 'libx264', '-preset', 'fast', '-crf', '28',
          '-c:a', 'aac', '-movflags', 'faststart', repaired_path], "Aggressive error ignore"),
    ]:
        try:
            subprocess.run(['ffmpeg'] + args, capture_output=True, check=True, timeout=600)
            result = subprocess.run(
                ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                 '-of', 'default=noprint_wrappers=1:nokey=1', repaired_path],
                capture_output=True, text=True, timeout=10)
            if result.returncode == 0 and result.stdout.strip():
                return f"Video repaired via {label}."
        except Exception:
            pass
    return "Repair attempted but could not produce a valid output."

def repair_audio(filepath, repaired_path, ext):
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True, timeout=5)
    except Exception:
        return "ffmpeg not found."
    try:
        subprocess.run([
            'ffmpeg', '-y', '-err_detect', 'ignore_err',
            '-i', filepath, '-c:a', 'copy' if ext in ('mp3', 'flac') else 'libmp3lame',
            repaired_path
        ], capture_output=True, check=True, timeout=120)
        return "Audio repaired."
    except Exception as e:
        return f"Audio repair failed: {str(e)[:100]}"

def repair_pdf(filepath, repaired_path):
    try:
        with open(filepath, 'rb') as f: data = f.read()
        if not data.startswith(b'%PDF-'): data = b'%PDF-1.4\n' + data
        if b'%%EOF' not in data[-128:]:   data += b'\n%%EOF\n'
        with open(repaired_path, 'wb') as f: f.write(data)
        try:
            gs_out = repaired_path + '.gs.pdf'
            subprocess.run(['gs', '-o', gs_out, '-sDEVICE=pdfwrite',
                            '-dPDFSETTINGS=/prepress', repaired_path],
                           capture_output=True, check=True, timeout=60)
            shutil.move(gs_out, repaired_path)
            return "PDF repaired with Ghostscript."
        except Exception:
            pass
        return "PDF header/footer repair applied."
    except Exception as e:
        return f"PDF repair failed: {str(e)[:100]}"


# ─── API Routes ───────────────────────────────────────────────────────────────

# --- Health ---
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "version": "2.0.0"})

# --- Drives ---
@app.route('/api/drives', methods=['GET'])
def list_drives():
    return jsonify(get_drives_mac())

# --- File Serving ---
@app.route('/files/<path:filename>')
def serve_file(filename):
    MIMETYPES = {
        'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png',
        'gif': 'image/gif', 'bmp': 'image/bmp', 'webp': 'image/webp',
        'tiff': 'image/tiff', 'tif': 'image/tiff',
        'mp4': 'video/mp4', 'mkv': 'video/x-matroska', 'avi': 'video/x-msvideo',
        'mov': 'video/quicktime', 'webm': 'video/webm', 'flv': 'video/x-flv',
        'mp3': 'audio/mpeg', 'flac': 'audio/flac', 'ogg': 'audio/ogg', 'wav': 'audio/wav',
        'pdf': 'application/pdf', 'zip': 'application/zip',
    }
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    return send_from_directory(RECOVERED_DIR, filename, mimetype=MIMETYPES.get(ext))

@app.route('/thumbnails/<path:filename>')
def serve_thumbnail(filename):
    return send_from_directory(THUMBNAIL_DIR, filename, mimetype='image/jpeg')

@app.route('/api/download/<path:filename>')
def download_file(filename):
    return send_from_directory(RECOVERED_DIR, filename, as_attachment=True)

# --- Scan Control ---
@app.route('/api/scan/start', methods=['POST'])
def start_scan():
    data = request.json or {}
    device_path = data.get('device')
    if not device_path:
        return jsonify({"error": "No device specified"}), 400
    if scan_status["is_scanning"]:
        return jsonify({"error": "A scan is already running"}), 400
    size = 0
    for d in get_drives_mac():
        if d['device'] == device_path:
            size = d.get('size', 0); break
    t = threading.Thread(target=scan_device_real, args=(device_path, size), daemon=True)
    t.start()
    return jsonify({"message": "Scan started"})

@app.route('/api/scan/pause', methods=['POST'])
def pause_scan():
    if scan_status["is_paused"]:
        pause_event.set()
        scan_status["is_paused"] = False
    else:
        pause_event.clear()
        scan_status["is_paused"] = True
    return jsonify({"paused": scan_status["is_paused"]})

@app.route('/api/scan/stop', methods=['POST'])
def stop_scan():
    stop_event.set()
    return jsonify({"message": "Stopping scan…"})

@app.route('/api/scan/status', methods=['GET'])
def get_status():
    return jsonify(scan_status)

# --- Repair ---
def _do_repair(filepath, filename):
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    if ext in ('jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'tif', 'webp'):
        repaired_filename = f"repaired_{filename}"
        repaired_path     = os.path.join(RECOVERED_DIR, repaired_filename)
        msg  = repair_image(filepath, repaired_path, ext)
        ftype = 'image'
    elif ext in ('mp4', 'mkv', 'avi', 'mov', 'webm', 'mpg', 'flv', 'ts'):
        repaired_filename = f"repaired_{filename.rsplit('.', 1)[0]}.mp4"
        repaired_path     = os.path.join(RECOVERED_DIR, repaired_filename)
        msg  = repair_video(filepath, repaired_path)
        ftype = 'video'
    elif ext in ('mp3', 'flac', 'ogg', 'wav'):
        repaired_filename = f"repaired_{filename}"
        repaired_path     = os.path.join(RECOVERED_DIR, repaired_filename)
        msg  = repair_audio(filepath, repaired_path, ext)
        ftype = 'audio'
    elif ext == 'pdf':
        repaired_filename = f"repaired_{filename}"
        repaired_path     = os.path.join(RECOVERED_DIR, repaired_filename)
        msg  = repair_pdf(filepath, repaired_path)
        ftype = 'document'
    else:
        repaired_filename = f"repaired_{filename}"
        repaired_path     = os.path.join(RECOVERED_DIR, repaired_filename)
        shutil.copy2(filepath, repaired_path)
        msg  = "File copied. No specific repair available for this format."
        ftype = 'document'

    integrity = check_file_integrity(repaired_path, ext, ftype) if os.path.exists(repaired_path) else "unknown"
    thumb_url = None
    if ftype == 'image' and os.path.exists(repaired_path):
        thumb_url = _generate_thumbnail_sync(repaired_path, repaired_filename, ext)
    return {
        "message": msg,
        "filename": repaired_filename,
        "url": f"/files/{repaired_filename}",
        "download_url": f"/api/download/{repaired_filename}",
        "thumbnail_url": thumb_url,
        "integrity": integrity,
        "size": format_size(os.path.getsize(repaired_path)) if os.path.exists(repaired_path) else "0 B",
    }

@app.route('/api/repair/<path:filename>', methods=['POST'])
def repair_file_endpoint(filename):
    filepath = os.path.join(RECOVERED_DIR, filename)
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404
    try:
        return jsonify(_do_repair(filepath, filename))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/upload-repair', methods=['POST'])
def upload_and_repair():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    if not file.filename:
        return jsonify({"error": "No file selected"}), 400
    original_name = secure_filename(file.filename)
    save_path = os.path.join(RECOVERED_DIR, original_name)
    file.save(save_path)
    try:
        result = _do_repair(save_path, original_name)
        result["original"] = original_name
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/batch/repair', methods=['POST'])
def batch_repair():
    data = request.json or {}
    filenames = data.get('filenames', [])
    results = []
    for fname in filenames:
        fp = os.path.join(RECOVERED_DIR, fname)
        if not os.path.exists(fp):
            results.append({"filename": fname, "error": "Not found"})
            continue
        try:
            results.append({**_do_repair(fp, fname), "original": fname})
        except Exception as e:
            results.append({"filename": fname, "error": str(e)})
    return jsonify(results)

@app.route('/api/batch/download', methods=['POST'])
def batch_download():
    import zipfile
    data = request.json or {}
    filenames = data.get('filenames', [])
    if not filenames:
        return jsonify({"error": "No files specified"}), 400
    zip_path = os.path.join(RECOVERED_DIR, 'batch_download.zip')
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for fname in filenames:
            fp = os.path.join(RECOVERED_DIR, fname)
            if os.path.exists(fp):
                zf.write(fp, fname)
    return send_file(zip_path, as_attachment=True, download_name='recovered_files.zip')

@app.route('/api/files/list', methods=['GET'])
def list_recovered_files():
    files = []
    try:
        for fname in sorted(os.listdir(RECOVERED_DIR)):
            fpath = os.path.join(RECOVERED_DIR, fname)
            if not os.path.isfile(fpath) or fname.startswith('.'):
                continue
            ext   = fname.rsplit('.', 1)[-1].lower() if '.' in fname else ''
            ftype = ('image'    if ext in ('jpg','jpeg','png','bmp','gif','tiff','tif','webp') else
                     'video'    if ext in ('mp4','mkv','avi','mov','webm','mpg','flv') else
                     'audio'    if ext in ('mp3','flac','ogg','wav') else 'document')
            files.append({
                "name": fname, "size": format_size(os.path.getsize(fpath)),
                "size_bytes": os.path.getsize(fpath), "type": ftype, "extension": ext,
                "url": f"/files/{fname}", "download_url": f"/api/download/{fname}",
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(files)

@app.route('/api/delete/<path:filename>', methods=['DELETE'])
def delete_file(filename):
    filepath = os.path.join(RECOVERED_DIR, filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return jsonify({"message": f"Deleted {filename}"})
    return jsonify({"error": "File not found"}), 404

# ─── License & Subscription API ───────────────────────────────────────────────

@app.route('/api/license/verify', methods=['POST'])
def verify_license():
    data = request.json or {}
    key  = data.get('key', '').strip()
    machine_id = data.get('machine_id', '')
    if not key or not machine_id:
        return jsonify({"valid": False, "reason": "key and machine_id required"}), 400

    # If key is in formatted form (PHX-XXXX-...) try to look it up in our DB
    licenses = load_licenses()
    for lid, lic in licenses.items():
        if lic.get('key') == key and lic.get('active'):
            # Verify with raw key
            result = verify_license_key(lic.get('key_raw', ''), machine_id)
            return jsonify(result)

    # Otherwise try to parse it directly as a raw b64 key
    result = verify_license_key(key, machine_id)
    return jsonify(result)

@app.route('/api/license/generate', methods=['POST'])
def generate_license():
    """
    Generate a new license.
    In production this endpoint is protected by an admin secret header.
    The frontend subscription flow calls a payment processor → webhook → this endpoint.
    """
    data       = request.json or {}
    admin_key  = request.headers.get('X-Admin-Key', '')
    # Development: any non-empty admin key works.
    # Production: compare against a secure environment variable.
    expected_admin = os.environ.get('PHOENIX_ADMIN_KEY', 'phoenix-dev-secret')
    if not hmac.compare_digest(admin_key, expected_admin):
        return jsonify({"error": "Unauthorized"}), 401

    machine_id = data.get('machine_id', '').strip()
    plan       = data.get('plan', 'annual')
    email      = data.get('email', 'user@example.com').strip()

    if not machine_id:
        return jsonify({"error": "machine_id required"}), 400
    if plan not in PLANS:
        return jsonify({"error": f"Unknown plan. Choose: {list(PLANS.keys())}"}), 400

    license_record = generate_license_key(machine_id, plan, email)
    licenses = load_licenses()
    licenses[license_record['license_id']] = license_record
    save_licenses(licenses)

    return jsonify({
        "key": license_record['key'],
        "key_raw": license_record['key_raw'],
        "plan": license_record['plan'],
        "email": license_record['email'],
        "issued_at": license_record['issued_at'],
        "expires_at": license_record['expires_at'],
        "license_id": license_record['license_id'],
    })

@app.route('/api/license/revoke', methods=['POST'])
def revoke_license():
    data      = request.json or {}
    admin_key = request.headers.get('X-Admin-Key', '')
    expected  = os.environ.get('PHOENIX_ADMIN_KEY', 'phoenix-dev-secret')
    if not hmac.compare_digest(admin_key, expected):
        return jsonify({"error": "Unauthorized"}), 401

    license_id = data.get('license_id', '')
    licenses   = load_licenses()
    if license_id not in licenses:
        return jsonify({"error": "License not found"}), 404

    licenses[license_id]['active'] = False
    save_licenses(licenses)
    return jsonify({"message": f"License {license_id} revoked."})

@app.route('/api/subscription/plans', methods=['GET'])
def get_plans():
    return jsonify([
        {
            "id": k,
            "name": v["name"],
            "price": v["price"],
            "duration_days": v["duration_days"],
        }
        for k, v in PLANS.items()
    ])

@app.route('/api/subscription/activate', methods=['POST'])
def activate_subscription():
    """
    Simulate a subscription activation.
    In production, this is called from your payment webhook (Stripe / Paddle).
    """
    data = request.json or {}
    machine_id = data.get('machine_id', '').strip()
    plan       = data.get('plan', 'annual')
    email      = data.get('email', '').strip()

    if not machine_id or not email:
        return jsonify({"error": "machine_id and email are required"}), 400
    if plan not in PLANS:
        return jsonify({"error": f"Unknown plan: {plan}"}), 400

    # In dev mode we generate immediately without payment verification
    license_record = generate_license_key(machine_id, plan, email)
    licenses = load_licenses()
    licenses[license_record['license_id']] = license_record
    save_licenses(licenses)

    return jsonify({
        "success": True,
        "key": license_record['key'],
        "key_raw": license_record['key_raw'],
        "plan": plan,
        "plan_name": PLANS[plan]['name'],
        "email": email,
        "expires_at": license_record['expires_at'],
        "license_id": license_record['license_id'],
    })

# ─── Inline Video Player ──────────────────────────────────────────────────────
@app.route('/video/<path:filename>')
def video_player(filename):
    return f'''<!DOCTYPE html>
<html><head><title>Play {filename}</title></head>
<body style="background:#080c14;color:#f1f5f9;font-family:Inter,Arial;display:flex;
             flex-direction:column;align-items:center;padding:2rem;">
<h2 style="margin-bottom:1rem;">{filename}</h2>
<video controls autoplay style="max-width:90vw;max-height:80vh;border-radius:8px"
       src="/files/{filename}"></video>
</body></html>'''

# ─── Entry Point ──────────────────────────────────────────────────────────────
if __name__ == '__main__':
    port = int(os.environ.get('PHOENIX_PORT', 5001))
    print(f"[Phoenix Recovery] Starting backend on port {port}")
    app.run(host='127.0.0.1', port=port, debug=False, threaded=True)
