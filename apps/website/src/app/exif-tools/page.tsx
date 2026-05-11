import ExifStripperWrapper from '../../components/exif-tools/ExifStripperWrapper';

export const metadata = {
  title: 'EXIF & Metadata Stripper | TheNexTools',
  description: 'Remove GPS coordinates, camera info, timestamps and all hidden metadata from your photos locally. Nothing is uploaded. Free, private, batch-ready.',
};

export default function ExifToolPage() {
  return <ExifStripperWrapper />;
}
