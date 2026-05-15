'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Trash2, ZoomIn, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';
import './image-tools.css';

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

function savings(orig: number, comp: number): string {
  const pct = ((orig - comp) / orig * 100);
  return pct > 0 ? `-${pct.toFixed(0)}%` : '0%';
}

async function compressImage(file: File, quality: number, fmt: OutputFormat): Promise<{ blob: Blob; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas unavailable')); return; }
      if (fmt === 'jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const mime = fmt === 'jpeg' ? 'image/jpeg' : fmt === 'webp' ? 'image/webp' : 'image/png';
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Compression failed')); return; }
        resolve({ blob, previewUrl: URL.createObjectURL(blob) });
      }, mime, fmt === 'png' ? undefined : quality / 100);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
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

  const processImage = async (id: string, file: File, quality: number, fmt: OutputFormat) => {
    setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'compressing' } : i));
    try {
      const { blob, previewUrl } = await compressImage(file, quality, fmt);
      setImages(prev => prev.map(i => i.id === id ? {
        ...i, status: 'done', compressedBlob: blob, compressedSize: blob.size,
        compressedPreviewUrl: previewUrl, quality, outputFormat: fmt,
      } : i));
    } catch (e: any) {
      setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'error', error: e.message } : i));
    }
  };

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!arr.length) return;
    const newImages: CompressedImage[] = arr.map(f => ({
      id: `img-${Date.now()}-${Math.random()}`, file: f, originalSize: f.size,
      previewUrl: URL.createObjectURL(f), status: 'pending',
      outputFormat: globalFormat, quality: globalQuality,
      compressedBlob: null, compressedSize: 0, compressedPreviewUrl: null,
    }));
    setImages(prev => [...prev, ...newImages]);
    for (const img of newImages) await processImage(img.id, img.file, globalQuality, globalFormat);
  }, [globalQuality, globalFormat]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const applySettings = async () => {
    for (const img of images) await processImage(img.id, img.file, globalQuality, globalFormat);
  };

  const downloadOne = (img: CompressedImage) => {
    if (!img.compressedBlob) return;
    const ext = img.outputFormat === 'jpeg' ? 'jpg' : img.outputFormat;
    const url = URL.createObjectURL(img.compressedBlob);
    const a = document.createElement('a');
    a.href = url; a.download = img.file.name.replace(/\.[^.]+$/, '') + `_compressed.${ext}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const ready = images.filter(i => i.compressedBlob);
    if (!ready.length) return;
    setIsZipping(true);
    const zip = new JSZip();
    for (const img of ready) {
      const ext = img.outputFormat === 'jpeg' ? 'jpg' : img.outputFormat;
      zip.file(img.file.name.replace(/\.[^.]+$/, '') + `_compressed.${ext}`, img.compressedBlob!);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NexCompress.zip';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) { URL.revokeObjectURL(img.previewUrl); if (img.compressedPreviewUrl) URL.revokeObjectURL(img.compressedPreviewUrl); }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach(i => { URL.revokeObjectURL(i.previewUrl); if (i.compressedPreviewUrl) URL.revokeObjectURL(i.compressedPreviewUrl); });
    setImages([]);
  };

  const doneCount = images.filter(i => i.status === 'done').length;
  const totalSaved = images.reduce((acc, i) => acc + (i.status === 'done' ? i.originalSize - i.compressedSize : 0), 0);

  return (
    <div className="tool-wrapper">
      <div className="tool-container">
        <header className="tool-header">
          <div className="badge"><Sparkles size={14} /> NexCompress — Local & Private</div>
          <h1>Image Compressor</h1>
          <p>Compress JPG, PNG, and WebP images entirely in your browser. Adjust quality, choose a format, compare results, and download — nothing leaves your device.</p>
        </header>

        {images.length === 0 ? (
          <div
            className={`tool-upload-zone${isDragging ? ' drag-active' : ''}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="tool-upload-icon" size={52} />
            <p className="tool-upload-title">Drop images here</p>
            <p className="tool-upload-subtitle">JPG, PNG, WebP — batch supported</p>
            <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
          </div>
        ) : (
          <>
            {/* Settings toolbar */}
            <div className="tool-toolbar" style={{ alignItems: 'flex-end', gap: '1.5rem' }}>
              <div>
                <p className="tool-slider-label" style={{ marginBottom: '0.5rem' }}>Output Format</p>
                <div className="format-toggle">
                  {(['jpeg', 'png', 'webp'] as OutputFormat[]).map(f => (
                    <button key={f} className={`format-btn${globalFormat === f ? ' active' : ''}`} onClick={() => setGlobalFormat(f)}>
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tool-slider-row">
                <span className="tool-slider-label">
                  Quality: <strong style={{ color: '#0f172a' }}>{globalQuality}%</strong>
                  {globalFormat === 'png' && <span style={{ fontWeight: 400, opacity: 0.6 }}> (lossless — ignored for PNG)</span>}
                </span>
                <input type="range" min={10} max={100} value={globalQuality} className="tool-slider"
                  onChange={e => setGlobalQuality(Number(e.target.value))} disabled={globalFormat === 'png'} />
              </div>

              <div className="tool-toolbar-actions">
                <button className="btn btn-outline" onClick={applySettings} disabled={images.some(i => i.status === 'compressing')}>
                  Re-compress All
                </button>
                <input ref={fileInputRef} type="file" className="hidden-input" accept="image/*" multiple onChange={e => e.target.files && addFiles(e.target.files)} />
                <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={15} /> Add
                </button>
                <button className="btn btn-outline" style={{color: '#ef4444'}} onClick={clearAll}>
                  <Trash2 size={15} /> Clear
                </button>
                <button className="btn btn-primary" onClick={downloadAll} disabled={isZipping || doneCount === 0}>
                  <Download size={15} /> {isZipping ? 'Zipping…' : `Download All (${doneCount})`}
                </button>
              </div>
            </div>

            {/* Stats bar */}
            {doneCount > 0 && (
              <div className="tool-stats-bar">
                <div className="tool-stat-item">
                  <p>Space Saved</p>
                  <p>{formatBytes(totalSaved)}</p>
                </div>
                <div className="tool-stat-item">
                  <p>Files Ready</p>
                  <p>{doneCount}</p>
                </div>
              </div>
            )}

            {/* Image list */}
            <div className="tool-panel">
              <div className="tool-list">
                {images.map(img => (
                  <div key={img.id}>
                    <div className="tool-image-row">
                      {/* Thumbnails */}
                      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                        <div style={{ textAlign: 'center' }}>
                          <img src={img.previewUrl} alt="original" className="tool-thumbnail" />
                          <p style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>Before</p>
                        </div>
                        {img.compressedPreviewUrl && (
                          <div style={{ textAlign: 'center' }}>
                            <img src={img.compressedPreviewUrl} alt="compressed" className="tool-thumbnail tool-thumbnail-clean" />
                            <p style={{ fontSize: '0.68rem', color: '#16a34a', marginTop: 2, fontWeight: 600 }}>After</p>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="tool-image-info">
                        <p className="tool-image-name">{img.file.name}</p>
                        <div className="tool-image-meta">
                          <span>{formatBytes(img.originalSize)}</span>
                          {img.status === 'compressing' && <span>Compressing…</span>}
                          {img.status === 'done' && <>
                            <span>→ <strong className="meta-success">{formatBytes(img.compressedSize)}</strong></span>
                            <span className="meta-savings">{savings(img.originalSize, img.compressedSize)}</span>
                            <span style={{ color: '#cbd5e1' }}>·</span>
                            <span>{img.outputFormat.toUpperCase()} {img.quality}%</span>
                          </>}
                          {img.status === 'error' && <span className="meta-danger">Error: {img.error}</span>}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="tool-image-actions">
                        {img.status === 'done' && (
                          <button className="tool-btn-icon" title="Compare" onClick={() => setCompareId(compareId === img.id ? null : img.id)}>
                            <ZoomIn size={16} />
                          </button>
                        )}
                        {img.status === 'done' && (
                          <button className="btn btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} onClick={() => downloadOne(img)}>
                            <Download size={13} /> Save
                          </button>
                        )}
                        <button className="tool-btn-icon" onClick={() => removeImage(img.id)}><X size={15} /></button>
                      </div>
                    </div>

                    {/* Compare view */}
                    {compareId === img.id && img.compressedPreviewUrl && (
                      <div className="compare-grid">
                        <div>
                          <img src={img.previewUrl} alt="original" />
                          <p className="compare-label">Original — {formatBytes(img.originalSize)}</p>
                        </div>
                        <div>
                          <img src={img.compressedPreviewUrl} alt="compressed" style={{ border: '2px solid #86efac' }} />
                          <p className="compare-label compressed">Compressed — {formatBytes(img.compressedSize)} ({savings(img.originalSize, img.compressedSize)})</p>
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
