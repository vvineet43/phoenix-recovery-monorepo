'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Minimize2, RefreshCw, EyeOff, FileImage } from 'lucide-react';

const ImageCompressorApp = dynamic(
  () => import('./ImageCompressorApp').then(m => ({ default: m.ImageCompressorApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading Compressor…</div> }
);

const ImageConverterApp = dynamic(
  () => import('./ImageConverterApp').then(m => ({ default: m.ImageConverterApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading Converter…</div> }
);

const ImageBlurApp = dynamic(
  () => import('./ImageBlurApp').then(m => ({ default: m.ImageBlurApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading Redactor…</div> }
);

const ExifStripperApp = dynamic(
  () => import('../exif-tools/ExifStripperApp').then(m => ({ default: m.ExifStripperApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading EXIF Stripper…</div> }
);

type ActiveTab = 'compress' | 'convert' | 'redact' | 'exif';

export default function ImageCompressorWrapper() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('compress');

  // Sync tab with URL search parameter if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tool');
      if (tab === 'compress' || tab === 'convert' || tab === 'redact' || tab === 'exif') {
        setActiveTab(tab);
      }
    }
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tool', tab);
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 2rem 0' }}>
        <div className="workspace-tabs">
          <button
            className={`workspace-tab-btn ${activeTab === 'compress' ? 'active' : ''}`}
            onClick={() => handleTabChange('compress')}
          >
            <Minimize2 size={16} /> Compress
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'convert' ? 'active' : ''}`}
            onClick={() => handleTabChange('convert')}
          >
            <RefreshCw size={16} /> Convert
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'redact' ? 'active' : ''}`}
            onClick={() => handleTabChange('redact')}
          >
            <EyeOff size={16} /> Redact &amp; Blur
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'exif' ? 'active' : ''}`}
            onClick={() => handleTabChange('exif')}
          >
            <FileImage size={16} /> EXIF Stripper
          </button>
        </div>
      </div>

      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {activeTab === 'compress' && <ImageCompressorApp />}
        {activeTab === 'convert' && <ImageConverterApp />}
        {activeTab === 'redact' && <ImageBlurApp />}
        {activeTab === 'exif' && <ExifStripperApp />}
      </div>
    </div>
  );
}
