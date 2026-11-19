import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

export const metadata = {
  title: 'Documentation & Offline Setup Guides | TheNexTools',
  description: 'Step-by-step guides for NexData Recovery, NexPDF Toolkit, NexImage Toolkit, and offline PWA installation. Learn how to process files 100% locally.',
  alternates: {
    canonical: '/docs',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/docs' : `/${l}/docs`;
        return acc;
      }, {}),
      'x-default': '/docs',
    }
  },
  openGraph: {
    title: 'Documentation & Offline Setup Guides | TheNexTools',
    description: 'Step-by-step guides for NexData Recovery, NexPDF Toolkit, NexImage Toolkit, and offline PWA installation. Learn how to process files 100% locally.',
    type: 'website',
    siteName: 'TheNexTools',
    locale: 'en_US',
    url: 'https://thenextools.com/docs',
    images: [
      {
        url: 'https://thenextools.com/thenextools-com-og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheNexTools — Free Offline PDF, Image & Data Recovery Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation & Offline Setup Guides | TheNexTools',
    description: 'Step-by-step guides for NexData Recovery, NexPDF Toolkit, NexImage Toolkit, and offline PWA installation. Learn how to process files 100% locally.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function DocsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "TheNexTools Documentation",
            "description": "Guides and quick-start tips for NexData Recovery, NexPDF Toolkit, and NexImage Toolkit.",
            "url": "https://thenextools.com/docs",
            "inLanguage": "en",
            "about": [
              {
                "@type": "Thing",
                "name": "Data Recovery"
              },
              {
                "@type": "Thing",
                "name": "PDF Editing"
              },
              {
                "@type": "Thing",
                "name": "Image Editing"
              }
            ]
          })
        }}
      />

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1>Documentation</h1>
          <p className="text-muted">Guides and quick-start tips for TheNexTools.</p>
        </header>

        <section className="docs-grid" style={{ display: 'grid', gap: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>NexData Recovery</h2>
            <p className="mt-sm">NexData works by scanning physical drive sectors. For best results:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Connect the target drive via a stable USB or SATA connection.</li>
              <li>Ensure you have enough space on a <strong>separate</strong> drive to save recovered files.</li>
              <li>Avoid writing any new data to the drive you are scanning.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>NexPDF Toolkit</h2>
            <p className="mt-sm">All PDF operations happen in your browser using the local CPU. Supported features include:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Merge:</strong> Combine multiple files in any order.</li>
              <li><strong>Sign:</strong> Place signatures as flattened vector elements.</li>
              <li><strong>Compress:</strong> Reduce file size with live quality presets.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>NexImage Toolkit</h2>
            <p className="mt-sm">Process photos completely offline in your browser. Supported operations include:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>EXIF Stripper:</strong> Remove GPS coordinates, camera model, and timestamp data before sharing.</li>
              <li><strong>Compressor:</strong> Optimize image file sizes with real-time compression level previews.</li>
              <li><strong>Converter:</strong> Convert between formats (JPG, PNG, WebP) in bulk.</li>
              <li><strong>Redactor:</strong> Blur faces, license plates, and sensitive details.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Troubleshooting PWAs</h2>
            <p className="mt-sm">To install our tools as standalone apps:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Chrome:</strong> Look for the "Install" icon in the right side of the address bar.</li>
              <li><strong>iOS Safari:</strong> Tap Share &rarr; Add to Home Screen.</li>
              <li><strong>Android:</strong> Tap the "Add to Home Screen" banner or browser menu.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
