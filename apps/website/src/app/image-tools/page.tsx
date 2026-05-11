import ImageCompressorWrapper from '../../components/image-tools/ImageCompressorWrapper';

export const metadata = {
  title: 'Image Compressor | TheNexTools',
  description: 'Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, choose output format, and download — no uploads, no accounts, no watermarks.',
};

export default function ImageToolPage() {
  return <ImageCompressorWrapper />;
}
