'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, ShieldCheck, Trash2, FileImage, AlertCircle, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';

interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string;
  status: 'pending' | 'scanning' | 'clean' | 'error';
  metadata: Record<string, string> | null;
  strippedBlob: Blob | null;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatMetadataKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

async function readExif(file: File): Promise<Record<string, string> | null> {
  try {
    const exifr = (await import('exifr')).default;
    const data = await exifr.parse(file, {
      tiff: true,
      gps: true,
      exif: true,
      ifd0: true,
    });
    if (!data) return null;
    const filtered: Record<string, string> = {};
    const include = ['Make', 'Model', 'Software', 'DateTime', 'DateTimeOriginal',
      'GPSLatitude', 'GPSLongitude', 'GPSAltitude', 'Artist', 'Copyright',
      'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'LensModel',
      'ImageWidth', 'ImageHeight', 'ColorSpace', 'WhiteBalance'];
    for (const key of include) {
      if (data[key] !== undefined && data[key] !== null) {
        const val = data[key];
        if (Array.isArray(val)) {
          filtered[key] = val.join(', ');
        } else if (val instanceof Date) {
          filtered[key] = val.toLocaleString();
        } else {
          filtered[key] = String(val);
        }
      }
    }
    return Object.keys(filtered).length > 0 ? filtered : null;
  } catch {
    return null;
  }
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
      if (!ctx) { reject(new Error('Canvas not available')); return; }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to export image'));
      }, outputType, 0.95);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

export function ExifStripperApp() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;

    const newImages: ImageFile[] = arr.map(f => ({
      id: `img-${Date.now()}-${Math.random()}`,
      file: f,
      originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
      status: 'scanning',
      metadata: null,
      strippedBlob: null,
    }));

    setImages(prev => [...prev, ...newImages]);

    // Process each image
    for (const img of newImages) {
      try {
        const [metadata, strippedBlob] = await Promise.all([
          readExif(img.file),
          stripExif(img.file),
        ]);
        setImages(prev => prev.map(p => p.id === img.id
          ? { ...p, status: 'clean', metadata, strippedBlob }
          : p
        ));
      } catch (e: any) {
        setImages(prev => prev.map(p => p.id === img.id
          ? { ...p, status: 'error', error: e.message }
          : p
        ));
      }
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const downloadOne = (img: ImageFile) => {
    if (!img.strippedBlob) return;
    const ext = img.file.type === 'image/png' ? 'png' : 'jpg';
    const name = img.file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
    const url = URL.createObjectURL(img.strippedBlob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const ready = images.filter(i => i.strippedBlob);
    if (!ready.length) return;
    setIsProcessingAll(true);
    const zip = new JSZip();
    for (const img of ready) {
      const ext = img.file.type === 'image/png' ? 'png' : 'jpg';
      const name = img.file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
      zip.file(name, img.strippedBlob!);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NexStrip_Clean.zip';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsProcessingAll(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter(i => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach(i => URL.revokeObjectURL(i.previewUrl));
    setImages([]);
  };

  const doneCount = images.filter(i => i.status === 'clean').length;
  const hasGps = images.some(i => i.metadata && ('GPSLatitude' in i.metadata || 'GPSLongitude' in i.metadata));

  return (
    <div className="pdf-editor-wrapper">
      <div className="app-container">
        <header className="header">
          <div className="badge">NexStrip — Free &amp; Private</div>
          <h1>EXIF &amp; Metadata Stripper</h1>
          <p>Drop images in. See what metadata is embedded. Download clean copies with all of it removed — GPS coordinates, camera model, timestamps, everything.</p>
        </header>

        {images.length === 0 ? (
          <div className="glass-panel">
            <div
              className={`upload-zone ${isDragging ? 'drag-active' : ''}`}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage className="upload-icon" size={56} />
              <h2 className="upload-title">Drop images here</h2>
              <p className="upload-subtitle">JPG, PNG, HEIC, WebP — single or batch</p>
              <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
            </div>
          </div>
        ) : (
          <div className="workspace">
            {/* Toolbar */}
            <div className="glass-panel toolbar">
              <div className="toolbar-info">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {doneCount} of {images.length} processed
                </h3>
                <p className="upload-subtitle">
                  {hasGps && <span style={{ color: '#ef4444', fontWeight: 500 }}>⚠ GPS coordinates detected and removed</span>}
                  {!hasGps && doneCount > 0 && <span style={{ color: '#16a34a' }}>✓ No GPS data found</span>}
                </p>
              </div>
              <div className="toolbar-actions">
                <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
                <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={16} /> Add More
                </button>
                <button className="btn btn-danger" onClick={clearAll}>
                  <Trash2 size={16} /> Clear All
                </button>
                <button className="btn btn-primary" onClick={downloadAll} disabled={isProcessingAll || doneCount === 0}>
                  <Download size={16} /> {isProcessingAll ? 'Zipping...' : `Download All (${doneCount})`}
                </button>
              </div>
            </div>

            {/* Image List */}
            <div className="glass-panel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {images.map(img => (
                  <div key={img.id} style={{ border: '1px solid var(--editor-border)', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
                    {/* Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                      <img src={img.previewUrl} alt={img.file.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--editor-border)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.file.name}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--editor-text-muted)', marginTop: 2 }}>
                          {formatBytes(img.originalSize)}
                          {img.metadata && <> · <span style={{ color: '#f59e0b', fontWeight: 500 }}>{Object.keys(img.metadata).length} metadata fields found</span></>}
                          {img.status === 'clean' && !img.metadata && <> · <span style={{ color: '#16a34a', fontWeight: 500 }}>No metadata detected</span></>}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        {img.status === 'scanning' && (
                          <span style={{ fontSize: '0.85rem', color: 'var(--editor-text-muted)' }}>Scanning…</span>
                        )}
                        {img.status === 'clean' && (
                          <>
                            <CheckCircle2 size={18} style={{ color: '#16a34a' }} />
                            {img.metadata && (
                              <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                                onClick={() => setExpandedId(expandedId === img.id ? null : img.id)}>
                                {expandedId === img.id ? 'Hide' : 'View'} metadata
                              </button>
                            )}
                            <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => downloadOne(img)}>
                              <Download size={14} /> Save
                            </button>
                          </>
                        )}
                        {img.status === 'error' && (
                          <span style={{ fontSize: '0.85rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <AlertCircle size={16} /> Error
                          </span>
                        )}
                        <button className="btn-icon" onClick={() => removeImage(img.id)}><X size={16} /></button>
                      </div>
                    </div>

                    {/* Expanded metadata */}
                    {expandedId === img.id && img.metadata && (
                      <div style={{ padding: '0 1rem 1rem', borderTop: '1px solid var(--editor-border)', marginTop: 0 }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--editor-text-muted)', margin: '0.75rem 0 0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Fields stripped from this file
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.4rem' }}>
                          {Object.entries(img.metadata).map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 0.75rem', background: 'var(--editor-surface)', borderRadius: 6, fontSize: '0.82rem' }}>
                              <span style={{ color: 'var(--editor-text-muted)', fontWeight: 600, marginBottom: 2 }}>{formatMetadataKey(k)}</span>
                              <span style={{ color: k.includes('GPS') ? '#ef4444' : 'var(--editor-text-main)', wordBreak: 'break-all' }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
