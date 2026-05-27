import Link from 'next/link';
import { ImageBlurPageWrapper } from '../../components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const REDACTOR_STEPS = [
  { title: 'Add Image', desc: 'Select or drag your image into the secure editor window.' },
  { title: 'Censor Fields', desc: 'Draw blur areas over faces, names, plates, or private details.' },
  { title: 'Export Flattened', desc: 'Download a clean, flattened file where original data is permanently destroyed.' }
];

export const metadata = {
  title: 'Image Redactor — Blur Faces, Plates & Sensitive Areas Locally | TheNexTools',
  description: 'Draw blur zones over faces, license plates, addresses, and sensitive data in your photos. The blur is permanent and irreversible. Runs locally in your browser — files never leave your device.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-redactor',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/image-redactor' : `/${l}/image-redactor`;
        return acc;
      }, {}),
      'x-default': '/image-redactor',
    }
  },
  openGraph: {
    title: 'Image Redactor — Blur Faces, Plates & Sensitive Areas Locally | TheNexTools',
    description: 'Draw blur zones over faces, license plates, addresses, and sensitive data in your photos. The blur is permanent and irreversible. Runs locally in your browser — files never leave your device.',
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
    title: 'Image Redactor — Blur Faces, Plates & Sensitive Areas Locally | TheNexTools',
    description: 'Draw blur zones over faces, license plates, addresses, and sensitive data in your photos. The blur is permanent and irreversible. Runs locally in your browser — files never leave your device.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function ImageRedactorLanding() {
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
                  "name": "Is the blur permanent on my redacted images?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, completely. The blur and blackout zones are permanently drawn and rasterized onto the image canvas before download. There are no layers, masks, or metadata tags left behind that could be undone."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can someone extract the unblurred image?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Unlike PDF editors that sometimes hide original text under a black box, NexRedact performs a destructive pixel edit. The original pixels in the blurred/blackout zones are completely replaced and destroyed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What image formats are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexRedact supports JPG, PNG, WebP, and other standard browser-compatible image formats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are my sensitive screenshots uploaded to a server?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, they never touch any server. The redaction is done entirely inside your local browser client to guarantee maximum privacy for financial, legal, or personal data."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexRedact Image Redactor",
              "url": "https://thenextools.com/image-redactor",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Redact and blur screenshots or images locally. Blur faces, license plates, and sensitive documents permanently and irreversibly.",
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
                  "name": "Image Redactor",
                  "item": "https://thenextools.com/image-redactor"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexRedact — Private by Default</div>
        <h1>Some things in a photo aren&apos;t meant to be shared.</h1>
        <p style={{ marginBottom: '3rem' }}>
          You&apos;re selling a car and need to blur the plates. You&apos;re sharing a screenshot of a receipt but the card number is visible. You took a great event photo but a stranger&apos;s kid is in frame. NexRedact lets you draw blur zones over anything sensitive, then saves a flattened image where the blur is permanent and cannot be undone.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageBlurPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>How to redact images offline</h2>
          <div className="premium-steps-grid">
            {REDACTOR_STEPS.map((step, index) => (
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
            <h2>Simple redaction that actually works</h2>
            <p>No layers, no Photoshop, no uploading sensitive images to someone else&apos;s server. Just draw, blur, download.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Draw blur zones with your mouse</h3>
              <p>Click and drag to select a rectangular area. Adjust the blur intensity — from a subtle gaussian to a heavy pixelation that makes text completely unreadable. Add as many zones as you need before saving.</p>
            </div>
            <div className="feature-card">
              <h3>Permanent, irreversible redaction</h3>
              <p>The downloaded image is flattened. The blurred pixels are baked into the file — there&apos;s no hidden layer underneath that someone could extract. This matters for legal, medical, and journalistic work where partial redaction isn&apos;t acceptable.</p>
            </div>
            <div className="feature-card">
              <h3>Common use cases</h3>
              <p>Blurring license plates in vehicle listings. Redacting account numbers on invoice screenshots. Hiding bystander faces in crowd photos for news use. Removing your address from a photo before posting it to a marketplace. All of this takes about ten seconds.</p>
            </div>
            <div className="feature-card">
              <h3>Nothing gets uploaded</h3>
              <p>The image stays in your browser the entire time. NexRedact uses the Canvas API to apply the blur filter locally — no server, no account, no file size cap. Download the result as JPG or PNG and you&apos;re done.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about NexRedact privacy redaction.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Is the blur permanent on my redacted images?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes, completely. The blur and blackout zones are permanently drawn and rasterized onto the image canvas before download. There are no layers, masks, or metadata tags left behind that could be undone.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Can someone extract the unblurred image?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No. Unlike PDF editors that sometimes hide original text under a black box, NexRedact performs a destructive pixel edit. The original pixels in the blurred/blackout zones are completely replaced and destroyed.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                What image formats are supported?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                NexRedact supports JPG, PNG, WebP, and other standard browser-compatible image formats.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are my sensitive screenshots uploaded to a server?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No, they never touch any server. The redaction is done entirely inside your local browser client to guarantee maximum privacy for financial, legal, or personal data.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to redact your images?</h2>
          <p>Drop your files at the top of the page. Everything is processed purely client-side.</p>
          <a href="#" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>
    </>
  );
}
