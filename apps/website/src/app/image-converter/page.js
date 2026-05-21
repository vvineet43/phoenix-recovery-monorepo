import Link from 'next/link';

export const metadata = {
  title: 'Image Converter — Convert JPG, PNG, WebP Locally | TheNexTools',
  description: 'Convert images between JPG, PNG, and WebP formats entirely in your browser. No uploads, no accounts, no file size limits. Fast, private, and free.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-converter',
  },
  openGraph: {
    title: 'Image Converter — Convert JPG, PNG, WebP Locally | TheNexTools',
    description: 'Convert images between JPG, PNG, and WebP formats entirely in your browser. No uploads, no accounts, no file size limits.',
    url: 'https://thenextools.com/image-converter',
    type: 'website',
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
          <Link href="/image-tools?tool=convert" className="btn btn-outline">Install App</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Built for fast, private format conversion</h2>
            <p>Whether you need WebP for web performance, PNG for transparency, or JPG for compatibility — NexConvert handles it all without leaving your device.</p>
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
              <p>NexConvert is a Progressive Web App. Once loaded, it works without an internet connection. Install it to your home screen or desktop for instant access with no browser needed.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How format conversion works locally</h2>
            <p>The browser's built-in Canvas API can render and re-encode any image format it supports — which covers JPG, PNG, and WebP on all modern browsers.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>1. Drop or select your images</h3>
              <p>Drag a single file or an entire folder of images into the converter. JPG, PNG, WebP, and GIF are all accepted as input.</p>
            </div>
            <div className="feature-card">
              <h3>2. Choose your output format</h3>
              <p>Select JPG, PNG, or WebP. For JPG and WebP, set the quality level from 10% to 100% — a lower value produces a smaller file, a higher value preserves more detail.</p>
            </div>
            <div className="feature-card">
              <h3>3. Download individually or as a ZIP</h3>
              <p>Converted files appear in the list as they finish. Download each one separately or grab the full batch as a single ZIP archive — your choice.</p>
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
