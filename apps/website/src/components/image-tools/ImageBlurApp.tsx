'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, X, Download, Trash2, Eye, EyeOff } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/lib/i18n-config';
import enDict from '@/dictionaries/en.json';

interface RedactBox {
  id: string;
  x: number; // in natural image percentage (0 to 1)
  y: number;
  w: number;
  h: number;
  type: 'blur' | 'blackout';
}

async function redactImageHelper(file: File, boxes: RedactBox[]): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Canvas unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      for (const box of boxes) {
        const bx = box.x * img.naturalWidth;
        const by = box.y * img.naturalHeight;
        const bw = box.w * img.naturalWidth;
        const bh = box.h * img.naturalHeight;

        if (box.type === 'blackout') {
          ctx.fillStyle = '#000000';
          ctx.fillRect(bx, by, bw, bh);
        } else if (box.type === 'blur') {
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = bw;
          tempCanvas.height = bh;
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCtx.drawImage(canvas, bx, by, bw, bh, 0, 0, bw, bh);
            const scale = 0.08;
            const sw = Math.max(1, Math.round(bw * scale));
            const sh = Math.max(1, Math.round(bh * scale));
            const scaleCanvas = document.createElement('canvas');
            scaleCanvas.width = sw;
            scaleCanvas.height = sh;
            const scaleCtx = scaleCanvas.getContext('2d');
            if (scaleCtx) {
              scaleCtx.drawImage(tempCanvas, 0, 0, sw, sh);
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(scaleCanvas, 0, 0, sw, sh, bx, by, bw, bh);
              ctx.imageSmoothingEnabled = true;
            }
          }
        }
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Redaction failed'));
        } else {
          resolve(blob);
        }
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });
}

