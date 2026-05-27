import ImageCompressorWrapper from '../../components/image-tools/ImageCompressorWrapper';

export const metadata = {
  title: 'Image Compressor | TheNexTools',
  description: 'Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, choose output format, and download — no uploads, no accounts, no watermarks.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-tools',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Image Compressor | TheNexTools',
    description: 'Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, choose output format, and download — no uploads, no accounts, no watermarks.',
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
    title: 'Image Compressor | TheNexTools',
    description: 'Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, choose output format, and download — no uploads, no accounts, no watermarks.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function ImageToolPage() {
  return (
    <main className="image-tools-page">
      <ImageCompressorWrapper />
    </main>
  );
}
