'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Trash2, FileImage, CheckCircle2, AlertCircle } from 'lucide-react';
import JSZip from 'jszip';
import '../image-tools/image-tools.css';

interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string;
  status: 'scanning' | 'clean' | 'error';
  metadata: Record<string, string> | null;
  strippedBlob: Blob | null;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

async function readExif(file: File): Promise<Record<string, string> | null> {
  try {
    const exifr = (await import('exifr')).default;
    const data = await exifr.parse(file, {
      tiff: true, gps: true, exif: true, ifd0: true,
    } as any);
    if (!data) return null;
    const include = ['Make','Model','Software','DateTime','DateTimeOriginal',
      'GPSLatitude','GPSLongitude','GPSAltitude','Artist','Copyright',
      'ExposureTime','FNumber','ISO','FocalLength','LensModel',
      'ImageWidth','ImageHeight'];
    const out: Record<string, string> = {};
    for (const key of include) {
      if (data[key] == null) continue;
      const v = data[key];
      out[key] = Array.isArray(v) ? v.join(', ') : v instanceof Date ? v.toLocaleString() : String(v);
    }
    return Object.keys(out).length > 0 ? out : null;
  } catch { return null; }
}

async function stripExif(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('Export failed')),
        file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.95);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
    img.src = url;
  });
}

export function ExifStripperApp() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    const newImages: ImageFile[] = arr.map(f => ({
      id: `img-${Date.now()}-${Math.random()}`,
      file: f, originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
      status: 'scanning', metadata: null, strippedBlob: null,
    }));
    setImages(prev => [...prev, ...newImages]);
    for (const img of newImages) {
      try {
        const [metadata, strippedBlob] = await Promise.all([readExif(img.file), stripExif(img.file)]);
        setImages(prev => prev.map(p => p.id === img.id ? { ...p, status: 'clean', metadata, strippedBlob } : p));
      } catch (e: any) {
        setImages(prev => prev.map(p => p.id === img.id ? { ...p, status: 'error', error: e.message } : p));
      }
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const downloadOne = (img: ImageFile) => {
    if (!img.strippedBlob) return;
    const ext = img.file.type === 'image/png' ? 'png' : 'jpg';
    const name = img.file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
    const url = URL.createObjectURL(img.strippedBlob);
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const ready = images.filter(i => i.strippedBlob);
    if (!ready.length) return;
    setIsZipping(true);
    const zip = new JSZip();
    for (const img of ready) {
      const ext = img.file.type === 'image/png' ? 'png' : 'jpg';
      zip.file(img.file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`, img.strippedBlob!);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NexStrip_Clean.zip';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => { const img = prev.find(i => i.id === id); if (img) URL.revokeObjectURL(img.previewUrl); return prev.filter(i => i.id !== id); });
  };

  const clearAll = () => { images.forEach(i => URL.revokeObjectURL(i.previewUrl)); setImages([]); };

  const doneCount = images.filter(i => i.status === 'clean').length;
  const hasGps = images.some(i => i.metadata && ('GPSLatitude' in i.metadata || 'GPSLongitude' in i.metadata));

  return (
    <div className="tool-wrapper">
      <div className="tool-container">
        <header className="tool-header">
          <div className="tool-badge">NexStrip — Free &amp; Private</div>
          <h1>EXIF &amp; Metadata Stripper</h1>
          <p>Drop in your photos. See exactly what metadata is embedded — GPS, camera, timestamps. Download clean copies with all of it removed.</p>
        </header>

        {images.length === 0 ? (
          <div
            className={`tool-upload-zone${isDragging ? ' drag-active' : ''}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileImage className="tool-upload-icon" size={52} />
            <p className="tool-upload-title">Drop images here</p>
            <p className="tool-upload-subtitle">JPG, PNG, WebP — single or batch</p>
            <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="tool-toolbar">
              <div className="tool-toolbar-info">
                <h3>{doneCount} of {images.length} processed</h3>
                {hasGps
                  ? <p><span className="meta-danger">⚠ GPS coordinates detected and removed</span></p>
                  : doneCount > 0 ? <p><span className="meta-success">✓ No GPS data found</span></p> : <p>Scanning…</p>
                }
              </div>
              <div className="tool-toolbar-actions">
                <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
                <button className="tool-btn tool-btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={15} /> Add More
                </button>
                <button className="tool-btn tool-btn-danger" onClick={clearAll}>
                  <Trash2 size={15} /> Clear
                </button>
                <button className="tool-btn tool-btn-primary" onClick={downloadAll} disabled={isZipping || doneCount === 0}>
                  <Download size={15} /> {isZipping ? 'Zipping…' : `Download All (${doneCount})`}
                </button>
              </div>
            </div>

            {/* Image list */}
            <div className="tool-panel">
              <div className="tool-list">
                {images.map(img => (
                  <div key={img.id}>
                    <div className="tool-image-row">
                      <img src={img.previewUrl} alt={img.file.name} className="tool-thumbnail" />
                      <div className="tool-image-info">
                        <p className="tool-image-name">{img.file.name}</p>
                        <div className="tool-image-meta">
                          <span>{formatBytes(img.originalSize)}</span>
                          {img.status === 'scanning' && <span>Scanning…</span>}
                          {img.status === 'clean' && img.metadata && (
                            <span className="meta-warning">{Object.keys(img.metadata).length} metadata fields found</span>
                          )}
                          {img.status === 'clean' && !img.metadata && (
                            <span className="meta-success">No metadata detected</span>
                          )}
                          {img.status === 'error' && <span className="meta-danger">Error: {img.error}</span>}
                        </div>
                      </div>
                      <div className="tool-image-actions">
                        {img.status === 'clean' && <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0 }} />}
                        {img.status === 'error' && <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />}
                        {img.status === 'clean' && img.metadata && (
                          <button className="tool-btn tool-btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}
                            onClick={() => setExpandedId(expandedId === img.id ? null : img.id)}>
                            {expandedId === img.id ? 'Hide' : 'View'} data
                          </button>
                        )}
                        {img.status === 'clean' && (
                          <button className="tool-btn tool-btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => downloadOne(img)}>
                            <Download size={13} /> Save
                          </button>
                        )}
                        <button className="tool-btn-icon" onClick={() => removeImage(img.id)}><X size={15} /></button>
                      </div>
                    </div>

                    {/* Expanded metadata */}
                    {expandedId === img.id && img.metadata && (
                      <div style={{ padding: '0 0.5rem 0.75rem', marginTop: '-2px' }}>
                        <p className="metadata-section-label">Fields stripped from this file</p>
                        <div className="metadata-grid">
                          {Object.entries(img.metadata).map(([k, v]) => (
                            <div key={k} className="metadata-tag">
                              <p className="metadata-tag-key">{formatKey(k)}</p>
                              <p className={`metadata-tag-val${k.includes('GPS') ? ' gps' : ''}`}>{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
