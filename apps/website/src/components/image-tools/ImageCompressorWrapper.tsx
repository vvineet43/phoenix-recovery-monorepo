'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Minimize2, RefreshCw, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';

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

const FaviconGeneratorApp = dynamic(
  () => import('./FaviconGeneratorApp').then(m => ({ default: m.FaviconGeneratorApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading Generator…</div> }
);

type ActiveTab = 'compress' | 'convert' | 'redact' | 'favicon';

export default function ImageCompressorWrapper() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('compress');

  // Sync tab with URL search parameter if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tool');
      if (tab === 'compress' || tab === 'convert' || tab === 'redact' || tab === 'favicon') {
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
            <Minimize2 size={16} /> NexCompress
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'convert' ? 'active' : ''}`}
            onClick={() => handleTabChange('convert')}
          >
            <RefreshCw size={16} /> NexConvert
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'redact' ? 'active' : ''}`}
            onClick={() => handleTabChange('redact')}
          >
            <EyeOff size={16} /> NexRedact (Privacy Blur)
          </button>
          <button
            className={`workspace-tab-btn ${activeTab === 'favicon' ? 'active' : ''}`}
            onClick={() => handleTabChange('favicon')}
          >
            <Sparkles size={16} /> NexIcon (Favicon Generator)
          </button>
        </div>
      </div>

      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {activeTab === 'compress' && <ImageCompressorApp />}
        {activeTab === 'convert' && <ImageConverterApp />}
        {activeTab === 'redact' && <ImageBlurApp />}
        {activeTab === 'favicon' && <FaviconGeneratorApp />}
      </div>
    </div>
  );
}
