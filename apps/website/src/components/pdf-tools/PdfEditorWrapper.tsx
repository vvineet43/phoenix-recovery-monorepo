"use client";

import dynamic from 'next/dynamic';

const PdfEditorApp = dynamic(
  () => import('./PdfEditorApp').then((mod) => mod.PdfEditorApp),
  { ssr: false }
);

export function PdfEditorWrapper() {
  return <PdfEditorApp />;
}
