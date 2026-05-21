import Link from 'next/link';

export const metadata = {
  title: 'NexImage Toolkit — Compress, Convert, Redact & Strip Metadata | TheNexTools',
  description: 'Four image tools in one browser tab. Compress, convert formats, blur sensitive areas, and strip EXIF metadata — all locally, no uploads, no accounts.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-toolkit',
  },
  openGraph: {
    title: 'NexImage Toolkit — Compress, Convert, Redact & Strip Metadata | TheNexTools',
    description: 'Four image tools in one browser tab. Compress, convert formats, blur sensitive areas, and strip EXIF metadata — all locally.',
    url: 'https://thenextools.com/image-toolkit',
    type: 'website',
  },
};

export default function ImageToolkitLanding() {
  return (
    <>

      <header className="hero container">
        <div className="badge">NexImage — Local &amp; Private</div>
        <h1>Four image tools that never touch a server.</h1>
        <p>
          Compress, convert, redact, and clean metadata from your images — all inside a single browser tab. Nothing gets uploaded. The tools run on your hardware using the browser&apos;s native Canvas API, so they work even after you disconnect from the internet.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools" className="btn btn-primary">Open NexImage</Link>
        </div>
      </header>

      <section id="tools" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What&apos;s included</h2>
            <p>Each tool does one thing well. Together they cover the image tasks that come up most often.</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card">
              <h3>Compressor</h3>
              <p>Shrink file sizes with a quality slider that shows estimated output size in real time. Compare original vs. compressed at full resolution before downloading. Batch-process entire folders and grab the result as a ZIP.</p>
              <ul>
                <li>JPEG, PNG, and WebP output</li>
                <li>Side-by-side comparison before download</li>
                <li>Running total of space saved across all files</li>
              </ul>
              <Link href="/image-tools?tool=compress" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Compressor →
              </Link>
            </div>

            <div className="tool-card">
              <h3>Format Converter</h3>
              <p>Convert between JPG, PNG, and WebP — any direction. Drop a mixed folder and convert everything to one target format. Transparency is preserved when converting to PNG. Quality is adjustable for JPG and WebP.</p>
              <ul>
                <li>All format combinations supported</li>
                <li>Alpha channel preserved for PNG output</li>
                <li>No file size caps or daily limits</li>
              </ul>
              <Link href="/image-tools?tool=convert" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Converter →
              </Link>
            </div>

            <div className="tool-card">
              <h3>Privacy Redactor</h3>
              <p>Draw blur zones over faces, plates, addresses, financial data — anything sensitive. Adjust the blur intensity per zone. The output is a flattened image where the blur is permanent and irreversible.</p>
              <ul>
                <li>Variable blur strength per region</li>
                <li>Multiple zones per image</li>
                <li>Flattened output — no recoverable layers</li>
              </ul>
              <Link href="/image-tools?tool=redact" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Redactor →
              </Link>
            </div>

            <div className="tool-card">
              <h3>EXIF Metadata Stripper</h3>
              <p>Every photo from your phone embeds GPS coordinates, timestamps, device info, and more. NexStrip shows you every field, then removes all of it — so the photo you share doesn&apos;t carry your home address in the file properties.</p>
              <ul>
                <li>Reveals and removes GPS location data</li>
                <li>Displays every metadata field before stripping</li>
                <li>Download clean copies individually or as ZIP</li>
              </ul>
              <Link href="/image-tools?tool=exif" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open EXIF Stripper →
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section id="privacy" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Why this runs locally instead of on a server</h2>
            <p>Images aren&apos;t just pixels. They carry data that most people don&apos;t know about.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>Your location is in the file</h3>
              <p>Uploading a photo to compress it also uploads its GPS coordinates to a third-party server. If that&apos;s a photo of your home, your child&apos;s school, or your office — that&apos;s a problem. NexTools never receives that data.</p>
            </div>
            <div className="feature-card">
              <h3>Client files should stay local</h3>
              <p>Compressing photos for a client deliverable, redacting a legal screenshot, stripping metadata from sensitive documentation — none of that should pass through someone else&apos;s infrastructure, even briefly.</p>
            </div>
            <div className="feature-card">
              <h3>No limits means no friction</h3>
              <p>Cloud tools restrict free users to 5–10MB per file. NexImage has no such cap — your browser can typically handle files of several hundred megabytes without breaking a sweat.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Everything you need for image work, without leaving the browser.</h2>
          <p>Works in Chrome, Firefox, Safari, and Edge on Mac, Windows, and Linux.</p>
          <Link href="/image-tools" className="btn btn-primary">Open NexImage</Link>
        </div>
      </section>

    </>
  );
}
