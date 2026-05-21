import Link from 'next/link';

export const metadata = {
  title: 'Image Format Converter — JPG, PNG, WebP Locally | TheNexTools',
  description: 'Convert images between JPG, PNG, and WebP formats entirely in your browser. No uploads, no accounts, no file size limits. Fast, private, and free.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-converter',
  },
};

export default function ImageConverterLanding() {
  return (
    <>
      <header className="hero container">
        <div className="badge">NexConvert — Local &amp; Private</div>
        <h1>Convert image formats without sending files to a server.</h1>
        <p>
          Online converters upload your images to a third-party server to convert them. NexConvert does the same work entirely inside your browser tab using the Canvas API — no upload, no waiting, no account required.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=convert" className="btn btn-primary">Open Converter</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Built for fast, private format conversion</h2>
            <p>Whether you need WebP for web performance, PNG for transparency, or JPG for compatibility — NexConvert handles it without leaving your device.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>JPG, PNG, and WebP — all directions</h3>
              <p>Convert any combination: JPG to WebP, PNG to JPG, WebP to PNG. Batch-convert a whole folder at once and download everything as a ZIP. Output quality is adjustable when converting to JPG or WebP.</p>
            </div>
            <div className="feature-card">
              <h3>Transparency preserved for PNG output</h3>
              <p>When converting to PNG, alpha channel data is preserved exactly. Converting a transparent logo or UI asset won't result in a white background — the transparency comes through cleanly.</p>
            </div>
            <div className="feature-card">
              <h3>No upload, no account, no size cap</h3>
              <p>Most online converters limit free uploads to 5–10MB and require sign-up for anything larger. NexConvert processes files entirely in your browser — the only practical limit is your available RAM.</p>
            </div>
            <div className="feature-card">
              <h3>Works offline after first load</h3>
              <p>NexConvert is a Progressive Web App. Once loaded, it works without an internet connection. Install it to your home screen for instant access.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Convert your images. Keep them private.</h2>
          <p>Works on Mac, Windows, and Linux in any modern browser — no installation required.</p>
          <Link href="/image-tools?tool=convert" className="btn btn-primary">Open NexConvert</Link>
        </div>
      </section>
    </>
  );
}
