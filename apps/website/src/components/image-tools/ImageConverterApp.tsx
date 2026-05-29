'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Download, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import JSZip from 'jszip';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/lib/i18n-config';
import enDict from '@/dictionaries/en.json';

type TargetFormat = 'jpeg' | 'png' | 'webp';

interface ConversionItem {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string;
  status: 'pending' | 'converting' | 'done' | 'error';
  targetFormat: TargetFormat;
  convertedBlob: Blob | null;
  convertedSize: number;
  convertedPreviewUrl: string | null;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function ImageConverterApp({ hideHeader }: { hideHeader?: boolean }) {
  const [items, setItems] = useState<ConversionItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalFormat, setGlobalFormat] = useState<TargetFormat>('webp');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lang = locales.includes(segments[0]) ? segments[0] : defaultLocale;
  const [dict, setDict] = useState<any>(lang === 'en' ? enDict : null);

  useEffect(() => {
    if (lang === 'en') {
      setDict(enDict);
    } else {
      import(`@/dictionaries/${lang}.json`)
        .then((m) => setDict(m.default))
        .catch((err) => {
          console.error(`Failed to load dictionary for ${lang}`, err);
          setDict(enDict);
        });
    }
  }, [lang]);

  const activeDict = dict || enDict;
  const t = activeDict.imageTools?.converter || enDict.imageTools.converter;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'modelContext' in navigator) {
      try {
        const mc = (navigator as any).modelContext;
        mc.provideContext({
          tools: [
            {
              name: 'convert_image',
              description: 'Converts an image from one format (JPEG, PNG, WebP) to another client-side.',
              inputSchema: {
                type: 'object',
                properties: {
                  imageBase64: {
                    type: 'string',
                    description: 'The source image file as a base64 encoded string.'
                  },
                  format: {
                    type: 'string',
                    enum: ['jpeg', 'png', 'webp'],
                    description: 'The target format to convert to.',
                    default: 'webp'
                  }
                },
                required: ['imageBase64']
              },
              execute: async ({ imageBase64, format = 'webp' }: any) => {
                const res = await fetch(imageBase64.startsWith('data:') ? imageBase64 : `data:image/*;base64,${imageBase64}`);
                const blob = await res.blob();
                const file = new File([blob], 'input_image', { type: blob.type });
                
                const mockItem: ConversionItem = {
                  id: 'temp',
                  file,
                  originalSize: file.size,
                  previewUrl: '',
                  status: 'pending',
                  targetFormat: format,
                  convertedBlob: null,
                  convertedSize: 0,
                  convertedPreviewUrl: null
                };
                
                const result = await convertSingle(mockItem, format);
                const reader = new FileReader();
                const base64Promise = new Promise<string>((resolve) => {
                  reader.onloadend = () => resolve(reader.result as string);
                });
                reader.readAsDataURL(result.blob);
                return {
                  success: true,
                  convertedBase64: await base64Promise,
                  originalSize: file.size,
                  convertedSize: result.blob.size
                };
              }
            }
          ]
        });
      } catch (e) {
        console.error('Failed to provide WebMCP context:', e);
      }
    }
  }, []);

  const convertSingle = async (item: ConversionItem, format: TargetFormat): Promise<{ blob: Blob; url: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(item.file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas rendering context not available'));
          return;
        }

        if (format === 'jpeg') {
          // Fill background with white for JPEGs since they don't support alpha transparency
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Conversion failed'));
            return;
          }
          resolve({
            blob,
            url: URL.createObjectURL(blob),
          });
        }, mime, 0.92); // Keep high visual quality
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      img.src = url;
    });
  };

  const processItem = async (id: string, format: TargetFormat) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'converting' } : item));
    try {
      const item = items.find(i => i.id === id);
      if (!item) return;
      const { blob, url } = await convertSingle(item, format);
      setItems(prev => prev.map(i => i.id === id ? {
        ...i,
        status: 'done',
        convertedBlob: blob,
        convertedSize: blob.size,
        convertedPreviewUrl: url,
        targetFormat: format,
      } : i));
    } catch (e: any) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'error', error: e.message } : i));
    }
  };

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/') || f.name.endsWith('.heic'));
    if (!arr.length) return;

    const newItems: ConversionItem[] = arr.map(f => ({
      id: `conv-${Date.now()}-${Math.random()}`,
      file: f,
      originalSize: f.size,
      previewUrl: URL.createObjectURL(f),
      status: 'pending',
      targetFormat: globalFormat,
      convertedBlob: null,
      convertedSize: 0,
      convertedPreviewUrl: null,
    }));

    setItems(prev => [...prev, ...newItems]);
  }, [globalFormat]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  const startConversion = async () => {
    setIsProcessing(true);
    // Process items sequentially to avoid freezing UI
    for (const item of items) {
      if (item.status === 'pending') {
        await processItem(item.id, globalFormat);
      }
    }
    setIsProcessing(false);
  };

  const downloadOne = (item: ConversionItem) => {
    if (!item.convertedBlob) return;
    const ext = item.targetFormat === 'jpeg' ? 'jpg' : item.targetFormat;
    const url = URL.createObjectURL(item.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.file.name.replace(/\.[^.]+$/, '') + `.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const ready = items.filter(i => i.convertedBlob);
    if (!ready.length) return;

    const zip = new JSZip();
    for (const item of ready) {
      const ext = item.targetFormat === 'jpeg' ? 'jpg' : item.targetFormat;
      zip.file(item.file.name.replace(/\.[^.]+$/, '') + `.${ext}`, item.convertedBlob!);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Converted_Images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.convertedPreviewUrl) URL.revokeObjectURL(item.convertedPreviewUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach(i => {
      URL.revokeObjectURL(i.previewUrl);
      if (i.convertedPreviewUrl) URL.revokeObjectURL(i.convertedPreviewUrl);
    });
    setItems([]);
  };

  return (
    <div className="tool-wrapper">
      <div className="tool-container">
        {!hideHeader && (
          <header className="tool-header">
            <div className="tool-badge">NexConvert — Safe &amp; Offline</div>
            <h1>Image Converter</h1>
            <p>Batch convert images between PNG, JPEG, and WebP formats inside your browser. No files are ever sent to a server.</p>
          </header>
        )}

        {items.length === 0 ? (
          <div
            className={`dropzone ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={40} className="upload-icon" />
            <h3>{t.uploadTitle}</h3>
            <p>{t.uploadSubtitle}</p>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>{t.browseBtn}</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              accept="image/*"
              onChange={(e) => { if (e.target.files) addFiles(e.target.files); }}
            />
          </div>
        ) : (
          <div className="workspace-layout">
            <div className="settings-panel">
              <h3>Conversion Settings</h3>
              
              <div className="settings-group">
                <label>Target Format</label>
                <div className="format-toggle" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {(['webp', 'png', 'jpeg'] as TargetFormat[]).map(fmt => (
                    <button
                      key={fmt}
                      className={`btn ${globalFormat === fmt ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setGlobalFormat(fmt)}
                      style={{ padding: '0.5rem 0', textTransform: 'uppercase', fontSize: '0.8rem' }}
                    >
                      {fmt === 'jpeg' ? 'JPG' : fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="actions-column" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={startConversion}
                  disabled={isProcessing || !items.some(i => i.status === 'pending')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <RefreshCw size={16} className={isProcessing ? 'spin' : ''} />
                  Convert All
                </button>

                {items.some(i => i.status === 'done') && (
                  <button
                    className="btn btn-outline"
                    onClick={downloadAll}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Download size={16} />
                    Download ZIP
                  </button>
                )}

                <button
                  className="btn btn-outline btn-danger"
                  onClick={clearAll}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>

            <div className="files-list">
              {items.map((item) => (
                <div key={item.id} className="file-card-item">
                  <img src={item.previewUrl} alt={item.file.name} className="img-thumbnail" />
                  <div className="file-details">
                    <span className="file-name">{item.file.name}</span>
                    <div className="file-meta">
                      <span>{formatBytes(item.originalSize)}</span>
                      {item.status === 'done' && (
                        <>
                          <ArrowRight size={12} style={{ margin: '0 0.5rem' }} />
                          <span className="success-text">
                            {formatBytes(item.convertedSize)} ({item.targetFormat.toUpperCase()})
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="file-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.status === 'pending' && (
                      <button className="btn btn-primary btn-sm" onClick={() => processItem(item.id, globalFormat)}>
                        Convert
                      </button>
                    )}
                    {item.status === 'converting' && <span className="status-label">Converting...</span>}
                    {item.status === 'done' && (
                      <button className="icon-btn" onClick={() => downloadOne(item)} title="Download converted file">
                        <Download size={18} />
                      </button>
                    )}
                    {item.status === 'error' && <span className="error-text">Failed</span>}
                    <button className="icon-btn delete-btn" onClick={() => removeItem(item.id)}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
