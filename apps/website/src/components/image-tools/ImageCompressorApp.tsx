'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Trash2, FileImage, Image as ImageIcon, ZoomIn } from 'lucide-react';
import JSZip from 'jszip';

type OutputFormat = 'jpeg' | 'png' | 'webp';

interface CompressedImage {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string;
  status: 'pending' | 'compressing' | 'done' | 'error';
  outputFormat: OutputFormat;
  quality: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  compressedPreviewUrl: string | null;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function savings(original: number, compressed: number): string {
  const pct = ((original - compressed) / original * 100);
  return pct > 0 ? `-${pct.toFixed(0)}%` : '+0%';
}

async function compressImage(file: File, quality: number, outputFormat: OutputFormat): Promise<{ blob: Blob; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      if (outputFormat === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const mime = outputFormat === 'jpeg' ? 'image/jpeg' : outputFormat === 'webp' ? 'image/webp' : 'image/png';
      const q = outputFormat === 'png' ? undefined : quality / 100;
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Compression failed')); return; }
        const previewUrl = URL.createObjectURL(blob);
        resolve({ blob, previewUrl });
      }, mime, q);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

export function ImageCompressorApp() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalQuality, setGlobalQuality] = useState(80);
  const [globalFormat, setGlobalFormat] = useState<OutputFormat>('jpeg');
  const [isZipping, setIsZipping] = useState(false);
  const [compareId, setCompareId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (id: string, file: File, quality: number, format: OutputFormat) => {
    setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'compressing' } : i));
    try {
      const { blob, previewUrl } = await compressImage(file, quality, format);
      setImages(prev => prev.map(i => i.id === id ? {
        ...i, status: 'done', compressedBlob: blob,
        compressedSize: blob.size, compressedPreviewUrl: previewUrl,
        quality, outputFormat: format,
      } : i));
    } catch (e: any) {
      setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'error', error: e.message } : i));
    }
  };

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    const newImages: CompressedImage[] = arr.map(f => ({
      id: `img-${Date.now()}-${Math.random()}`,
      file: f, originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
      status: 'pending', outputFormat: globalFormat,
      quality: globalQuality, compressedBlob: null,
      compressedSize: 0, compressedPreviewUrl: null,
    }));
    setImages(prev => [...prev, ...newImages]);
    for (const img of newImages) {
      await processImage(img.id, img.file, globalQuality, globalFormat);
    }
  }, [globalQuality, globalFormat]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const recompressAll = async (quality: number, format: OutputFormat) => {
    for (const img of images) {
      await processImage(img.id, img.file, quality, format);
    }
  };

  const handleQualityChange = (q: number) => {
    setGlobalQuality(q);
  };

  const handleFormatChange = (f: OutputFormat) => {
    setGlobalFormat(f);
  };

  const applySettings = () => recompressAll(globalQuality, globalFormat);

  const downloadOne = (img: CompressedImage) => {
    if (!img.compressedBlob) return;
    const ext = img.outputFormat === 'jpeg' ? 'jpg' : img.outputFormat;
    const name = img.file.name.replace(/\.[^.]+$/, '') + `_compressed.${ext}`;
    const url = URL.createObjectURL(img.compressedBlob);
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const ready = images.filter(i => i.compressedBlob);
    if (!ready.length) return;
    setIsZipping(true);
    const zip = new JSZip();
    for (const img of ready) {
      const ext = img.outputFormat === 'jpeg' ? 'jpg' : img.outputFormat;
      const name = img.file.name.replace(/\.[^.]+$/, '') + `_compressed.${ext}`;
      zip.file(name, img.compressedBlob!);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NexCompress.zip';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.previewUrl);
        if (img.compressedPreviewUrl) URL.revokeObjectURL(img.compressedPreviewUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const doneCount = images.filter(i => i.status === 'done').length;
  const totalSaved = images.reduce((acc, i) => acc + (i.status === 'done' ? i.originalSize - i.compressedSize : 0), 0);

  return (
    <div className="pdf-editor-wrapper">
      <div className="app-container">
        <header className="header">
          <div className="badge">NexCompress — Local &amp; Private</div>
          <h1>Image Compressor</h1>
          <p>Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, pick a format, and download — nothing leaves your device.</p>
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
              <ImageIcon className="upload-icon" size={56} />
              <h2 className="upload-title">Drop images here</h2>
              <p className="upload-subtitle">JPG, PNG, WebP — batch supported</p>
              <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
            </div>
          </div>
        ) : (
          <div className="workspace">
            {/* Controls */}
            <div className="glass-panel toolbar" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--editor-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Output Format
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {(['jpeg', 'png', 'webp'] as OutputFormat[]).map(f => (
                    <button key={f} onClick={() => handleFormatChange(f)}
                      style={{ padding: '0.35rem 0.9rem', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                        borderColor: globalFormat === f ? 'var(--editor-primary)' : 'var(--editor-border)',
                        background: globalFormat === f ? 'var(--editor-primary)' : 'white',
                        color: globalFormat === f ? 'white' : 'var(--editor-text-muted)' }}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--editor-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Quality: <span style={{ color: 'var(--editor-text-main)' }}>{globalQuality}%</span>
                  {globalFormat === 'png' && <span style={{ fontWeight: 400, marginLeft: 8 }}>(PNG uses lossless compression — quality setting ignored)</span>}
                </label>
                <input type="range" min={10} max={100} value={globalQuality} className="range-slider"
                  onChange={e => handleQualityChange(Number(e.target.value))}
                  disabled={globalFormat === 'png'} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" onClick={applySettings} disabled={images.some(i => i.status === 'compressing')}>
                  Re-compress All
                </button>
                <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
                <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={16} /> Add More
                </button>
                <button className="btn btn-danger" onClick={() => { images.forEach(i => { URL.revokeObjectURL(i.previewUrl); if (i.compressedPreviewUrl) URL.revokeObjectURL(i.compressedPreviewUrl); }); setImages([]); }}>
                  <Trash2 size={16} /> Clear
                </button>
                <button className="btn btn-primary" onClick={downloadAll} disabled={isZipping || doneCount === 0}>
                  <Download size={16} /> {isZipping ? 'Zipping…' : `Download All (${doneCount})`}
                </button>
              </div>
            </div>

            {/* Stats bar */}
            {doneCount > 0 && (
              <div style={{ display: 'flex', gap: '2rem', padding: '1rem 1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10 }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Saved</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#15803d' }}>{formatBytes(totalSaved)}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Files Ready</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#15803d' }}>{doneCount}</p>
                </div>
              </div>
            )}

            {/* Image list */}
            <div className="glass-panel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {images.map(img => (
                  <div key={img.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--editor-border)', borderRadius: 10, background: '#fff' }}>
                      {/* Thumbnails */}
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <div style={{ textAlign: 'center' }}>
                          <img src={img.previewUrl} alt="original" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--editor-border)' }} />
                          <p style={{ fontSize: '0.7rem', color: 'var(--editor-text-muted)', marginTop: 2 }}>Original</p>
                        </div>
                        {img.compressedPreviewUrl && (
                          <div style={{ textAlign: 'center' }}>
                            <img src={img.compressedPreviewUrl} alt="compressed" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid #bbf7d0' }} />
                            <p style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, marginTop: 2 }}>Output</p>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.file.name}</p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 4, fontSize: '0.82rem', flexWrap: 'wrap' }}>
                          <span style={{ color: 'var(--editor-text-muted)' }}>Before: <strong>{formatBytes(img.originalSize)}</strong></span>
                          {img.status === 'done' && (
                            <>
                              <span style={{ color: 'var(--editor-text-muted)' }}>After: <strong style={{ color: '#15803d' }}>{formatBytes(img.compressedSize)}</strong></span>
                              <span style={{ fontWeight: 700, color: img.originalSize > img.compressedSize ? '#15803d' : '#f59e0b' }}>
                                {savings(img.originalSize, img.compressedSize)}
                              </span>
                              <span style={{ color: 'var(--editor-text-muted)' }}>{img.outputFormat.toUpperCase()} · {img.quality}% quality</span>
                            </>
                          )}
                          {img.status === 'compressing' && <span style={{ color: 'var(--editor-text-muted)' }}>Compressing…</span>}
                          {img.status === 'error' && <span style={{ color: '#ef4444' }}>Error: {img.error}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        {img.status === 'done' && (
                          <>
                            <button className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }} onClick={() => setCompareId(compareId === img.id ? null : img.id)} title="Compare">
                              <ZoomIn size={15} />
                            </button>
                            <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }} onClick={() => downloadOne(img)}>
                              <Download size={14} /> Save
                            </button>
                          </>
                        )}
                        <button className="btn-icon" onClick={() => removeImage(img.id)}><X size={16} /></button>
                      </div>
                    </div>

                    {/* Compare view */}
                    {compareId === img.id && img.compressedPreviewUrl && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', border: '1px solid var(--editor-border)', borderTop: 'none', borderRadius: '0 0 10px 10px', background: 'var(--editor-surface)' }}>
                        <div style={{ textAlign: 'center' }}>
                          <img src={img.previewUrl} alt="original" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--editor-border)' }} />
                          <p style={{ fontSize: '0.85rem', marginTop: 6, fontWeight: 600 }}>Original — {formatBytes(img.originalSize)}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <img src={img.compressedPreviewUrl} alt="compressed" style={{ width: '100%', borderRadius: 8, border: '2px solid #86efac' }} />
                          <p style={{ fontSize: '0.85rem', marginTop: 6, fontWeight: 600, color: '#15803d' }}>
                            Compressed — {formatBytes(img.compressedSize)} ({savings(img.originalSize, img.compressedSize)})
                          </p>
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
