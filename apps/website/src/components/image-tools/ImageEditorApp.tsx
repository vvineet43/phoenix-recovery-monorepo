'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, X, Download, Trash2, ZoomIn, Image as ImageIcon, 
  FileImage, CheckCircle2, AlertCircle, Shield, Zap, Info, 
  ChevronLeft, RefreshCw, Droplet, Maximize, Scissors, Type,
  Settings2, Sliders, Eye, FileUp, Sparkles
} from 'lucide-react';
import JSZip from 'jszip';
import './image-tools.css';
import Link from 'next/link';
import { getFileFromTransition, clearTransitionFile } from '../../lib/db';

type OutputFormat = 'jpeg' | 'png' | 'webp';
type ToolMode = 'compress' | 'strip' | 'convert' | 'remove-bg' | 'blur' | 'resize' | 'watermark';

interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  transformedBlob: Blob | null;
  transformedSize: number;
  transformedPreviewUrl: string | null;
  metadata: Record<string, string> | null;
  error?: string;
}

export function ImageEditorApp() {
  const [mode, setMode] = useState<ToolMode>('compress');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>('jpeg');
  const [blurAmount, setBlurAmount] = useState(15);
  const [resizeScale, setResizeScale] = useState(50);
  const [watermarkText, setWatermarkText] = useState('NexImage');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);

  const selectedImage = images[selectedIndex];

  const processOne = async (id: string, file: File, currentMode: ToolMode) => {
    setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'processing' } : i));
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      const { blob, previewUrl } = await new Promise<{ blob: Blob; previewUrl: string }>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.naturalWidth;
          let height = img.naturalHeight;
          if (currentMode === 'resize') {
            width = Math.floor(width * (resizeScale / 100));
            height = Math.floor(height * (resizeScale / 100));
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Canvas error')); return; }
          if (currentMode === 'blur') ctx.filter = `blur(${blurAmount}px)`;
          if (format === 'jpeg' || currentMode === 'strip') {
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height);
          }
          ctx.drawImage(img, 0, 0, width, height);
          if (currentMode === 'watermark') {
            ctx.filter = 'none';
            ctx.fillStyle = `rgba(255, 255, 255, ${watermarkOpacity})`;
            ctx.font = `bold ${Math.max(24, width * 0.05)}px Inter, sans-serif`;
            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
            ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 4;
            ctx.fillText(watermarkText, width - 40, height - 40);
          }
          URL.revokeObjectURL(url);
          const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
          canvas.toBlob(b => {
            if (!b) { reject(new Error('Export failed')); return; }
            resolve({ blob: b, previewUrl: URL.createObjectURL(b) });
          }, mime, format === 'png' ? undefined : quality / 100);
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
        img.src = url;
      });
      let metadata = null;
      if (currentMode === 'strip') {
        try { 
          const exifr = (await import('exifr')).default; 
          const data = await exifr.parse(file, { tiff: true, gps: true, exif: true });
          if (data) {
             const include = ['Make','Model','Software','DateTime','DateTimeOriginal','GPSLatitude','GPSLongitude','GPSAltitude','Artist','Copyright','ExposureTime','FNumber','ISO','FocalLength','LensModel','ImageWidth','ImageHeight'];
             const out: Record<string, string> = {};
             for (const key of include) { if (data[key] != null) out[key] = String(data[key]); }
             metadata = Object.keys(out).length > 0 ? out : null;
          }
        } catch { metadata = null; }
      }
      setImages(prev => prev.map(i => i.id === id ? {
        ...i, status: 'done', transformedBlob: blob, transformedSize: blob.size,
        transformedPreviewUrl: previewUrl, metadata
      } : i));
    } catch (e: any) {
      setImages(prev => prev.map(i => i.id === id ? { ...i, status: 'error', error: e.message } : i));
    }
  };

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/') || f.name.toLowerCase().endsWith('.heic'));
    if (!arr.length) return;
    const newImages: ImageFile[] = arr.map(f => ({
      id: `img-${Date.now()}-${Math.random()}`, file: f, originalSize: f.size,
      previewUrl: URL.createObjectURL(f), status: 'pending',
      transformedBlob: null, transformedSize: 0, transformedPreviewUrl: null, metadata: null
    }));
    setImages(prev => [...prev, ...newImages]);
    for (const img of newImages) await processOne(img.id, img.file, mode);
  }, [mode, quality, format, blurAmount, resizeScale, watermarkText, watermarkOpacity]);

  useEffect(() => {
    const timer = setTimeout(() => {
      images.forEach(img => processOne(img.id, img.file, mode));
    }, 400);
    return () => clearTimeout(timer);
  }, [mode, quality, format, blurAmount, resizeScale, watermarkText, watermarkOpacity]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      if (tool) setMode(tool as ToolMode);
      const handlePreload = async () => {
        if (params.get('preloaded') === 'true') {
          const file = await getFileFromTransition();
          if (file) { void addFiles([file]); void clearTransitionFile(); }
        }
      };
      void handlePreload();
    }
  }, []);

  const downloadAll = async () => {
    const ready = images.filter(i => i.transformedBlob);
    if (!ready.length) return;
    setIsZipping(true);
    const zip = new JSZip();
    for (const img of ready) {
      const ext = format === 'jpeg' ? 'jpg' : format;
      zip.file(img.file.name.replace(/\.[^.]+$/, '') + `_nex.${ext}`, img.transformedBlob!);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NexImage_Export.zip';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsZipping(false);
  };

  const clearAll = () => {
    images.forEach(i => {
      URL.revokeObjectURL(i.previewUrl);
      if (i.transformedPreviewUrl) URL.revokeObjectURL(i.transformedPreviewUrl);
    });
    setImages([]);
    setSelectedIndex(0);
  };

  return (
    <div className="image-editor-app">
      <div className="container" style={{ paddingTop: '1rem' }}>
        <header className="tool-header" style={{ paddingBottom: '1rem' }}>
          <div className="badge">
            {mode === 'compress' ? 'NexCompress — Local & Private' : 
             mode === 'strip' ? 'NexStrip — Free & Private' : 
             'NexImage — Professional Toolkit'}
          </div>
          <h1>
            {mode === 'compress' ? 'Image Compressor' : 
             mode === 'strip' ? 'EXIF & Metadata Stripper' : 
             'Professional Image Editor'}
          </h1>
          <p>
            {mode === 'compress' ? 'Compress JPG, PNG, and WebP images entirely in your browser. Adjust quality, choose a format, and download — nothing leaves your device.' : 
             mode === 'strip' ? 'Drop in your photos. See exactly what metadata is embedded — GPS, camera, timestamps. Download clean copies with all of it removed.' : 
             'Professional, private, and powerful tools that run 100% in your browser.'}
          </p>
        </header>

        {images.length === 0 ? (
          <div 
            className={`tool-upload-zone ${isDragging ? 'drag-active' : ''}`}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="tool-upload-icon" size={48} />
            <p className="tool-upload-title">Drop images here</p>
            <p className="tool-upload-subtitle">JPG, PNG, WebP or HEIC — Batch supported</p>
            <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden-input" onChange={e => e.target.files && addFiles(e.target.files)} />
          </div>
        ) : (
          <div className="workspace-card">
            <div className="workspace-toolbar">
                <div className="tool-buttons">
                  <button className={mode === 'compress' ? 'active' : ''} onClick={() => setMode('compress')} title="Compress Image"><Zap size={16} /> Compress</button>
                  <button className={mode === 'strip' ? 'active' : ''} onClick={() => setMode('strip')} title="Strip Metadata"><Shield size={16} /> Privacy</button>
                  <button className={mode === 'convert' ? 'active' : ''} onClick={() => setMode('convert')} title="Format Conversion"><RefreshCw size={16} /> HEIC to JPG</button>
                  <button className={mode === 'remove-bg' ? 'active' : ''} onClick={() => setMode('remove-bg')} title="Remove Background"><Scissors size={16} /> Remove BG</button>
                  <button className={mode === 'resize' ? 'active' : ''} onClick={() => setMode('resize')} title="Resize & Crop"><Maximize size={16} /> Resize</button>
                  <button className={mode === 'blur' ? 'active' : ''} onClick={() => setMode('blur')} title="Blur & Censor"><Droplet size={16} /> Blur</button>
                  <button className={mode === 'watermark' ? 'active' : ''} onClick={() => setMode('watermark')} title="Add Watermark"><Type size={16} /> Watermark</button>
                </div>
                <button className="btn btn-primary" onClick={downloadAll} disabled={isZipping}>
                  <Download size={16} /> {isZipping ? 'Zipping...' : `Download All (${images.length})`}
                </button>
            </div>

            <div className="workspace-body">
              <div className="preview-stage">
                <div className="preview-main">
                  {selectedImage?.status === 'processing' && <div className="spinner-overlay"><RefreshCw className="spin" /></div>}
                  <img src={selectedImage?.transformedPreviewUrl || selectedImage?.previewUrl} alt="preview" />
                </div>
                <div className="preview-stats">
                   <div className="stat-group">
                     <span className="label">ORIGINAL</span>
                     <span className="value">{(selectedImage?.originalSize / 1024).toFixed(0)} KB</span>
                   </div>
                   <div className="stat-group">
                     <span className="label">PROCESSED</span>
                     <span className="value green">{(selectedImage?.transformedSize / 1024).toFixed(0)} KB</span>
                   </div>
                   <div className="stat-group">
                     <span className="label">SAVINGS</span>
                     <span className="value green">
                        {selectedImage?.transformedSize ? 
                          `-${(((selectedImage.originalSize - selectedImage.transformedSize) / selectedImage.originalSize) * 100).toFixed(0)}%` : 
                          '0%'}
                     </span>
                   </div>
                </div>
              </div>

              <aside className="workspace-inspector">
                 <div className="inspector-title"><Settings2 size={16} /> Inspector</div>
                 
                 <div className="inspector-scroll">
                   <div className="control-field">
                     <label>Output Format</label>
                     <div className="toggle-group">
                       {(['jpeg', 'png', 'webp'] as OutputFormat[]).map(f => (
                         <button key={f} className={format === f ? 'active' : ''} onClick={() => setFormat(f)}>{f.toUpperCase()}</button>
                       ))}
                     </div>
                   </div>

                   <div className="control-field">
                     <label>Quality: <strong>{quality}%</strong></label>
                     <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} />
                   </div>

                   {mode === 'blur' && (
                     <div className="control-field">
                       <label>Blur Intensity: <strong>{blurAmount}px</strong></label>
                       <input type="range" min="0" max="50" value={blurAmount} onChange={e => setBlurAmount(Number(e.target.value))} />
                     </div>
                   )}

                   {mode === 'resize' && (
                     <div className="control-field">
                       <label>Scale: <strong>{resizeScale}%</strong></label>
                       <input type="range" min="10" max="150" value={resizeScale} onChange={e => setResizeScale(Number(e.target.value))} />
                     </div>
                   )}

                   {mode === 'watermark' && (
                     <div className="control-field">
                       <label>Watermark Text</label>
                       <input type="text" className="input-text" value={watermarkText} onChange={e => setWatermarkText(e.target.value)} />
                       <label style={{marginTop: '1rem'}}>Opacity: <strong>{Math.floor(watermarkOpacity * 100)}%</strong></label>
                       <input type="range" min="0.1" max="1" step="0.1" value={watermarkOpacity} onChange={e => setWatermarkOpacity(Number(e.target.value))} />
                     </div>
                   )}

                   {mode === 'strip' && selectedImage?.metadata && (
                     <div className="control-field">
                        <label style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Shield size={14} /> Hidden Metadata Found
                        </label>
                        <div className="metadata-peek-grid">
                          {Object.entries(selectedImage.metadata).map(([k, v]) => (
                            <div key={k} className="metadata-tag-item">
                               <span className="m-key">{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                               <span className={`m-val ${k.includes('GPS') ? 'm-danger' : ''}`}>{String(v)}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}
                 </div>

                 <div className="inspector-actions">
                    <button className="btn btn-outline" style={{width: '100%', color: '#ef4444'}} onClick={() => {
                      const newImages = [...images];
                      newImages.splice(selectedIndex, 1);
                      setImages(newImages);
                      if (selectedIndex >= newImages.length) setSelectedIndex(Math.max(0, newImages.length - 1));
                    }}>
                      <Trash2 size={16} /> Remove File
                    </button>
                    <button className="btn btn-outline" style={{width: '100%', marginTop: '0.5rem'}} onClick={clearAll}>
                      Clear Session
                    </button>
                 </div>
              </aside>
            </div>

            <div className="workspace-filmstrip">
               <div className="filmstrip-scroll">
                  {images.map((img, i) => (
                    <div key={img.id} className={`filmstrip-thumb ${selectedIndex === i ? 'active' : ''}`} onClick={() => setSelectedIndex(i)}>
                      <img src={img.previewUrl} alt="thumb" />
                      {img.status === 'processing' && <div className="thumb-spin"><RefreshCw size={12} className="spin" /></div>}
                    </div>
                  ))}
                  <button className="btn-add-thumb" onClick={() => fileInputRef.current?.click()}><FileUp size={18} /></button>
               </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .workspace-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .workspace-toolbar {
          padding: 0.75rem 1.5rem;
          background: var(--bg-2);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .tool-buttons {
          display: flex;
          gap: 0.25rem;
          background: #e2e8f0;
          padding: 0.25rem;
          border-radius: 10px;
        }

        .tool-buttons button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .tool-buttons button:hover { color: var(--text); }
        .tool-buttons button.active { background: #fff; color: var(--text); box-shadow: var(--shadow-sm); }

        .workspace-body {
          display: flex;
          height: 520px;
        }

        .preview-stage {
          flex: 1;
          background: #f1f5f9;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .preview-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .preview-main img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          box-shadow: var(--shadow-lg);
          background: #fff;
        }

        .spinner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .preview-stats {
          background: #fff;
          padding: 0.75rem 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 2rem;
        }

        .stat-group { display: flex; flex-direction: column; }
        .stat-group .label { font-size: 0.65rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.05em; }
        .stat-group .value { font-size: 1rem; font-weight: 700; color: var(--text); }
        .stat-group .value.green { color: #16a34a; }

        .workspace-inspector {
          width: 320px;
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          background: #fff;
          overflow: hidden;
        }

        .inspector-title {
          padding: 1.5rem 1.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text);
          border-bottom: 1px solid var(--border);
        }

        .inspector-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .control-field { margin-bottom: 1.5rem; }
        .control-field label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem; }
        
        .toggle-group { display: flex; background: var(--bg-3); padding: 0.25rem; border-radius: 8px; }
        .toggle-group button { flex: 1; border: none; background: transparent; padding: 0.4rem; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); border-radius: 6px; cursor: pointer; }
        .toggle-group button.active { background: #fff; color: var(--text); box-shadow: var(--shadow-sm); }

        input[type="range"] { width: 100%; height: 5px; background: var(--bg-3); border-radius: 5px; -webkit-appearance: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: var(--primary); border-radius: 50%; cursor: pointer; }
        
        .input-text { width: 100%; padding: 0.6rem; border: 1px solid var(--border); border-radius: var(--radius); font-family: inherit; font-size: 0.875rem; }

        .metadata-peek-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .metadata-tag-item {
          padding: 0.5rem;
          background: var(--bg-2);
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 0.75rem;
        }

        .m-key { display: block; color: var(--text-muted); font-weight: 700; text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em; margin-bottom: 2px; }
        .m-val { display: block; color: var(--text); word-break: break-all; }
        .m-danger { color: #ef4444; font-weight: 600; }

        .inspector-actions {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
          background: var(--bg-2);
        }

        .workspace-filmstrip {
          padding: 0.75rem;
          background: #fff;
          border-top: 1px solid var(--border);
        }

        .filmstrip-scroll { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.25rem; }
        
        .filmstrip-thumb { 
          height: 60px; width: 60px; flex-shrink: 0; border-radius: 6px; overflow: hidden; 
          border: 2px solid transparent; cursor: pointer; position: relative; 
        }
        .filmstrip-thumb.active { border-color: var(--primary); }
        .filmstrip-thumb img { width: 100%; height: 100%; object-fit: cover; }
        
        .btn-add-thumb { 
          height: 60px; width: 60px; flex-shrink: 0; border-radius: 6px; 
          border: 2px dashed var(--border); background: transparent; color: var(--text-muted); 
          display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