export function ImageBlurApp({ hideHeader }: { hideHeader?: boolean }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boxes, setBoxes] = useState<RedactBox[]>([]);
  const [activeType, setActiveType] = useState<'blur' | 'blackout'>('blur');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
  const t = activeDict.imageTools?.redactor || enDict.imageTools.redactor;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'modelContext' in navigator) {
      try {
        const mc = (navigator as any).modelContext;
        mc.provideContext({
          tools: [
            {
              name: 'redact_image',
              description: 'Blurs or blacks out specific regions of an image client-side for privacy.',
              inputSchema: {
                type: 'object',
                properties: {
                  imageBase64: {
                    type: 'string',
                    description: 'The source image file as a base64 encoded string.'
                  },
                  redactions: {
                    type: 'array',
                    description: 'List of bounding boxes to redact, with coordinates as decimals from 0 to 1.',
                    items: {
                      type: 'object',
                      properties: {
                        x: { type: 'number', description: 'Left coordinate percentage (0-1)' },
                        y: { type: 'number', description: 'Top coordinate percentage (0-1)' },
                        w: { type: 'number', description: 'Width percentage (0-1)' },
                        h: { type: 'number', description: 'Height percentage (0-1)' },
                        type: { type: 'string', enum: ['blur', 'blackout'], description: 'Redaction style' }
                      },
                      required: ['x', 'y', 'w', 'h', 'type']
                    }
                  }
                },
                required: ['imageBase64', 'redactions']
              },
              execute: async ({ imageBase64, redactions }: any) => {
                const res = await fetch(imageBase64.startsWith('data:') ? imageBase64 : `data:image/*;base64,${imageBase64}`);
                const blob = await res.blob();
                const file = new File([blob], 'input_image', { type: blob.type });
                
                const boxes: RedactBox[] = redactions.map((r: any, idx: number) => ({
                  id: `temp-${idx}`,
                  x: r.x, y: r.y, w: r.w, h: r.h, type: r.type
                }));
                
                const resultBlob = await redactImageHelper(file, boxes);
                const reader = new FileReader();
                const base64Promise = new Promise<string>((resolve) => {
                  reader.onloadend = () => resolve(reader.result as string);
                });
                reader.readAsDataURL(resultBlob);
                return {
                  success: true,
                  redactedBase64: await base64Promise,
                  originalSize: file.size,
                  redactedSize: resultBlob.size
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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadImage(file);
    }
  }, []);

  const loadImage = (file: File) => {
    setImageFile(file);
    const src = URL.createObjectURL(file);
    setImageSrc(src);
    setBoxes([]);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  // Convert client cursor coordinates to percentages relative to the displayed image
  const getRelativeCoords = (clientX: number, clientY: number) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    e.preventDefault();
    const coords = getRelativeCoords(e.clientX, e.clientY);
    setStartPos(coords);
    setCurrentPos(coords);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const coords = getRelativeCoords(e.clientX, e.clientY);
    setCurrentPos(coords);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Calculate box geometry in percentage
    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    const w = Math.abs(startPos.x - currentPos.x);
    const h = Math.abs(startPos.y - currentPos.y);

    // Only add boxes that have some actual volume (avoid tiny clicks)
    if (w > 0.005 && h > 0.005) {
      const newBox: RedactBox = {
        id: `box-${Date.now()}-${Math.random()}`,
        x, y, w, h,
        type: activeType
      };
      setBoxes(prev => [...prev, newBox]);
    }
  };

  const deleteBox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBoxes(prev => prev.filter(b => b.id !== id));
  };

  const clearAll = () => {
    setBoxes([]);
  };

  const resetTool = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setImageFile(null);
    setImageSrc(null);
    setBoxes([]);
  };

  const downloadRedacted = async () => {
    if (!imageRef.current || !imageSrc || !imageFile) return;

    const img = new Image();
    img.src = imageSrc;
    await new Promise((resolve) => { img.onload = resolve; });

    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Apply redactions
    for (const box of boxes) {
      const bx = box.x * dimensions.width;
      const by = box.y * dimensions.height;
      const bw = box.w * dimensions.width;
      const bh = box.h * dimensions.height;

      if (box.type === 'blackout') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(bx, by, bw, bh);
      } else if (box.type === 'blur') {
        // Draw blurred selection using an offscreen canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = bw;
        tempCanvas.height = bh;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          // Draw the sliced region
          tempCtx.drawImage(canvas, bx, by, bw, bh, 0, 0, bw, bh);
          
          // Pixelate it (efficient, works cross-browser without filter bugs)
          const scale = 0.08; // Downscale factor
          const sw = Math.max(1, Math.round(bw * scale));
          const sh = Math.max(1, Math.round(bh * scale));
          
          const scaleCanvas = document.createElement('canvas');
          scaleCanvas.width = sw;
          scaleCanvas.height = sh;
          const scaleCtx = scaleCanvas.getContext('2d');
          if (scaleCtx) {
            scaleCtx.drawImage(tempCanvas, 0, 0, sw, sh);
            
            ctx.imageSmoothingEnabled = false;
            // Draw pixelated slice back to main canvas
            ctx.drawImage(scaleCanvas, 0, 0, sw, sh, bx, by, bw, bh);
            ctx.imageSmoothingEnabled = true;
          }
        }
      }
    }

    // Trigger download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imageFile.name.replace(/\.[^.]+$/, '') + '_redacted.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="tool-wrapper">
      <div className="tool-container">
        {!hideHeader && (
          <header className="tool-header">
            <div className="tool-badge">NexRedact — Privacy &amp; Security</div>
            <h1>Privacy Blur &amp; Redact</h1>
            <p>Hide sensitive data on screenshots, files, and credentials locally in your browser before uploading them elsewhere.</p>
          </header>
        )}

        {!imageSrc ? (
          <div
            className={`dropzone ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={40} className="upload-icon" />
            <h2 style={{ fontSize: '1.15rem' }}>{t.uploadTitle}</h2>
            <p>{t.uploadSubtitle}</p>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>{t.chooseBtn}</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => { if (e.target.files?.[0]) loadImage(e.target.files[0]); }}
            />
          </div>
        ) : (
          <div className="workspace-layout flex-col">
            <div className="redact-toolbar">
              <div className="tool-select-group">
                <button
                  className={`btn ${activeType === 'blur' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveType('blur')}
                >
                  <EyeOff size={16} /> {t.blurMode}
                </button>
                <button
                  className={`btn ${activeType === 'blackout' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setActiveType('blackout')}
                >
                  <Eye size={16} /> {t.redactMode}
                </button>
              </div>

              <div className="action-buttons-group">
                <button className="btn btn-primary" onClick={downloadRedacted} disabled={boxes.length === 0}>
                  <Download size={16} /> {t.downloadBtn}
                </button>
                <button className="btn btn-outline" onClick={clearAll} disabled={boxes.length === 0}>
                  {t.resetBtn}
                </button>
                <button className="btn btn-outline btn-danger" onClick={resetTool}>
                  <Trash2 size={16} /> Close Image
                </button>
              </div>
            </div>

            <div className="editor-container" ref={containerRef}>
              <div
                className="image-editor-canvas-wrapper"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ position: 'relative', userSelect: 'none', display: 'inline-block' }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Editor workspace"
                  onLoad={onImageLoad}
                  style={{ display: 'block', maxWidth: '100%', maxHeight: '70vh', pointerEvents: 'none' }}
                />

                {/* Render Drawn Redaction Overlay Box Blocks */}
                {boxes.map((box) => (
                  <div
                    key={box.id}
                    className={`redaction-box-render ${box.type}`}
                    style={{
                      position: 'absolute',
                      left: `${box.x * 100}%`,
                      top: `${box.y * 100}%`,
                      width: `${box.w * 100}%`,
                      height: `${box.h * 100}%`,
                      boxShadow: '0 0 0 1px var(--primary-color)',
                      overflow: 'hidden'
                    }}
                  >
                    {box.type === 'blackout' ? (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#000000' }} />
                    ) : (
                      // Pixelated backdrop filter placeholder effect
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backdropFilter: 'blur(12px) contrast(1.1) brightness(0.95)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backgroundImage: 'radial-gradient(var(--bg-3) 1px, transparent 1px)',
                          backgroundSize: '4px 4px'
                        }}
                      />
                    )}
                    <button
                      className="delete-box-btn"
                      onClick={(e) => deleteBox(box.id, e)}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'rgba(0, 0, 0, 0.65)',
                        border: 'none',
                        borderRadius: '50%',
                        color: '#fff',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Render Active Drawing Rectangle */}
                {isDrawing && (
                  <div
                    style={{
                      position: 'absolute',
                      border: '2px dashed var(--primary-color)',
                      backgroundColor: activeType === 'blackout' ? 'rgba(0,0,0,0.6)' : 'rgba(99,102,241,0.25)',
                      left: `${Math.min(startPos.x, currentPos.x) * 100}%`,
                      top: `${Math.min(startPos.y, currentPos.y) * 100}%`,
                      width: `${Math.abs(startPos.x - currentPos.x) * 100}%`,
                      height: `${Math.abs(startPos.y - currentPos.y) * 100}%`,
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            </div>
            
            <p className="editor-instructions" style={{ margin: '1rem 0 0 0', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
              💡 Click and drag any rectangle on the image to blur or blackout details. Click the &times; on a box to remove it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
