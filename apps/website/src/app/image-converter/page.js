import Link from 'next/link';
import { ImageConverterPageWrapper } from '../../components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const CONVERTER_STEPS = [
  { title: 'Select Files', desc: 'Select or drag raw images of any format into the workspace.' },
  { title: 'Select Format', desc: 'Choose output format (JPG, PNG, WebP) and define quality options.' },
  { title: 'Batch Export', desc: 'Click convert and download the converted files as a clean ZIP package.' }
];

export const metadata = {
  title: 'Image Format Converter — JPG to WebP, PNG to JPG, Locally | TheNexTools',
  description: 'Convert JPG, PNG, and WebP images offline in your browser. Batch-convert folders, preserve transparency, and download as a ZIP with zero uploads.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-converter',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/image-converter' : `/${l}/image-converter`;
        return acc;
      }, {}),
      'x-default': '/image-converter',
    }
  },
  openGraph: {
    title: 'Image Format Converter — JPG to WebP, PNG to JPG, Locally | TheNexTools',
    description: 'Convert JPG, PNG, and WebP images offline in your browser. Batch-convert folders, preserve transparency, and download as a ZIP with zero uploads.',
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
    title: 'Image Format Converter — JPG to WebP, PNG to JPG, Locally | TheNexTools',
    description: 'Convert JPG, PNG, and WebP images offline in your browser. Batch-convert folders, preserve transparency, and download as a ZIP with zero uploads.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function ImageConverterLanding() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does browser-based image conversion work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It uses the HTML5 Canvas API in your browser to decode the uploaded image format (like PNG, JPG, or WebP) and re-encode it directly to your desired target format. The process executes locally on your CPU."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will image transparency be preserved during conversion?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. If converting to PNG or WebP, transparency is fully preserved. When converting transparent images to JPEG (which does not support alpha channels), transparency is cleanly filled with a solid white background."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many files can I convert at once?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can select and convert dozens or hundreds of files simultaneously. Since processing occurs locally on your machine, there are no cloud queuing delays or daily caps."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are my files safe during format conversion?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Completely. Because the utility runs purely inside your browser client without server-side uploads, your photos never leave your device."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexConvert Image Converter",
              "url": "https://thenextools.com/image-converter",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Convert images between JPG, PNG, and WebP format locally in your browser. Batch-process directories and save transparency options offline.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://thenextools.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Image Toolkit",
                  "item": "https://thenextools.com/image-toolkit"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Image Converter",
                  "item": "https://thenextools.com/image-converter"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexConvert — Local &amp; Private</div>
        <h1>Stop uploading images just to change the format.</h1>
        <p style={{ marginBottom: '3rem' }}>
          You have a folder of PNGs that need to be WebP for your website. Or a batch of WebPs that a client needs as JPEGs. Every online converter wants you to upload them one at a time, wait, download, repeat. NexConvert handles the whole folder at once — locally, in your browser, with no queue and no file size cap.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageConverterPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How to convert images offline</h2>
          <div className="premium-steps-grid">
            {CONVERTER_STEPS.map((step, index) => (
              <div key={index} className="premium-step-card">
                <div className="premium-step-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="premium-step-badge">
                  {index + 1}
                </div>
                <h4 className="premium-step-title">{step.title}</h4>
                <p className="premium-step-text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How it works</h2>
            <p>Your browser already knows how to decode and re-encode images through the Canvas API. NexConvert just gives you a proper interface for it.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Every format combination</h3>
              <p>JPG to WebP, PNG to JPG, WebP to PNG — any direction. Drop a mixed folder and convert everything to one target format in a single operation. Adjust quality for JPG and WebP output with a slider.</p>
            </div>
            <div className="feature-card">
              <h3>Transparency handled correctly</h3>
              <p>Converting to PNG? Alpha channels are preserved exactly. You won&apos;t end up with a white rectangle where your transparent logo used to be. Converting from PNG to JPG? The background is filled cleanly instead of turning black.</p>
            </div>
            <div className="feature-card">
              <h3>No upload, no sign-up, no daily limit</h3>
              <p>Most free converters cap at 5MB or 20 files per day. NexConvert has no limits because there&apos;s no server involved — it&apos;s just your CPU doing the work. The only practical ceiling is your browser&apos;s available memory.</p>
            </div>
            <div className="feature-card">
              <h3>Works offline after first visit</h3>
              <p>NexConvert is a Progressive Web App. Load it once, and it works without an internet connection going forward. Pin it to your dock or home screen and it behaves like a native app.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about NexConvert format conversion.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How does browser-based image conversion work?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                It uses the HTML5 Canvas API in your browser to decode the uploaded image format (like PNG, JPG, or WebP) and re-encode it directly to your desired target format. The process executes locally on your CPU.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Will image transparency be preserved during conversion?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes. If converting to PNG or WebP, transparency is fully preserved. When converting transparent images to JPEG (which does not support alpha channels), transparency is cleanly filled with a solid white background.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How many files can I convert at once?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                You can select and convert dozens or hundreds of files simultaneously. Since processing occurs locally on your machine, there are no cloud queuing delays or daily caps.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are my files safe during format conversion?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Completely. Because the utility runs purely inside your browser client without server-side uploads, your photos never leave your device.
              </p>
            </details>
          </div>
        </div>
      </section>

            <section className="divider" style={{ background: 'var(--bg-2)', padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>More Image Tools</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <Link href="/image-compressor" className="badge" style={{ textDecoration: 'none' }}>Image Compressor</Link>
              <Link href="/image-redactor" className="badge" style={{ textDecoration: 'none' }}>Image Redactor & Blur</Link>
              <Link href="/exif-stripper" className="badge" style={{ textDecoration: 'none' }}>EXIF Metadata Stripper</Link>
              <Link href="/image-toolkit" className="badge" style={{ textDecoration: 'none' }}>All Image Tools</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to convert your images?</h2>
          <p>Drop your files at the top of the page. Runs in any modern browser offline.</p>
          <a href="#tool" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>
    </>
  );
}
