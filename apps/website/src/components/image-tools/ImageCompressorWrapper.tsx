'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ImageCompressorApp = dynamic(
  () => import('./ImageCompressorApp').then(m => ({ default: m.ImageCompressorApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading…</div> }
);

const ImageConverterApp = dynamic(
  () => import('./ImageConverterApp').then(m => ({ default: m.ImageConverterApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading…</div> }
);

const ImageBlurApp = dynamic(
  () => import('./ImageBlurApp').then(m => ({ default: m.ImageBlurApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading…</div> }
);

const ExifStripperApp = dynamic(
  () => import('../exif-tools/ExifStripperApp').then(m => ({ default: m.ExifStripperApp })),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading…</div> }
);

type ActiveTool = 'compress' | 'convert' | 'redact' | 'exif';

export default function ImageCompressorWrapper() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('compress');

  // Read ?tool= param on mount to open the correct tool
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get('tool');
    if (tool === 'compress' || tool === 'convert' || tool === 'redact' || tool === 'exif') {
      setActiveTool(tool);
    }
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {activeTool === 'compress' && <ImageCompressorApp />}
      {activeTool === 'convert' && <ImageConverterApp />}
      {activeTool === 'redact' && <ImageBlurApp />}
      {activeTool === 'exif' && <ExifStripperApp />}
    </div>
  );
}
