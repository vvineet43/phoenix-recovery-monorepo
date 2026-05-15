import { PdfEditorWrapper } from '../../components/pdf-tools/PdfEditorWrapper';

export const metadata = {
  title: 'PDF Toolkit | Phoenix',
  description: 'Merge, split, watermark, and securely process your PDF documents natively in your browser.',
  manifest: '/pdf-manifest.json',
  alternates: {
    canonical: '/pdf-tools',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PdfToolsPage() {
  return (
    <main className="pdf-tools-page">
      <PdfEditorWrapper />
    </main>
  );
}
