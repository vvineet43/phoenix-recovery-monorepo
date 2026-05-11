import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import './pdf-editor.css';
import { Upload, X, Save, FileOutput, Loader2, RefreshCw, FileUp, Plus, Download, Trash, Minimize2, Type, Scissors } from 'lucide-react';
import JSZip from 'jszip';
import { loadPdfFile, generatePdf, compressPdf, imageToPdf } from '../../lib/pdf';
import type { PdfPageInfo, PdfFileInfo } from '../../lib/pdf';
import { SortablePage } from './SortablePage';
import { PagePreview } from './PagePreview';
import { PageEditor } from './PageEditor';

export function PdfEditorApp() {
  const [files, setFiles] = useState<Record<string, PdfFileInfo>>({});
  const [pages, setPages] = useState<PdfPageInfo[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showCompressModal, setShowCompressModal] = useState(false);
  const [compressionPercent, setCompressionPercent] = useState(50);
  const [previewPageId, setPreviewPageId] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [currentPdfSize, setCurrentPdfSize] = useState<number | null>(null);
  const [exportOptions, setExportOptions] = useState({ addPageNumbers: false });
  const [showWatermarkModal, setShowWatermarkModal] = useState(false);
  const [watermarkConfig, setWatermarkConfig] = useState({ text: 'CONFIDENTIAL', opacity: 50, position: 'diagonal', targetPage: 'all' });
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitMode, setSplitMode] = useState<'range' | 'fixed' | 'custom'>('range');
  const [splitConfig, setSplitConfig] = useState({ rangeStart: 1, rangeEnd: 1, fixedParts: 2, customRanges: '1-3, 5-7' });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const processFiles = async (newFiles: FileList | File[]) => {
    setIsLoading(true);
    setLoadingText('Processing PDFs...');
    
    try {
      const newFilesObj = { ...files };
      const newPages = [...pages];
      
      const fileArray = Array.from(newFiles);
      for (let i = 0; i < fileArray.length; i++) {
        let file = fileArray[i];
        if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) continue;
        
        if (file.type.startsWith('image/')) {
          setLoadingText(`Converting ${file.name} to PDF...`);
          try {
            file = await imageToPdf(file);
          } catch(e) {
            console.error('Image conversion failed', e);
            continue;
          }
        }
        
        const fileId = `file-${Date.now()}-${i}`;
        setLoadingText(`Loading ${file.name}...`);
        
        const { fileInfo, pages: extractedPages } = await loadPdfFile(file, fileId);
        newFilesObj[fileId] = fileInfo;
        newPages.push(...extractedPages);
      }
      
      setFiles(newFilesObj);
      setPages(newPages);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing one or more PDF files. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [files, pages]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRotate = (id: string) => {
    setPages(pages.map(page => {
      if (page.id === id) {
        return { ...page, rotation: (page.rotation + 90) % 360 };
      }
      return page;
    }));
  };

  const handleDelete = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all pages and start over?')) {
      setPages([]);
      setFiles({});
    }
  };

  useEffect(() => {
    if (pages.length === 0) {
      setCurrentPdfSize(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const pdfBytes = await generatePdf(files, pages, exportOptions);
        setCurrentPdfSize(pdfBytes.length);
      } catch (err) {
        console.error("Failed to estimate size", err);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(timer);
  }, [pages, files, exportOptions]);

  const handleSaveAnnotations = (pageId: string, annotations: any[]) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return { ...page, annotations };
      }
      return page;
    }));
    setEditingPageId(null);
  };

  const handleApplyToAll = (anno: any) => {
    const percentAnno = {
      ...anno,
      id: `anno-all-${Date.now()}`
    };
    
    setPages(pages.map(p => ({
      ...p,
      annotations: [...(p.annotations || []), { ...percentAnno, id: `anno-all-${Date.now()}-${p.id}` }]
    })));
    alert("Applied to all pages!");
  };

  const handleApplyWatermark = () => {
    const newAnno = {
      id: `wm-${Date.now()}`,
      type: 'watermark',
      x: 0, y: 0, width: 0, height: 0,
      content: watermarkConfig.text,
      fontSize: 64,
      opacity: watermarkConfig.opacity / 100,
      watermarkPosition: watermarkConfig.position
    };
    
    setPages(pages.map(p => {
      if (watermarkConfig.targetPage === 'all' || p.id === watermarkConfig.targetPage) {
        return {
          ...p,
          annotations: [...(p.annotations || []), newAnno as any]
        };
      }
      return p;
    }));
    setShowWatermarkModal(false);
  };

  const handleSplitPdf = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Splitting PDF...');

    try {
      if (splitMode === 'range') {
        const start = Math.max(0, splitConfig.rangeStart - 1);
        const end = Math.min(pages.length, splitConfig.rangeEnd);
        const splitPages = pages.slice(start, end);
        if (splitPages.length === 0) throw new Error("Invalid range");
        const pdfBytes = await generatePdf(files, splitPages, exportOptions);
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NexPDF_Split_${start+1}_to_${end}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const zip = new JSZip();
        let chunks: PdfPageInfo[][] = [];

        if (splitMode === 'fixed') {
          const parts = Math.max(1, splitConfig.fixedParts);
          const chunkSize = Math.ceil(pages.length / parts);
          for (let i = 0; i < pages.length; i += chunkSize) {
            chunks.push(pages.slice(i, i + chunkSize));
          }
        } else if (splitMode === 'custom') {
          const ranges = splitConfig.customRanges.split(',').map(s => s.trim());
          for (const range of ranges) {
            if (range.includes('-')) {
              const [s, e] = range.split('-').map(n => parseInt(n));
              if (!isNaN(s) && !isNaN(e)) {
                chunks.push(pages.slice(Math.max(0, s - 1), Math.min(pages.length, e)));
              }
            } else {
              const p = parseInt(range);
              if (!isNaN(p)) {
                chunks.push(pages.slice(Math.max(0, p - 1), Math.min(pages.length, p)));
              }
            }
          }
        }

        if (chunks.length === 0) throw new Error("No valid parts generated");

        for (let i = 0; i < chunks.length; i++) {
          setLoadingText(`Generating part ${i+1} of ${chunks.length}...`);
          const chunkPages = chunks[i];
          if (chunkPages.length === 0) continue;
          const pdfBytes = await generatePdf(files, chunkPages, exportOptions);
          zip.file(`Part_${i+1}.pdf`, new Uint8Array(pdfBytes));
        }

        setLoadingText('Zipping files...');
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NexPDF_Split.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to split PDF. Check your ranges.');
    } finally {
      setIsLoading(false);
      setShowSplitModal(false);
    }
  };

  const handleExport = async () => {
    if (pages.length === 0) return;
    
    setIsLoading(true);
    setLoadingText('Generating PDF...');
    
    try {
      const pdfBytes = await generatePdf(files, pages, exportOptions);
      
      // Create a blob and download
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexPDF_Merged.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompressExport = async () => {
    if (pages.length === 0) return;
    
    setShowCompressModal(false);
    setIsLoading(true);
    setLoadingText(`Compressing at ${compressionPercent}%...`);
    
    try {
      const pdfBytes = await compressPdf(files, pages, compressionPercent, exportOptions);
      
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NexPDF_Compressed_${compressionPercent}pct.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('An error occurred while compressing the PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtract = async (id: string) => {
    const pageToExtract = pages.find(p => p.id === id);
    if (!pageToExtract) return;
    setIsLoading(true);
    setLoadingText('Extracting Page...');
    try {
      const pdfBytes = await generatePdf(files, [pageToExtract]);
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Extracted_Page_${pageToExtract.pageIndex + 1}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to extract page.');
    } finally {
      setIsLoading(false);
    }
  };

  const previewPageInfo = previewPageId ? pages.find(p => p.id === previewPageId) : null;
  const editingPageInfo = editingPageId ? pages.find(p => p.id === editingPageId) : null;

  return (
    <div className="pdf-editor-wrapper">
      <div className="app-container">
        {editingPageInfo && (
          <PageEditor
            page={editingPageInfo}
            files={files}
            onClose={() => setEditingPageId(null)}
            onSave={handleSaveAnnotations}
            onApplyToAll={handleApplyToAll}
          />
        )}

        {previewPageInfo && (
          <PagePreview 
            page={previewPageInfo} 
            files={files} 
            onClose={() => setPreviewPageId(null)} 
          />
        )}

        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <h2>{loadingText}</h2>
          </div>
        )}

        {showCompressModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Compress PDF</h2>
                <button className="btn-icon" onClick={() => setShowCompressModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-description">
                  Lower percentage means smaller file size but reduced image quality. Text will be rasterized.
                </p>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={compressionPercent} 
                    onChange={(e) => setCompressionPercent(Number(e.target.value))}
                    className="range-slider"
                  />
                  <span className="slider-value">{compressionPercent}%</span>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCompressModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCompressExport}>
                  <Minimize2 size={18} /> Apply & Export
                </button>
              </div>
            </div>
          </div>
        )}

        {showWatermarkModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Add Watermark</h2>
                <button className="btn-icon" onClick={() => setShowWatermarkModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Watermark Text</label>
                  <input type="text" value={watermarkConfig.text} onChange={e => setWatermarkConfig({...watermarkConfig, text: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Opacity ({watermarkConfig.opacity}%)</label>
                  <input type="range" min="10" max="100" value={watermarkConfig.opacity} onChange={e => setWatermarkConfig({...watermarkConfig, opacity: Number(e.target.value)})} style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Position</label>
                  <select value={watermarkConfig.position} onChange={e => setWatermarkConfig({...watermarkConfig, position: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <option value="diagonal">Diagonal (Centered)</option>
                    <option value="center">Center</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Apply To</label>
                  <select value={watermarkConfig.targetPage} onChange={e => setWatermarkConfig({...watermarkConfig, targetPage: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <option value="all">All Pages</option>
                    {pages.map((p, i) => (
                      <option key={p.id} value={p.id}>Page {i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowWatermarkModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleApplyWatermark}>
                  <Type size={18} /> Apply Watermark
                </button>
              </div>
            </div>
          </div>
        )}

        {showSplitModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Split PDF</h2>
                <button className="btn-icon" onClick={() => setShowSplitModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                  <button className={`btn ${splitMode === 'range' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('range')} style={{ flex: 1 }}>Extract Range</button>
                  <button className={`btn ${splitMode === 'fixed' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('fixed')} style={{ flex: 1 }}>Equal Parts</button>
                  <button className={`btn ${splitMode === 'custom' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('custom')} style={{ flex: 1 }}>Custom Ranges</button>
                </div>

                {splitMode === 'range' && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Start Page (1 to {pages.length})</label>
                      <input type="number" min="1" max={pages.length} value={splitConfig.rangeStart} onChange={e => setSplitConfig({...splitConfig, rangeStart: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>End Page</label>
                      <input type="number" min="1" max={pages.length} value={splitConfig.rangeEnd} onChange={e => setSplitConfig({...splitConfig, rangeEnd: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>
                  </div>
                )}

                {splitMode === 'fixed' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Number of Equal Parts</label>
                    <input type="number" min="2" max={pages.length} value={splitConfig.fixedParts} onChange={e => setSplitConfig({...splitConfig, fixedParts: Number(e.target.value)})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>This will generate a ZIP file containing {Math.max(1, splitConfig.fixedParts)} smaller PDFs.</p>
                  </div>
                )}

                {splitMode === 'custom' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Custom Ranges (comma separated)</label>
                    <input type="text" value={splitConfig.customRanges} onChange={e => setSplitConfig({...splitConfig, customRanges: e.target.value})} placeholder="e.g. 1-3, 5, 7-10" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>Extracts each range as a separate PDF and bundles them into a ZIP.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowSplitModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSplitPdf}>
                  <Scissors size={18} /> Split & Download
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="header">
          <div className="badge">Professional PDF Toolkit</div>
          <h1>NexPDF</h1>
          <p>Merge, rearrange, rotate, and compress your documents securely<br />without compromising on quality.</p>
        </header>

        {pages.length === 0 ? (
          <div className="glass-panel">
            <div 
              className={`upload-zone ${isDraggingOver ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="upload-icon" size={64} />
              <h2 className="upload-title">Drop PDFs Here</h2>
              <p className="upload-subtitle">Or click to browse files</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden-input" 
                accept=".pdf,image/png,image/jpeg" 
                multiple 
                onChange={handleFileInput}
              />
            </div>
          </div>
        ) : (
          <div className="workspace">
            <div className="glass-panel toolbar">
              <div className="toolbar-info">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Workspace</h3>
                <p className="upload-subtitle">
                  {pages.length} Pages • {Object.keys(files).length} Files
                  {currentPdfSize && ` • ~${(currentPdfSize / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
              <div className="toolbar-actions">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden-input" 
                  accept=".pdf,image/png,image/jpeg" 
                  multiple 
                  onChange={handleFileInput}
                />
                <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  <Plus size={18} /> Add PDFs
                </button>
                <button className="btn btn-danger" onClick={handleClearAll}>
                  <Trash size={18} /> Clear
                </button>
                <button className="btn btn-secondary" onClick={() => setShowCompressModal(true)}>
                  <Minimize2 size={18} /> Compress
                </button>
                <button className="btn btn-secondary" onClick={() => { setSplitConfig(prev => ({...prev, rangeEnd: pages.length})); setShowSplitModal(true); }}>
                  <Scissors size={18} /> Split
                </button>
                <button className="btn btn-secondary" onClick={() => setShowWatermarkModal(true)}>
                  <Type size={18} /> Watermark
                </button>
                <div className="checkbox-control" style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                  <input type="checkbox" id="page-numbers" checked={exportOptions.addPageNumbers} onChange={e => setExportOptions({ ...exportOptions, addPageNumbers: e.target.checked })} style={{ marginRight: '0.5rem' }} />
                  <label htmlFor="page-numbers">Page Numbers</label>
                </div>
                <button className="btn btn-primary" onClick={handleExport}>
                  <Download size={18} /> Export
                </button>
              </div>
            </div>

            <div className="glass-panel">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={pages.map(p => p.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="pages-grid">
                    {pages.map((page, index) => (
                      <SortablePage 
                        key={page.id} 
                        page={page} 
                        index={index}
                        onRotate={handleRotate}
                        onDelete={handleDelete}
                        onDoubleClick={setPreviewPageId}
                        onEdit={setEditingPageId}
                        onExtract={handleExtract}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
