import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { PdfPageInfo, PdfFileInfo } from '../../lib/pdf';

interface PagePreviewProps {
  page: PdfPageInfo;
  files: Record<string, PdfFileInfo>;
  onClose: () => void;
}

function previewScaleForScreen(baseW: number, baseH: number) {
  if (typeof window === 'undefined') return 2;
  const pad = 32;
  const maxW = window.innerWidth - pad;
  const maxH = window.innerHeight - pad;
  return Math.min(2.5, Math.max(0.4, Math.min(maxW / baseW, maxH / baseH)));
}

export function PagePreview({ page, files, onClose }: PagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewportKey, setViewportKey] = useState(0);

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
        const scale = previewScaleForScreen(baseViewport.width, baseViewport.height);
        const viewport = pdfPage.getViewport({ scale });
        
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

      } catch (error) {
        console.error("Error rendering preview:", error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    renderPage();

    return () => {
      active = false;
    };
  }, [page, files, viewportKey]);

  return (
    <div className="preview-overlay" onClick={onClose}>
      <button className="preview-close btn-icon" onClick={onClose}>
        <X size={24} color="white" />
      </button>
      
      {isLoading && (
        <div className="preview-loading">
          <div className="spinner"></div>
          <p>Rendering high-res page...</p>
        </div>
      )}
      
      <div 
        className="preview-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          opacity: isLoading ? 0 : 1,
          transform: `rotate(${page.rotation}deg)`
        }}
      >
        <canvas ref={canvasRef} className="preview-canvas" />
      </div>
    </div>
  );
}
