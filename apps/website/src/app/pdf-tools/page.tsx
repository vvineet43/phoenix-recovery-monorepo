import { PdfEditorWrapper } from '../../components/pdf-tools/PdfEditorWrapper';

export const metadata = {
  title: 'PDF Toolkit | TheNexTools',
  description: 'Merge, split, watermark, and securely process your PDF documents natively in your browser.',
  manifest: '/pdf-manifest.json',
  alternates: {
    canonical: '/pdf-tools',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'PDF Toolkit | TheNexTools',
    description: 'Merge, split, watermark, and securely process your PDF documents natively in your browser.',
    type: 'website',
    images: [
      {
        url: 'https://thenextools.com/thenextools-com-og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Toolkit | TheNexTools',
    description: 'Merge, split, watermark, and securely process your PDF documents natively in your browser.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function PdfToolsPage() {
  return (
    <main className="pdf-tools-page">
      <PdfEditorWrapper />
    </main>
  );
}
