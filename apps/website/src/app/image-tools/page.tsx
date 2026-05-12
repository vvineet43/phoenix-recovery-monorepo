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
};

export default function ImageToolPage() {
  return <ImageCompressorWrapper />;
}
