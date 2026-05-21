import Link from 'next/link';

export const metadata = {
  title: 'Image Redactor — Blur Faces, Plates & Sensitive Areas Locally | TheNexTools',
  description: 'Draw blur zones over faces, license plates, addresses, and sensitive data in your photos. The blur is permanent and irreversible. Runs locally in your browser — files never leave your device.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-redactor',
  },
};

export default function ImageRedactorLanding() {
  return (
    <>
      <header className="hero container">
        <div className="badge">NexRedact — Private by Default</div>
        <h1>Some things in a photo aren&apos;t meant to be shared.</h1>
        <p>
          You&apos;re selling a car and need to blur the plates. You&apos;re sharing a screenshot of a receipt but the card number is visible. You took a great event photo but a stranger&apos;s kid is in frame. NexRedact lets you draw blur zones over anything sensitive, then saves a flattened image where the blur is permanent and cannot be undone.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=redact" className="btn btn-primary">Open Redactor</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
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

      <section className="cta-section">
        <div className="container">
          <h2>Blur it before you share it.</h2>
          <p>Open in any modern browser. No installation, no account.</p>
          <Link href="/image-tools?tool=redact" className="btn btn-primary">Open NexRedact</Link>
        </div>
      </section>
    </>
  );
}
