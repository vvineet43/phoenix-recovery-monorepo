import Link from 'next/link';

export const metadata = {
  title: 'Image Toolkit — Compress, Convert, Redact & Strip EXIF | TheNexTools',
  description: 'A suite of private image tools that run entirely in your browser. Compress JPG/PNG/WebP, convert formats, blur sensitive details, and strip hidden EXIF metadata — no uploads, no accounts.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-toolkit',
  },
  openGraph: {
    title: 'Image Toolkit — Compress, Convert, Redact & Strip EXIF | TheNexTools',
    description: 'A suite of private image tools that run entirely in your browser. No uploads, no accounts.',
    url: 'https://thenextools.com/image-toolkit',
    type: 'website',
  },
};

export default function ImageToolkitLanding() {
  return (
    <>

      <header className="hero container">
        <div className="badge">Image Toolkit — Local &amp; Private</div>
        <h1>Four image tools. One browser tab. Nothing uploaded.</h1>
        <p>
          Compress, convert, redact, and strip metadata from your images entirely on your device. No server ever sees your files — everything happens inside your browser using native APIs.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools" className="btn btn-primary">Open Image Toolkit</Link>
        </div>
      </header>

      <section id="tools" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What's in the toolkit</h2>
            <p>Four focused tools, each solving a specific problem with your image files — all in the same workspace.</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card">
              <h3>Image Compressor</h3>
              <p>Reduce file sizes without visible quality loss. Adjust the quality slider, compare before and after at full resolution, and download — individually or as a ZIP batch.</p>
              <ul>
                <li>JPEG, PNG, and WebP output formats</li>
                <li>Side-by-side comparison before download</li>
                <li>Batch processing with total savings tracker</li>
              </ul>
              <Link href="/image-tools?tool=compress" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Compressor →
              </Link>
            </div>

            <div className="tool-card">
              <h3>Format Converter</h3>
              <p>Convert images between JPG, PNG, and WebP without uploading them anywhere. Transparency is preserved when converting to PNG. Batch-convert entire folders in one go.</p>
              <ul>
                <li>All format combinations supported</li>
                <li>Alpha channel preserved for PNG output</li>
                <li>No file size caps — limited only by your RAM</li>
              </ul>
              <Link href="/image-tools?tool=convert" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Converter →
              </Link>
            </div>

            <div className="tool-card">
              <h3>Privacy Redactor</h3>
              <p>Draw blur zones over any part of an image — faces, license plates, addresses, financial data — then download the flattened result. The blur is permanent and cannot be reversed.</p>
              <ul>
                <li>Adjustable blur intensity per zone</li>
                <li>Multiple regions per image</li>
                <li>Output as JPG or PNG</li>
              </ul>
              <Link href="/image-tools?tool=redact" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Open Redactor →
              </Link>
            </div>

            <div className="tool-card">
              <h3>EXIF Metadata Stripper</h3>
              <p>Every photo taken on a smartphone embeds GPS coordinates, device model, timestamps, and more. NexStrip reads that data, shows you exactly what's there, then removes all of it.</p>
              <ul>
                <li>Detects and removes GPS location data</li>
                <li>Shows every metadata field before stripping</li>
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
            <h2>Why local processing matters for image files</h2>
            <p>Images contain more than pixels. Here's why keeping them off a server is the right default.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>GPS and location data</h3>
              <p>Uploading a photo to compress or convert it also uploads its embedded GPS coordinates to a third-party server. NexTools never receives that data — it never leaves your machine.</p>
            </div>
            <div className="feature-card">
              <h3>Client photos and documents</h3>
              <p>If you're compressing photos for a client project, redacting a legal document screenshot, or stripping metadata from sensitive imagery — none of that should transit an external server.</p>
            </div>
            <div className="feature-card">
              <h3>No file size caps</h3>
              <p>Cloud tools limit free uploads to 5–10MB. The Image Toolkit processes files in your browser — the only limit is your device's available memory, which typically handles hundreds of megabytes without issue.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>All four tools. One workspace. Zero uploads.</h2>
          <p>Works on Mac, Windows, and Linux in any modern browser — no installation required.</p>
          <Link href="/image-tools" className="btn btn-primary">Open Image Toolkit</Link>
        </div>
      </section>

    </>
  );
}
