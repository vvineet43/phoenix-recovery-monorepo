"use client";

import dynamic from 'next/dynamic';

const PdfEditorApp = dynamic(
  () => import('./PdfEditorApp').then((mod) => mod.PdfEditorApp),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading PDF workspace…</div> }
);

const PdfUploadLandingApp = dynamic(
  () => import('./PdfUploadLanding').then((mod) => mod.PdfUploadLanding),
  { ssr: false, loading: () => <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading PDF workspace…</div> }
);

interface PdfEditorWrapperProps {
  initialTool?: string;
  hideHeader?: boolean;
}

export function PdfEditorWrapper({ initialTool, hideHeader }: PdfEditorWrapperProps = {}) {
  return <PdfEditorApp initialTool={initialTool} hideHeader={hideHeader} />;
}

export function PdfUploadLandingWrapper() {
  return <PdfUploadLandingApp />;
}
