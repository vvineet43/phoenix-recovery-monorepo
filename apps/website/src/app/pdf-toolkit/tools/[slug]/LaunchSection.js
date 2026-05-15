'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFileForTransition } from '../../../../lib/db';
import { FileUp, ArrowRight, Loader2, Plus } from 'lucide-react';

export function LaunchSection({ toolParam, label }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await saveFileForTransition(file);
        router.push(`/pdf-tools?tool=${toolParam}&preloaded=true`);
      } catch (err) {
        console.error('Failed to save file for transition:', err);
        router.push(`/pdf-tools?tool=${toolParam}`);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      try {
        await saveFileForTransition(file);
        router.push(`/pdf-tools?tool=${toolParam}&preloaded=true`);
      } catch (err) {
        console.error('Failed to save file for transition:', err);
        router.push(`/pdf-tools?tool=${toolParam}`);
      }
    }
  };

  return (
    <div className="launch-section">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".pdf" 
        style={{ display: 'none' }} 
      />
      
      <div 
        className="mini-upload-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="upload-loading">
            <Loader2 className="spinner" size={32} />
            <p>Preparing workspace...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon-circle">
              <FileUp size={24} />
            </div>
            <div className="upload-text">
              <strong>Select a PDF to {label}</strong>
              <p>Or drop it here to start immediately</p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .launch-section {
          width: 100%;
          max-width: 440px;
        }
        .mini-upload-zone {
          background: white;
          border: 2px dashed var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: var(--shadow-sm);
        }
        .mini-upload-zone:hover {
          border-color: var(--primary);
          background: var(--bg-2);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .upload-icon-circle {
          background: var(--primary);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .upload-text strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 0.15rem;
        }
        .upload-text p {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0;
        }
        .upload-loading {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
        }
        .upload-loading p {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--primary);
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
