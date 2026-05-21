import Link from 'next/link';

export const metadata = {
  title: 'Image Redactor — Blur & Hide Sensitive Details Locally | TheNexTools',
  description: 'Blur faces, license plates, addresses, and any sensitive area in your photos. Runs entirely in your browser — files never leave your device. Free, private, and fast.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-redactor',
  },
  openGraph: {
    title: 'Image Redactor — Blur & Hide Sensitive Details Locally | TheNexTools',
    description: 'Blur faces, license plates, addresses, and any sensitive area in your photos. Runs entirely in your browser — files never leave your device.',
    url: 'https://thenextools.com/image-redactor',
    type: 'website',
  },
};

export default function ImageRedactorLanding() {
  return (
    <>

      <header className="hero container">
        <div className="badge">NexRedact — Private by Default</div>
        <h1>Blur sensitive details in your images before you share them.</h1>
        <p>
          License plates, faces, home addresses, financial documents — sometimes a photo needs to be shared but shouldn't reveal everything in it. NexRedact lets you draw blur zones directly on your image in the browser, then download the result. Nothing is uploaded.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=redact" className="btn btn-primary">Open Redactor</Link>
          <Link href="/image-tools?tool=redact" className="btn btn-outline">Install App</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to redact images privately</h2>
            <p>Most online redaction tools upload your images to their servers. NexRedact does all the processing inside your browser using the Canvas API — the image stays on your machine throughout.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Draw blur zones anywhere</h3>
              <p>Click and drag to select any rectangular region of the image. Adjust blur strength to control how aggressively the selected area is obscured — from a light softening to a heavy pixelated block.</p>
            </div>
            <div className="feature-card">
              <h3>Multiple redactions per image</h3>
              <p>Add as many blur zones as needed on a single image. Each zone can be removed or adjusted independently before you finalize the download — so you don't lose your work correcting a mistake.</p>
            </div>
            <div className="feature-card">
              <h3>Suitable for legal, journalistic, and personal use</h3>
              <p>Redacting a screenshot of a contract, blurring a witness face, or hiding your home address in a listing photo — NexRedact handles each case the same way: privately, without any server ever seeing the file.</p>
            </div>
            <div className="feature-card">
              <h3>Download and share immediately</h3>
              <p>The redacted image downloads as a JPG or PNG to your device the moment you're done. The output is a flattened image — the blur regions are permanent and cannot be reversed once downloaded.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Common reasons people redact images</h2>
            <p>Sharing a photo publicly doesn't have to mean sharing every detail in it.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>License plates &amp; vehicle photos</h3>
              <p>Selling a car or posting a vehicle photo publicly? Blur the plates to prevent misuse of your registration information.</p>
            </div>
            <div className="feature-card">
              <h3>Faces in crowd photos</h3>
              <p>Publishing an event photo or news image where bystanders haven't consented? Blur faces to meet privacy expectations or legal requirements.</p>
            </div>
            <div className="feature-card">
              <h3>Documents with personal data</h3>
              <p>Sharing a screenshot of a receipt, invoice, or contract? Redact account numbers, addresses, and signatures before forwarding or posting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Redact first. Share with confidence.</h2>
          <p>Works in any modern browser on Mac, Windows, and Linux — no software to install.</p>
          <Link href="/image-tools?tool=redact" className="btn btn-primary">Open NexRedact</Link>
        </div>
      </section>

    </>
  );
}
