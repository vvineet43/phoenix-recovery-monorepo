'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { saveFileForTransition } from '../../lib/db';
import { FileUp, Loader2, ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import { locales, defaultLocale } from '@/lib/i18n-config';
import enDict from '@/dictionaries/en.json';
import './pdf-editor.css';

export function PdfUploadLanding() {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Parse active locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const lang = locales.includes(segments[0]) ? segments[0] : defaultLocale;

  // Dictionary state (default to statically loaded English)
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
  const t = activeDict.pdfToolkit?.upload || enDict.pdfToolkit.upload;

  const getRedirectPath = (preloaded = false) => {
    const prefix = lang === 'en' ? '' : `/${lang}`;
    return `${prefix}/pdf-tools${preloaded ? '?preloaded=true' : ''}`;
  };

  const handleFile = async (file: File) => {
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      try {
        await saveFileForTransition(file);
        router.push(getRedirectPath(true));
      } catch (err) {
        console.error('Failed to save file for transition:', err);
        router.push(getRedirectPath(false));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        style={{ display: 'none' }}
      />

      <div
        className={`upload-zone${isDragging ? ' drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        style={{
          padding: '5rem 2rem',
          minHeight: '280px',
          background: 'var(--editor-card)',
          borderRadius: '16px',
          boxShadow: 'var(--editor-shadow-md)',
          cursor: isUploading ? 'not-allowed' : 'pointer'
        }}
      >
        {isUploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Loader2 className="spinner" size={40} style={{ color: 'var(--editor-accent)', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontWeight: 600, color: 'var(--editor-text-main)', margin: 0 }}>{t.preparing}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--editor-text-muted)' }}>{t.loading}</p>
          </div>
        ) : (
          <>
            <div
              style={{
                background: 'var(--editor-accent-soft)',
                color: 'var(--editor-accent)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                marginInline: 'auto'
              }}
            >
              <FileUp size={30} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--editor-text-main)' }}>
              {t.selectFile}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--editor-text-muted)', marginBottom: '1.5rem' }}>
              {t.dragDrop}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--editor-border)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--editor-text-muted)' }}>
                <ShieldCheck size={14} style={{ color: '#16a34a' }} /> {t.clientSide}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--editor-text-muted)' }}>
                <Lock size={14} style={{ color: '#16a34a' }} /> {t.noUploads}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--editor-text-muted)' }}>
                <RefreshCw size={14} style={{ color: '#16a34a' }} /> {t.worksOffline}
              </span>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
