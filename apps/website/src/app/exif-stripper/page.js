import Link from 'next/link';
import { ExifStripperPageWrapper } from '../../components/image-tools/ImageCompressorWrapper';

const STRIPPER_STEPS = [
  { title: 'Drop Photos', desc: 'Select or drag your photos into the EXIF analyzer area.' },
  { title: 'Inspect Metadata', desc: 'View all embedded GPS coordinates, camera models, and timestamps.' },
  { title: 'Strip & Download', desc: 'Click strip EXIF to generate sanitized image files without any hidden fields.' }
];

export const metadata = {
  title: 'EXIF Metadata Stripper — Remove GPS & Camera Data from Photos | TheNexTools',
  description: 'See the hidden data embedded in your photos — GPS location, device model, timestamps — and strip all of it before sharing. Runs locally in your browser.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/exif-stripper',
  },
};

export default function ExifStripperLanding() {
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
                  "name": "What is EXIF metadata?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "EXIF (Exchangeable Image File Format) is data embedded directly inside image files when photos are captured. It contains details like camera models, timestamps, exposure settings, and sometimes exact GPS coordinates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does NexStrip remove this data?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It loads the photo inside your local browser client, extracts the raw image canvas data, and re-exports it back as a clean image without copying the metadata headers. This destroys the EXIF data permanently."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my privacy guaranteed?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. NexStrip operates entirely client-side. The metadata parsing and stripping happen in your browser context. No data, files, or location coordinates are uploaded to any server."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What image formats are supported by EXIF Stripper?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexStrip supports JPEG, JPG, and PNG image files, which are the most common formats that embed camera metadata."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexStrip EXIF Metadata Stripper",
              "url": "https://thenextools.com/exif-stripper",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "View and remove EXIF camera metadata and GPS coordinates from your photos locally. No server uploads required.",
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
                  "name": "EXIF Stripper",
                  "item": "https://thenextools.com/exif-stripper"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexStrip — Free &amp; Private</div>
        <h1>Your photos know where you live. Seriously.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Every photo from your phone has GPS coordinates baked into the file — accurate to a few meters. It also has your device model, the exact time you took the shot, and sometimes your name. Most people have no idea this data is there. NexStrip shows you everything, then strips it out before you share the photo with anyone.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ExifStripperPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How to strip EXIF data offline</h2>
          <div className="premium-steps-grid">
            {STRIPPER_STEPS.map((step, index) => (
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
            <h2>What&apos;s actually hiding in your photos</h2>
            <p>EXIF metadata was designed for camera manufacturers, not for social media. Here&apos;s what gets embedded by default.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>GPS coordinates</h3>
              <p>If location services were on when you took the photo (and on most phones, they are by default), the file contains exact latitude and longitude. Posting a photo of your living room? You just posted your home address to anyone who knows how to right-click and check file properties.</p>
            </div>
            <div className="feature-card">
              <h3>Device fingerprint</h3>
              <p>Camera make, model, serial number, software version, lens data — all of it is stored in the image file. In legal or investigative contexts, this can directly link a photo to a specific device and person. Most people sharing vacation photos don&apos;t realize they&apos;re also sharing their phone&apos;s identity.</p>
            </div>
            <div className="feature-card">
              <h3>Timestamps and capture settings</h3>
              <p>The original capture time, any editing timestamps, ISO, shutter speed, aperture — it&apos;s all there. If you&apos;d rather not broadcast exactly when and how you took every photo, stripping this is basic digital hygiene.</p>
            </div>
            <div className="feature-card">
              <h3>Everything processed locally</h3>
              <p>NexStrip reads and removes metadata entirely inside your browser. No server involved. Batch-process a whole folder and download clean copies individually or as a ZIP. After the first page load, it even works offline.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about NexStrip metadata stripping.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                What is EXIF metadata?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                EXIF (Exchangeable Image File Format) is data embedded directly inside image files when photos are captured. It contains details like camera models, timestamps, exposure settings, and sometimes exact GPS coordinates.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How does NexStrip remove this data?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                It loads the photo inside your local browser client, extracts the raw image canvas data, and re-exports it back as a clean image without copying the metadata headers. This destroys the EXIF data permanently.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Is my privacy guaranteed?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes. NexStrip operates entirely client-side. The metadata parsing and stripping happen in your browser context. No data, files, or location coordinates are uploaded to any server.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                What image formats are supported by EXIF Stripper?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                NexStrip supports JPEG, JPG, and PNG image files, which are the most common formats that embed camera metadata.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to clean your photos?</h2>
          <p>Drop your files at the top of the page. All metadata is stripped in your browser.</p>
          <a href="#" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>
    </>
  );
}
