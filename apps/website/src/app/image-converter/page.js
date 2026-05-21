import Link from 'next/link';

export const metadata = {
  title: 'Image Format Converter — JPG to WebP, PNG to JPG, Locally | TheNexTools',
  description: 'Convert images between JPG, PNG, and WebP without uploading them. Batch-convert entire folders, preserve transparency, and download as a ZIP — all in your browser.',
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
        <h1>Stop uploading images just to change the format.</h1>
        <p>
          You have a folder of PNGs that need to be WebP for your website. Or a batch of WebPs that a client needs as JPEGs. Every online converter wants you to upload them one at a time, wait, download, repeat. NexConvert handles the whole folder at once — locally, in your browser, with no queue and no file size cap.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=convert" className="btn btn-primary">Open Converter</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How it works</h2>
            <p>Your browser already knows how to decode and re-encode images through the Canvas API. NexConvert just gives you a proper interface for it.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Every format combination</h3>
              <p>JPG to WebP, PNG to JPG, WebP to PNG — any direction. Drop a mixed folder of formats and convert them all to one target format in a single operation. Adjust quality for JPG and WebP output with a slider.</p>
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

      <section className="cta-section">
        <div className="container">
          <h2>Drop in your files. Pick your format. Done.</h2>
          <p>Runs in any modern browser on Mac, Windows, and Linux.</p>
          <Link href="/image-tools?tool=convert" className="btn btn-primary">Open NexConvert</Link>
        </div>
      </section>
    </>
  );
}
