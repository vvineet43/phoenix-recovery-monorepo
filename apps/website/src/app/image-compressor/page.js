import Link from 'next/link';
import { ImageCompressorPageWrapper } from '../../components/image-tools/ImageCompressorWrapper';

const COMPRESSOR_STEPS = [
  { title: 'Add Images', desc: 'Select or drag JPG, PNG, or WebP files into the compressor.' },
  { title: 'Tune Compression', desc: 'Adjust the quality slider and preview original vs. compressed side-by-side.' },
  { title: 'Download Output', desc: 'Save your compressed images individually or as a single consolidated ZIP.' }
];

export const metadata = {
  title: 'Image Compressor — Shrink JPG, PNG, WebP Locally | TheNexTools',
  description: 'Compress images in your browser without uploading them. Adjust quality, compare before and after at full resolution, and download — individually or as a batch ZIP.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-compressor',
    languages: {
      'en': '/image-compressor',
      'es': '/es/image-compressor',
      'x-default': '/image-compressor',
    }
  },
};

export default function ImageCompressorLanding() {
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
                  "name": "How does local image compression work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It uses your browser's native Canvas API to decode the uploaded image, processes the pixels locally at your chosen quality level, and exports it back as a compressed JPEG, PNG, or WebP. No external servers are contacted."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are my images safe with NexCompress?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, completely. Your images are never sent to a server. All processing is executed client-side on your device, ensuring total privacy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a file size limit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, there are no artificial file size caps. The only physical limit is your device's available browser memory, which easily handles hundreds of megabytes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does NexCompress work offline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. NexCompress is a Progressive Web App (PWA). Once loaded, it works entirely without an internet connection."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexCompress Image Compressor",
              "url": "https://thenextools.com/image-compressor",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Compress JPEG, PNG, and WebP images locally in your browser. Adjust quality, compare results, and download as ZIP without uploading your files.",
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
                  "name": "Image Compressor",
                  "item": "https://thenextools.com/image-compressor"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexCompress — Local &amp; Private</div>
        <h1>Compress images without uploading them anywhere.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Every other image compressor sends your files to a server, processes them remotely, and sends them back. That&apos;s fine until it isn&apos;t — the file is too large, the queue is slow, or the image is something you&apos;d rather keep private. NexCompress runs the same compression algorithms directly in your browser. Faster, no size limits, and nothing leaves your machine.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageCompressorPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How to compress images offline</h2>
          <div className="premium-steps-grid">
            {COMPRESSOR_STEPS.map((step, index) => (
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
            <h2>What makes this different from TinyPNG</h2>
            <p>The things that actually matter when you&apos;re compressing images on a regular basis — not just one file at a time through a web form.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Output to JPEG, PNG, or WebP</h3>
              <p>Pick your output format as part of the compression step. PNGs with transparency stay lossless. For JPEG and WebP, drag the quality slider anywhere from 10% to 100% and the estimated file size updates as you move it. You see the trade-off before you commit.</p>
            </div>
            <div className="feature-card">
              <h3>Side-by-side comparison at full resolution</h3>
              <p>Every compressed image gets a compare view — original on the left, compressed on the right, both at full width. You can actually see the quality difference (or lack of it) before downloading anything.</p>
            </div>
            <div className="feature-card">
              <h3>Batch processing with running totals</h3>
              <p>Drop an entire folder in at once. NexCompress works through them sequentially and keeps a running tally of total space saved. Download files one at a time or grab the whole batch as a single ZIP.</p>
            </div>
            <div className="feature-card">
              <h3>No account, no upload, no artificial caps</h3>
              <p>Most web compressors limit you to 5MB per file unless you sign up. Some watermark the output. NexCompress doesn&apos;t do any of that — the only limit is your browser&apos;s available memory, which on any modern machine handles hundreds of megabytes easily.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about NexCompress image compression.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How does local image compression work?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                It uses your browser&apos;s native Canvas API to decode the uploaded image, processes the pixels locally at your chosen quality level, and exports it back as a compressed JPEG, PNG, or WebP. No external servers are contacted.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are my images safe with NexCompress?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes, completely. Your images are never sent to a server. All processing is executed client-side on your device, ensuring total privacy.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Is there a file size limit?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No, there are no artificial file size caps. The only physical limit is your device&apos;s available browser memory, which easily handles hundreds of megabytes.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Does NexCompress work offline?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes. NexCompress is a Progressive Web App (PWA). Once loaded, it works entirely without an internet connection.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to shrink your images?</h2>
          <p>Drop your files at the top of the page. Runs in Chrome, Firefox, Safari, and Edge. Nothing to install.</p>
          <a href="#" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>
    </>
  );
}
