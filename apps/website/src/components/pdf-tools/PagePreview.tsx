import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { PdfPageInfo, PdfFileInfo } from '../../lib/pdf';

interface PagePreviewProps {
  page: PdfPageInfo;
  files: Record<string, PdfFileInfo>;
  onClose: () => void;
}

export function PagePreview({ page, files, onClose }: PagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function renderPage() {
      setIsLoading(true);
      try {
        const fileInfo = files[page.fileId];
        if (!fileInfo) return;
        
        const doc = fileInfo.doc;
        const pdfPage = await doc.getPage(page.pageIndex + 1);
        
        // Scale 1.5 or 2.0 to make it readable
        const viewport = pdfPage.getViewport({ scale: 2.0 });
        
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
  }, [page, files]);

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
