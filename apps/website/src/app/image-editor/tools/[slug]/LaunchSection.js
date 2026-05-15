'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFileForTransition } from '../../../../lib/db';
import { FileUp, Loader2 } from 'lucide-react';

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
        router.push(`/image-editor?tool=${toolParam}&preloaded=true`);
      } catch (err) {
        console.error('Failed to save file for transition:', err);
        router.push(`/image-editor?tool=${toolParam}`);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      try {
        await saveFileForTransition(file);
        router.push(`/image-editor?tool=${toolParam}&preloaded=true`);
      } catch (err) {
        console.error('Failed to save file for transition:', err);
        router.push(`/image-editor?tool=${toolParam}`);
      }
    }
  };

  return (
    <div className="launch-section">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
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
            <p>Preparing images...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon-circle">
              <FileUp size={24} />
            </div>
            <div className="upload-text">
              <strong>Select images to {label}</strong>
              <p>Or drop them here to start instantly</p>
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
          border: 2px dashed #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .mini-upload-zone:hover {
          border-color: #0f172a;
          background: #f9fafb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.07);
        }
        .upload-icon-circle {
          background: #0f172a;
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
          color: #64748b;
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
          color: #0f172a;
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
