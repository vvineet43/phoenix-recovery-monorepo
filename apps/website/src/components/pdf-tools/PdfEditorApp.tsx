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
import { 
  Upload, X, Save, FileOutput, Loader2, RefreshCw, FileUp, Plus, Download, 
  Trash, Minimize2, Type, Scissors, Lock, Unlock, Layers, Image as ImageIcon, 
  ShieldAlert, Scan, FileSearch, Camera, FileCode, FileText, Menu, ChevronLeft, ChevronRight, ShieldCheck, Zap 
} from 'lucide-react';
import JSZip from 'jszip';
import { 
  loadPdfFile, generatePdf, compressPdf, imageToPdf, imagesToPdf, 
  pdfToImages, flattenPdf, protectPdf, unlockPdf, performOcr, htmlToPdf, textToPdf,
  isImportableFile, isPdfFile
} from '../../lib/pdf';
import type { PdfPageInfo, PdfFileInfo } from '../../lib/pdf';
import { SortablePage } from './SortablePage';
import { PagePreview } from './PagePreview';
import { PageEditor } from './PageEditor';
import { getFileFromTransition, clearTransitionFile } from '../../lib/db';

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
  const [showProtectModal, setShowProtectModal] = useState(false);
  const [passwordConfig, setPasswordConfig] = useState({ userPassword: '', ownerPassword: '', printing: 'highResolution' as any });
  const [showImageExportModal, setShowImageExportModal] = useState(false);
  const [imageExportConfig, setImageExportConfig] = useState({ format: 'image/jpeg' as const, quality: 90 });
  const [showScanModal, setShowScanModal] = useState(false);
  const [showHtmlModal, setShowHtmlModal] = useState(false);
  const [htmlContent, setHtmlContent] = useState('<h1>My Document</h1><p>Type your HTML here...</p>');
  const [showTextModal, setShowTextModal] = useState(false);
  const [textPdfContent, setTextPdfContent] = useState('Type or paste plain text here.\n\nEach line break starts a new paragraph.');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check for tool parameter in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      const isPreloaded = params.get('preloaded') === 'true';

      const handlePreload = async () => {
        if (isPreloaded) {
          const file = await getFileFromTransition();
          if (file) {
            void processFiles([file]);
            void clearTransitionFile();
          }
        }
      };

      void handlePreload();

      if (tool) {
        // Small delay to ensure everything is ready
        setTimeout(() => {
          switch (tool) {
            case 'compress': setShowCompressModal(true); break;
            case 'split': setShowSplitModal(true); break;
            case 'watermark': setShowWatermarkModal(true); break;
            case 'protect': setShowProtectModal(true); break;
            case 'scan': void startScan(); break;
            case 'html': setShowHtmlModal(true); break;
            case 'text': setShowTextModal(true); break;
            case 'merge': fileInputRef.current?.click(); break;
            case 'images': setShowImageExportModal(true); break;
            case 'ocr': void handleOcr(); break;
            case 'redact': if (pages.length > 0) setEditingPageId(pages[0].id); else alert("Please upload a PDF first to use Redact."); break;
            case 'rotate': if (pages.length > 0) handleRotate(pages[0].id); else alert("Please upload a PDF first to use Rotate."); break;
            case 'sign': if (pages.length > 0) setEditingPageId(pages[0].id); else alert("Please upload a PDF first to use Sign."); break;
            case 'rearrange': setIsSidebarOpen(true); break;
            case 'page-numbers': setExportOptions(prev => ({...prev, addPageNumbers: true})); break;
            case 'batch-upload': batchImageInputRef.current?.click(); break;
            case 'unlock': alert("Upload a password-protected PDF to begin unlocking."); fileInputRef.current?.click(); break;
          }
        }, 300);
      }
    }
  }, []); // Run once on mount

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

  const processFiles = useCallback(async (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles).filter(isImportableFile);
    if (fileArray.length === 0) {
      alert('No PDF or supported image files were selected.');
      return;
    }

    setIsLoading(true);
    setLoadingText('Processing files...');

    try {
      const mergedFiles: Record<string, PdfFileInfo> = {};
      const mergedPages: PdfPageInfo[] = [];

      for (let i = 0; i < fileArray.length; i++) {
        let file = fileArray[i];
        if (!isPdfFile(file)) {
          setLoadingText(`Converting ${file.name} to PDF...`);
          try {
            file = await imageToPdf(file);
          } catch (e) {
            console.error('Image conversion failed', e);
            continue;
          }
        }

        const fileId = `file-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`;
        setLoadingText(`Loading ${file.name}...`);

        const { fileInfo, pages: extractedPages } = await loadPdfFile(file, fileId);
        mergedFiles[fileId] = fileInfo;
        mergedPages.push(...extractedPages);
      }

      if (mergedPages.length === 0) {
        alert('Could not import any files. Try PDF, JPEG, PNG, GIF, or WebP.');
        return;
      }

      setFiles((prev) => ({ ...prev, ...mergedFiles }));
      setPages((prev) => [...prev, ...mergedPages]);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing one or more files. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (batchImageInputRef.current) batchImageInputRef.current.value = '';
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleBatchImageToPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) return;
    setIsLoading(true);
    setLoadingText('Combining images to PDF...');
    try {
      const file = await imagesToPdf(Array.from(list));
      await processFiles([file]);
    } catch (err) {
      console.error(err);
      alert('Image conversion failed. Choose JPEG, PNG, GIF, or WebP images.');
    } finally {
      setIsLoading(false);
      if (batchImageInputRef.current) batchImageInputRef.current.value = '';
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      void processFiles(e.target.files);
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
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsSidebarOpen(false);
    }
  }, []);

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

  const handleSaveAnnotations = (pageId: string, annotations: any[], cropBox?: any) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return { ...page, annotations, cropBox };
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

  const handleProtectExport = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Protecting PDF...');
    try {
      const pdfBytes = await generatePdf(files, pages, exportOptions);
      const protectedBytes = await protectPdf(
        pdfBytes, 
        passwordConfig.userPassword || undefined, 
        passwordConfig.ownerPassword || undefined,
        { printing: passwordConfig.printing }
      );
      const blob = new Blob([new Uint8Array(protectedBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexPDF_Protected.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to protect PDF.');
    } finally {
      setIsLoading(false);
      setShowProtectModal(false);
    }
  };

  const handleFlattenExport = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Flattening PDF...');
    try {
      const pdfBytes = await flattenPdf(files, pages, exportOptions);
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexPDF_Flattened.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to flatten PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompressExport = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Compressing PDF...');
    try {
      const pdfBytes = await compressPdf(files, pages, compressionPercent, exportOptions);
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexPDF_Compressed.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('An error occurred while compressing the PDF.');
    } finally {
      setIsLoading(false);
      setShowCompressModal(false);
    }
  };

  const handleImageExport = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Converting to Images...');
    try {
      const images = await pdfToImages(files, pages, imageExportConfig.format, imageExportConfig.quality / 100);
      const zip = new JSZip();
      images.forEach(img => {
        const base64Data = img.dataUrl.split(',')[1];
        zip.file(img.name, base64Data, { base64: true });
      });
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NexPDF_Images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to export images.');
    } finally {
      setIsLoading(false);
      setShowImageExportModal(false);
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

  const handleOcr = async () => {
    if (pages.length === 0) return;
    setIsLoading(true);
    setLoadingText('Starting OCR Engine...');
    try {
      const text = await performOcr(files, pages, (progress, status) => {
        setLoadingText(`${status} (${Math.round(progress)}%)`);
      });
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NexPDF_Extracted_Text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('OCR failed. Make sure you have an internet connection for the engine to load.');
    } finally {
      setIsLoading(false);
    }
  };

  const startScan = async () => {
    setShowScanModal(true);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support camera access.');
      setShowScanModal(false);
      return;
    }

    try {
      // Try to get environment camera first (back camera on mobiles)
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
      } catch (e) {
        console.warn('Environment camera failed, falling back to default', e);
        // Fallback to any available camera
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true 
        });
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Make sure it plays
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      let errorMsg = 'Could not access camera.';
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') errorMsg = 'Camera permission denied. Please allow camera access in your browser settings.';
        else if (err.name === 'NotFoundError') errorMsg = 'No camera found on this device.';
        else errorMsg = `Camera error: ${err.message}`;
      }
      alert(errorMsg);
      setShowScanModal(false);
    }
  };

  const captureScan = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      // Stop camera
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
      
      setShowScanModal(false);
      try {
        await processFiles([file]);
      } catch (e) {
        console.error(e);
        alert('Could not add the scanned page.');
      }
    }
  };

  const closeScan = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowScanModal(false);
  };

  const handleHtmlToPdf = async () => {
    setIsLoading(true);
    setLoadingText('Converting HTML...');
    try {
      const file = await htmlToPdf(htmlContent, 'From_HTML');
      await processFiles([file]);
      setShowHtmlModal(false);
    } catch (e) {
      console.error(e);
      alert('HTML conversion failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToPdf = async () => {
    setIsLoading(true);
    setLoadingText('Creating PDF from text...');
    try {
      const file = await textToPdf(textPdfContent, 'From_Text');
      await processFiles([file]);
      setShowTextModal(false);
    } catch (e) {
      console.error(e);
      alert('Could not create PDF from text.');
    } finally {
      setIsLoading(false);
    }
  };

  const previewPageInfo = previewPageId ? pages.find(p => p.id === previewPageId) : null;
  const editingPageInfo = editingPageId ? pages.find(p => p.id === editingPageId) : null;

  return (
    <div className="pdf-editor-wrapper">
      <div className="app-container">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden-input"
          accept="application/pdf,.pdf,image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/*"
          multiple
          onChange={handleFileInput}
        />
        <input
          ref={batchImageInputRef}
          id="batch-image-input"
          type="file"
          className="hidden-input"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/*"
          multiple
          onChange={handleBatchImageToPdf}
        />
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <h2>{loadingText}</h2>
          </div>
        )}

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

        {showScanModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Scan Document</h2>
                <button className="btn-icon" onClick={closeScan}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body" style={{ padding: 0, overflow: 'hidden', borderRadius: '8px', background: '#000', position: 'relative' }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto', display: 'block' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={captureScan}
                    style={{ 
                      width: '64px', height: '64px', borderRadius: '50%', border: '4px solid white', 
                      background: 'rgba(255,255,255,0.3)', cursor: 'pointer' 
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeScan}>Cancel</button>
              </div>
            </div>
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

        {showProtectModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Protect PDF</h2>
                <button className="btn-icon" onClick={() => setShowProtectModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>User Password (to Open)</label>
                  <input type="password" value={passwordConfig.userPassword} onChange={e => setPasswordConfig({...passwordConfig, userPassword: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Optional" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Owner Password (to Edit)</label>
                  <input type="password" value={passwordConfig.ownerPassword} onChange={e => setPasswordConfig({...passwordConfig, ownerPassword: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Optional" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Printing Permissions</label>
                  <select value={passwordConfig.printing} onChange={e => setPasswordConfig({...passwordConfig, printing: e.target.value as any})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <option value="highResolution">High Resolution</option>
                    <option value="lowResolution">Low Resolution</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowProtectModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleProtectExport}>
                  <Lock size={18} /> Apply Protection
                </button>
              </div>
            </div>
          </div>
        )}

        {showImageExportModal && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>Export as Images</h2>
                <button className="btn-icon" onClick={() => setShowImageExportModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Format</label>
                  <select value={imageExportConfig.format} onChange={e => setImageExportConfig({...imageExportConfig, format: e.target.value as any})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <option value="image/jpeg">JPEG (Smaller file size)</option>
                    <option value="image/png">PNG (Lossless quality)</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Quality ({imageExportConfig.quality}%)</label>
                  <input type="range" min="10" max="100" value={imageExportConfig.quality} onChange={e => setImageExportConfig({...imageExportConfig, quality: Number(e.target.value)})} style={{ width: '100%' }} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowImageExportModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleImageExport}>
                  <ImageIcon size={18} /> Export ZIP
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
                <div className="split-mode-buttons" role="group" aria-label="Split mode">
                  <button type="button" className={`btn ${splitMode === 'range' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('range')}>Extract Range</button>
                  <button type="button" className={`btn ${splitMode === 'fixed' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('fixed')}>Equal Parts</button>
                  <button type="button" className={`btn ${splitMode === 'custom' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSplitMode('custom')}>Custom Ranges</button>
                </div>

                {splitMode === 'range' && (
                  <div className="split-range-row">
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
          <p className="header-subtitle">
            Merge, rearrange, rotate, and compress your documents securely without compromising on quality.
          </p>
        </header>

        <div className={`workspace-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close tools menu"
            onClick={() => setIsSidebarOpen(false)}
          />
          <button type="button" className="mobile-toggle btn-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} />
          </button>

          <aside className="sidebar-nav">
            <div className="sidebar-header">
              <h3>NexPDF Tools</h3>
              <button className="btn-icon sidebar-close" onClick={() => setIsSidebarOpen(false)}>
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="sidebar-info">
              {pages.length > 0 ? (
                <>
                  <p>{pages.length} Pages • {Object.keys(files).length} Files</p>
                  {currentPdfSize && <p>~{(currentPdfSize / 1024 / 1024).toFixed(2)} MB</p>}
                </>
              ) : (
                <p>Select a tool or upload a file to begin</p>
              )}
            </div>

            <div className="nav-actions" role="navigation" aria-label="PDF tools">
              <div className="nav-group">
                <label>Import</label>
                <button className="nav-btn" onClick={() => fileInputRef.current?.click()}>
                  <Plus size={18} /> Add PDFs
                </button>
                <button type="button" className="nav-btn" onClick={() => batchImageInputRef.current?.click()}>
                  <ImageIcon size={18} /> Images to PDF
                </button>
                <button type="button" className="nav-btn" onClick={() => setShowHtmlModal(true)}>
                  <FileCode size={18} /> HTML to PDF
                </button>
                <button type="button" className="nav-btn" onClick={() => setShowTextModal(true)}>
                  <FileText size={18} /> Text to PDF
                </button>
                <button type="button" className="nav-btn" onClick={startScan}>
                  <Camera size={18} /> Scan Camera
                </button>
              </div>

              <div className="nav-group">
                <label>Process</label>
                <button className="nav-btn" onClick={() => pages.length > 0 ? setShowCompressModal(true) : alert("Please upload a PDF first.")}>
                  <Minimize2 size={18} /> Compress
                </button>
                <button className="nav-btn" onClick={() => { 
                  if (pages.length === 0) return alert("Please upload a PDF first.");
                  setSplitConfig(prev => ({...prev, rangeEnd: pages.length})); 
                  setShowSplitModal(true); 
                }}>
                  <Scissors size={18} /> Split
                </button>
                <button className="nav-btn" onClick={() => pages.length > 0 ? setShowWatermarkModal(true) : alert("Please upload a PDF first.")}>
                  <Type size={18} /> Watermark
                </button>
                <button className="nav-btn" onClick={() => pages.length > 0 ? setShowProtectModal(true) : alert("Please upload a PDF first.")}>
                  <Lock size={18} /> Protect
                </button>
                <button className="nav-btn" onClick={() => pages.length > 0 ? handleFlattenExport() : alert("Please upload a PDF first.")}>
                  <Layers size={18} /> Flatten
                </button>
                <button className="nav-btn" onClick={() => pages.length > 0 ? handleOcr() : alert("Please upload a PDF first.")}>
                  <FileSearch size={18} /> OCR Text
                </button>
                <button className="nav-btn" onClick={() => pages.length > 0 ? setEditingPageId(pages[0].id) : alert("Please upload a PDF first.")}>
                  <ShieldAlert size={18} /> Redact
                </button>
              </div>

              <div className="nav-group">
                <label>Export</label>
                <button className="nav-btn" onClick={() => pages.length > 0 ? setShowImageExportModal(true) : alert("Please upload a PDF first.")}>
                  <ImageIcon size={18} /> to Images
                </button>
                <div className="checkbox-control nav-checkbox">
                  <input type="checkbox" id="page-numbers" checked={exportOptions.addPageNumbers} onChange={e => setExportOptions({ ...exportOptions, addPageNumbers: e.target.checked })} />
                  <label htmlFor="page-numbers">Add Page Numbers</label>
                </div>
                <button className="nav-btn btn-primary" onClick={() => pages.length > 0 ? handleExport() : alert("Please upload a PDF first.")}>
                  <Download size={18} /> Export PDF
                </button>
              </div>

              {pages.length > 0 && (
                <div className="nav-group danger">
                  <button className="nav-btn btn-danger" onClick={handleClearAll}>
                    <Trash size={18} /> Clear All
                  </button>
                </div>
              )}
            </div>
          </aside>

          <main className="workspace-content">
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
                </div>

                <div className="trust-badges">
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="badge-text">
                      <h4>100% Private</h4>
                      <p>Your files never leave your device. All processing happens locally.</p>
                    </div>
                  </div>
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <Lock size={24} />
                    </div>
                    <div className="badge-text">
                      <h4>Secure by Design</h4>
                      <p>No servers involved. No data collection. Your privacy is guaranteed.</p>
                    </div>
                  </div>
                  <div className="badge-item">
                    <div className="badge-icon-wrapper">
                      <Zap size={24} />
                    </div>
                    <div className="badge-text">
                      <h4>Instant Processing</h4>
                      <p>No upload or download wait times. Works directly on your machine.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel canvas-area">
                <div className="canvas-header">
                  <h3>Page thumbnails</h3>
                  {!isSidebarOpen && (
                    <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
                
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
            )}
          </main>
        </div>

        {showHtmlModal && (
          <div className="modal-overlay">
            <div className="modal-content modal-content--wide glass-panel">
              <div className="modal-header">
                <h2>HTML to PDF</h2>
                <button className="btn-icon" onClick={() => setShowHtmlModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-description">Paste your HTML content below to convert it to a PDF page.</p>
                <textarea 
                  value={htmlContent} 
                  onChange={e => setHtmlContent(e.target.value)}
                  style={{ 
                    width: '100%', height: '300px', padding: '12px', borderRadius: '8px', 
                    border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '14px',
                    background: 'rgba(255,255,255,0.5)'
                  }}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowHtmlModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleHtmlToPdf}>
                  Convert to PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {showTextModal && (
          <div className="modal-overlay">
            <div className="modal-content modal-content--wide glass-panel">
              <div className="modal-header">
                <h2>Text to PDF</h2>
                <button type="button" className="btn-icon" onClick={() => setShowTextModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-description">
                  Plain text becomes a printable PDF (Helvetica, US Letter). Line breaks start new paragraphs.
                </p>
                <textarea
                  value={textPdfContent}
                  onChange={(e) => setTextPdfContent(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '280px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    background: 'rgba(255,255,255,0.9)',
                  }}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowTextModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => void handleTextToPdf()}>
                  <FileText size={18} /> Add to workspace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
