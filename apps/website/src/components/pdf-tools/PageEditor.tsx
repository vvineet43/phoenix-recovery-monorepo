import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import SignatureCanvas from 'react-signature-canvas';
import { X, Type, Calendar, PenTool, Upload, Save, Trash2, Link, ShieldAlert, Crop } from 'lucide-react';
import type { PdfPageInfo, PdfFileInfo, Annotation } from '../../lib/pdf';

interface PageEditorProps {
  page: PdfPageInfo;
  files: Record<string, PdfFileInfo>;
  onClose: () => void;
  onSave: (pageId: string, annotations: Annotation[]) => void;
  onApplyToAll?: (anno: Annotation) => void;
}

function viewportScaleForScreen(baseW: number, baseH: number) {
  if (typeof window === 'undefined') return 1.5;
  const margin = 28;
  const maxW = Math.min(window.innerWidth - margin, 920);
  const maxH = Math.max(280, window.innerHeight - 220);
  return Math.min(2, Math.max(0.35, Math.min(maxW / baseW, maxH / baseH)));
}

export function PageEditor({ page, files, onClose, onSave, onApplyToAll }: PageEditorProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>(page.annotations || []);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [sigPadWidth, setSigPadWidth] = useState(320);
  const [viewportKey, setViewportKey] = useState(0);
  
  // Signature Modal State
  const [showSigModal, setShowSigModal] = useState(false);
  const [sigType, setSigType] = useState<'draw' | 'upload'>('draw');
  const [pendingSignaturePos, setPendingSignaturePos] = useState<{x: number, y: number} | null>(null);
  const [savedSignatures, setSavedSignatures] = useState<string[]>(() => JSON.parse(localStorage.getItem('nexpdf_signatures') || '[]'));
  const [isCropping, setIsCropping] = useState(false);
  const [cropBox, setCropBox] = useState<{x: number, y: number, width: number, height: number} | null>(page.cropBox ? {
    x: page.cropBox.x * dimensions.width,
    y: page.cropBox.y * dimensions.height,
    width: page.cropBox.width * dimensions.width,
    height: page.cropBox.height * dimensions.height
  } : null);
  const sigPadRef = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const syncSigWidth = () => {
      setSigPadWidth(Math.max(220, Math.min(480, window.innerWidth - 40)));
    };
    syncSigWidth();
    window.addEventListener('resize', syncSigWidth);
    return () => window.removeEventListener('resize', syncSigWidth);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const bump = () => {
      clearTimeout(t);
      t = setTimeout(() => setViewportKey((k) => k + 1), 120);
    };
    window.addEventListener('resize', bump);
    window.addEventListener('orientationchange', bump);
    return () => {
      window.removeEventListener('resize', bump);
      window.removeEventListener('orientationchange', bump);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function renderPage() {
      setIsLoading(true);
      try {
        const fileInfo = files[page.fileId];
        if (!fileInfo) return;
        
        const doc = fileInfo.doc;
        const pdfPage = await doc.getPage(page.pageIndex + 1);

        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const scale = viewportScaleForScreen(baseViewport.width, baseViewport.height);
        const viewport = pdfPage.getViewport({ scale });
        setDimensions({ width: viewport.width, height: viewport.height });
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        await pdfPage.render({
          canvasContext: context,
          viewport: viewport
        } as any).promise;
        
        // Convert percentages back to exact pixels for this specific viewport size
        if (page.annotations && page.annotations.length > 0) {
          setAnnotations(page.annotations.map(a => ({
            ...a,
            x: a.pctX !== undefined ? a.pctX * viewport.width : a.x,
            y: a.pctY !== undefined ? a.pctY * viewport.height : a.y,
            width: a.pctW !== undefined ? a.pctW * viewport.width : a.width,
            height: a.pctH !== undefined ? a.pctH * viewport.height : a.height,
          })));
        }

      } catch (error) {
        console.error("Error rendering editor:", error);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    renderPage();
    return () => { active = false; };
  }, [page, files, viewportKey]);

  const addAnnotation = (type: 'text' | 'date' | 'signature' | 'link', content: string = '', x: number = 50, y: number = 50) => {
    const id = `anno-${Date.now()}`;
    const newAnno: Annotation = {
      id,
      type: type as any,
      x,
      y,
      width: type === 'signature' ? 200 : type === 'link' ? 120 : 150,
      height: type === 'signature' ? 100 : type === 'link' ? 40 : 40,
      content,
      fontSize: 16
    };
    if (type === 'date') {
      newAnno.content = new Date().toLocaleDateString();
    } else if (type === 'text' && !content) {
      newAnno.content = 'New Text';
    } else if (type === 'link') {
      newAnno.url = 'https://';
    }
    setAnnotations([...annotations, newAnno]);
  };

  const addRedaction = (x: number = 50, y: number = 50) => {
    const id = `anno-${Date.now()}`;
    const newAnno: Annotation = {
      id,
      type: 'redact',
      x,
      y,
      width: 100,
      height: 40,
      content: ''
    };
    setAnnotations([...annotations, newAnno]);
  };

  const updateAnnotation = (id: string, updates: Partial<Annotation>) => {
    setAnnotations(annotations.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  const handleSaveSignature = () => {
    if (sigType === 'draw' && sigPadRef.current) {
      try {
        let canvas = sigPadRef.current.getCanvas();
        try {
          canvas = sigPadRef.current.getTrimmedCanvas();
        } catch (trimErr) {
          // Fallback if trim fails
        }
        const dataUrl = canvas.toDataURL('image/png');
        const x = pendingSignaturePos ? pendingSignaturePos.x : 50;
        const y = pendingSignaturePos ? pendingSignaturePos.y : 50;
        addAnnotation('signature', dataUrl, x, y);
        
        const updatedSignatures = [dataUrl, ...savedSignatures.filter(s => s !== dataUrl)].slice(0, 5);
        setSavedSignatures(updatedSignatures);
        localStorage.setItem('nexpdf_signatures', JSON.stringify(updatedSignatures));
        
        setPendingSignaturePos(null);
        setShowSigModal(false);
      } catch (err) {
        console.error(err);
        alert('Could not capture signature.');
      }
    }
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const x = pendingSignaturePos ? pendingSignaturePos.x : 50;
      const y = pendingSignaturePos ? pendingSignaturePos.y : 50;
      addAnnotation('signature', dataUrl, x, y);
      
      const updatedSignatures = [dataUrl, ...savedSignatures.filter(s => s !== dataUrl)].slice(0, 5);
      setSavedSignatures(updatedSignatures);
      localStorage.setItem('nexpdf_signatures', JSON.stringify(updatedSignatures));
      
      setPendingSignaturePos(null);
      setShowSigModal(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Convert px to percentages relative to current canvas dimensions
    const percentAnnotations = annotations.map(a => ({
      ...a,
      pctX: a.x / dimensions.width,
      pctY: a.y / dimensions.height,
      pctW: a.width / dimensions.width,
      pctH: a.height / dimensions.height
    }));
    // Also include cropBox if any
    const finalCropBox = cropBox ? {
      x: cropBox.x / dimensions.width,
      y: cropBox.y / dimensions.height,
      width: cropBox.width / dimensions.width,
      height: cropBox.height / dimensions.height
    } : undefined;
    
    // We need to pass cropBox to the save function
    // But onSave only takes pageId and annotations. 
    // I should probably update the onSave signature or use a different approach.
    // Let's assume for now I'll hack it into the page object update in the parent.
    // Wait, I'll update the prop to handle cropBox.
    (onSave as any)(page.id, percentAnnotations, finalCropBox);
  };

  return (
    <div className="editor-overlay">
      <div className="editor-header">
        <h2>Annotate Page</h2>
        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} /> Save & Return
          </button>
        </div>
      </div>

      <div className="editor-main">
        <div className="editor-sidebar">
          <h3>Drag Tools to Page</h3>
          <div 
            className="tool-item" 
            draggable 
            onDragStart={(e) => e.dataTransfer.setData('anno-type', 'text')}
          >
            <Type size={20} /> Text Field
          </div>
          <div 
            className="tool-item" 
            draggable 
            onDragStart={(e) => e.dataTransfer.setData('anno-type', 'date')}
          >
            <Calendar size={20} /> Date Field
          </div>
          <div 
            className="tool-item" 
            draggable 
            onDragStart={(e) => e.dataTransfer.setData('anno-type', 'signature')}
          >
            <PenTool size={20} /> Signature
          </div>
          <div 
            className="tool-item" 
            draggable 
            onDragStart={(e) => { e.dataTransfer.setData('anno-type', 'link'); }}
          >
            <Link size={20} /> Hyperlink Area
          </div>
          <div 
            className="tool-item" 
            draggable 
            onDragStart={(e) => { e.dataTransfer.setData('anno-type', 'redact'); }}
          >
            <ShieldAlert size={20} /> Redact Area
          </div>
          <div 
            className={`tool-item ${isCropping ? 'active' : ''}`} 
            onClick={() => setIsCropping(!isCropping)}
          >
            <Crop size={20} /> {isCropping ? 'Stop Cropping' : 'Crop Page'}
          </div>
          <p className="tool-hint">Drag items onto the document.</p>
        </div>

        <div className="editor-workspace">
        {isLoading && (
          <div className="loading-overlay" style={{ position: 'absolute' }}>
            <div className="spinner"></div>
            <p>Loading document editor...</p>
          </div>
        )}
        
        <div 
          className="editor-canvas-container" 
          ref={containerRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('anno-type');
            const content = e.dataTransfer.getData('anno-content');
            if (!type) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (type === 'signature') {
              setPendingSignaturePos({ x, y });
              setShowSigModal(true);
            } else if (type === 'redact') {
              addRedaction(x, y);
            } else {
              addAnnotation(type as any, content || '', x, y);
            }
          }}
          style={{ 
            width: dimensions.width, 
            height: dimensions.height,
            opacity: isLoading ? 0 : 1,
            transform: `rotate(${page.rotation}deg)`
          }}
        >
          <canvas ref={canvasRef} className="editor-canvas" />
          
          {annotations.map(anno => (
            <Rnd
              key={anno.id}
              bounds="parent"
              position={{ x: anno.x, y: anno.y }}
              size={{ width: anno.width, height: anno.height }}
              onDragStop={(_e, d) => updateAnnotation(anno.id, { x: d.x, y: d.y })}
              onResizeStop={(_e, _dir, ref, _delta, position) => {
                updateAnnotation(anno.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...position
                });
              }}
              className="annotation-node"
              cancel=".anno-textarea, .delete-anno-btn"
            >
              <button 
                className="delete-anno-btn" 
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); deleteAnnotation(anno.id); }}
              >
                <X size={14} />
              </button>
              
              {anno.type === 'signature' ? (
                <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <img src={anno.content} alt="Signature" style={{ width: '100%', height: '100%', objectFit: 'contain' }} draggable={false} />
                </div>
              ) : anno.type === 'link' ? (
                <div style={{ width: '100%', height: '100%', background: 'rgba(59, 130, 246, 0.2)', border: '2px dashed #3b82f6', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#3b82f6', color: 'white', fontSize: '10px', padding: '2px 4px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Link Area</span>
                    {onApplyToAll && (
                      <button onClick={(e) => { e.stopPropagation(); onApplyToAll(anno); }} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '10px', textDecoration: 'underline' }}>Apply to All</button>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={anno.url || ''} 
                    onChange={(e) => updateAnnotation(anno.id, { url: e.target.value })} 
                    style={{ width: '100%', border: 'none', padding: '4px', fontSize: '12px', outline: 'none' }}
                    placeholder="https://"
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  />
                </div>
              ) : anno.type === 'redact' ? (
                <div style={{ width: '100%', height: '100%', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                  REDACTED
                </div>
              ) : (
                <textarea
                  className="anno-textarea"
                  value={anno.content}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onChange={(e) => updateAnnotation(anno.id, { content: e.target.value })}
                  style={{ fontSize: anno.fontSize || 16, color: anno.color || '#000000' }}
                  spellCheck={false}
                />
              )}
              
              {(anno.type === 'text' || anno.type === 'date') && (
                <div 
                  className="anno-toolbar" 
                  onMouseDown={(e) => e.stopPropagation()}
                  style={{ 
                    position: 'absolute', top: -35, left: 0, display: 'flex', gap: '5px', 
                    background: '#fff', padding: '2px 5px', borderRadius: '4px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 100 
                  }}
                >
                  <input 
                    type="color" 
                    value={anno.color || '#000000'} 
                    onChange={(e) => updateAnnotation(anno.id, { color: e.target.value })}
                    style={{ width: '20px', height: '20px', padding: 0, border: 'none', cursor: 'pointer' }}
                  />
                  <select 
                    value={anno.fontSize || 16} 
                    onChange={(e) => updateAnnotation(anno.id, { fontSize: parseInt(e.target.value) })}
                    style={{ fontSize: '12px', padding: '0 2px' }}
                  >
                    {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64].map(s => (
                      <option key={s} value={s}>{s}px</option>
                    ))}
                  </select>
                </div>
              )}
            </Rnd>
          ))}

          {isCropping && (
            <Rnd
              bounds="parent"
              size={{ width: cropBox?.width || 200, height: cropBox?.height || 200 }}
              position={{ x: cropBox?.x || 50, y: cropBox?.y || 50 }}
              onDragStop={(_e, d) => setCropBox(prev => ({ ...prev!, x: d.x, y: d.y }))}
              onResizeStop={(_e, _dir, ref, _delta, position) => {
                setCropBox({
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...position
                });
              }}
              style={{ border: '2px dashed #ff4d4d', background: 'rgba(255, 77, 77, 0.1)', zIndex: 1000 }}
            >
              <div style={{ position: 'absolute', top: -25, left: 0, background: '#ff4d4d', color: 'white', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px' }}>
                Crop Area
              </div>
            </Rnd>
          )}
        </div>
      </div>
    </div>

      {showSigModal && (
        <div className="modal-overlay" style={{ zIndex: 4000 }}>
          <div className="modal-content glass-panel sig-modal-panel">
            <div className="modal-header">
              <h2>Add Signature</h2>
              <button className="btn-icon" onClick={() => {
                setShowSigModal(false);
                setPendingSignaturePos(null);
              }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {savedSignatures.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '0.5rem' }}>Saved Signatures</p>
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {savedSignatures.map((sig, i) => (
                      <div key={i} onClick={() => {
                        addAnnotation('signature', sig, pendingSignaturePos?.x || 50, pendingSignaturePos?.y || 50);
                        setPendingSignaturePos(null);
                        setShowSigModal(false);
                      }} style={{ flexShrink: 0, height: '60px', width: '120px', border: '1px solid #e2e8f0', borderRadius: '4px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={sig} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="sig-tabs">
                <button className={`sig-tab ${sigType === 'draw' ? 'active' : ''}`} onClick={() => setSigType('draw')}>Draw</button>
                <button className={`sig-tab ${sigType === 'upload' ? 'active' : ''}`} onClick={() => setSigType('upload')}>Upload</button>
              </div>
              
              {sigType === 'draw' ? (
                <div className="sig-pad-container sig-pad-wrap" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <SignatureCanvas 
                    ref={sigPadRef} 
                    canvasProps={{ width: sigPadWidth, height: 200, className: 'sig-pad' }} 
                  />
                  <button className="btn-icon sig-clear" onClick={() => sigPadRef.current?.clear()} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <Trash2 size={16} /> Clear
                  </button>
                </div>
              ) : (
                <div className="upload-zone" onClick={() => fileInputRef.current?.click()} style={{ padding: '2rem' }}>
                  <Upload size={32} />
                  <p>Click to upload image (PNG/JPG)</p>
                  <input type="file" ref={fileInputRef} className="hidden-input" accept="image/*" onChange={handleUploadSignature} />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => {
                setShowSigModal(false);
                setPendingSignaturePos(null);
              }}>Cancel</button>
              {sigType === 'draw' && (
                <button className="btn btn-primary" onClick={handleSaveSignature}>
                  <Save size={16} style={{ marginRight: '0.5rem' }}/> Insert Signature
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
