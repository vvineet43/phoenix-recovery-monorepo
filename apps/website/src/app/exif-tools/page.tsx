import ExifStripperWrapper from '../../components/exif-tools/ExifStripperWrapper';

export const metadata = {
  title: 'EXIF & Metadata Stripper | TheNexTools',
  description: 'Remove GPS coordinates, camera info, timestamps and all hidden metadata from your photos locally. Nothing is uploaded. Free, private, batch-ready.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/exif-tools',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'EXIF & Metadata Stripper | TheNexTools',
    description: 'Remove GPS coordinates, camera info, timestamps and all hidden metadata from your photos locally. Nothing is uploaded. Free, private, batch-ready.',
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
    title: 'EXIF & Metadata Stripper | TheNexTools',
    description: 'Remove GPS coordinates, camera info, timestamps and all hidden metadata from your photos locally. Nothing is uploaded. Free, private, batch-ready.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function ExifToolPage() {
  return (
    <main className="exif-tools-page">
      <ExifStripperWrapper />
    </main>
  );
}
