# Phoenix Recovery — Developer Setup Guide

## Prerequisites

| Tool | Required | Notes |
|------|----------|-------|
| Python 3.9+ | ✅ | macOS ships 3.9 |
| Node.js 18+ | ✅ | Install via nvm |
| ffmpeg | Recommended | `brew install ffmpeg` |
| Ghostscript | Optional | `brew install gs` |
| ImageMagick | Optional | `brew install imagemagick` |

---

## Quick Start (Development)

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run on default port 5001
python3 app.py

# Or specify a custom port
PHOENIX_PORT=5001 python3 app.py
```

> ⚠️ **Scanning raw disks requires sudo:**
> ```bash
> sudo python3 app.py
> ```

### 2. Frontend (Electron + Vite)

```bash
cd frontend
npm install
npm run dev        # Starts both Vite dev server AND Electron
```

Or run separately:
```bash
npm run dev:vite      # Just the Vite dev server (port 5173)
npm run dev:electron  # Just Electron (waits for Vite)
```

---

## License System

### Generate a License (Admin)

```bash
curl -X POST http://localhost:5001/api/license/generate \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: phoenix-dev-secret" \
  -d '{
    "machine_id": "PHX-YOURMACHINEID",
    "plan": "annual",
    "email": "user@example.com"
  }'
```

**Plans:** `monthly` ($1.99), `annual` ($9.99), `lifetime` ($49.99)

### Verify a License

```bash
curl -X POST http://localhost:5001/api/license/verify \
  -H "Content-Type: application/json" \
  -d '{
    "key": "eyJ...<raw_key>...",
    "machine_id": "PHX-YOURMACHINEID"
  }'
```

### Self-Activating (Frontend Flow)

```bash
# Simulates a subscription activation (replace with Stripe webhook in production)
curl -X POST http://localhost:5001/api/subscription/activate \
  -H "Content-Type: application/json" \
  -d '{
    "machine_id": "PHX-...",
    "plan": "annual",
    "email": "user@example.com"
  }'
```

---

## Production Build

```bash
cd frontend
npm run build           # Build React app only
npm run build:electron  # Full Electron .dmg build
```

Output: `frontend/release/Phoenix Recovery-2.0.0.dmg`

---

## Architecture

```
phoenix-recovery/
├── backend/
│   ├── app.py              # Flask API — scan engine, repair engine, license system
│   ├── requirements.txt
│   ├── recovered_files/    # Carved files go here
│   └── data/
│       ├── licenses.json   # License registry
│       └── .license_secret # HMAC secret (auto-generated, never commit)
└── frontend/
    ├── electron/
│   │   ├── main.js         # Electron shell — dynamic port, hardware UUID, IPC
│   │   ├── preload.js      # Secure context bridge (contextIsolation: true)
│   │   └── entitlements.mac.plist
    └── src/
        ├── App.jsx         # React UI — scan, repair, subscription management
        └── index.css
```

## Production Checklist

- [x] 50MB test cap removed (full disk scanning)
- [x] Dynamic port (no port 5001 conflicts)
- [x] Real hardware UUID via `systeminformation` + `ioreg` fallback
- [x] HMAC-SHA256 license system (node-locked)
- [x] License persistence in Electron `userData` (not localStorage)
- [x] Offline license grace (verifies stored license if backend unreachable)
- [x] Async thumbnail generation (non-blocking scan loop)
- [x] Duplicate file deduplication via MD5 hash
- [x] Secure preload bridge (contextIsolation, no nodeIntegration)
- [x] Production Vite build passing
- [x] ESLint 0 errors
- [ ] Code signing + notarization (requires Apple Developer account)
- [ ] Stripe/Paddle webhook integration for real payments
- [ ] Admin secret via env var (`PHOENIX_ADMIN_KEY`) in deployment
- [ ] ffmpeg bundling in production `.app` bundle
