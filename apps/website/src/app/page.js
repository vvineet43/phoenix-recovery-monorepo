import Link from 'next/link';

export const metadata = {
  title: 'TheNexTools — Private, Offline Desktop Utilities',
  description: 'A focused collection of professional tools that run entirely on your device. PDF editing, EXIF stripping, image compression, and data recovery — no uploads, no accounts.',
};

export default function Home() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          <div className="nav-links">
            <a href="#tools" className="link nav-hide-mobile">Our Tools</a>
            <a href="#why" className="link nav-hide-mobile">Why Offline?</a>
            <a href="#tools" className="btn btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.83rem' }}>
              Explore Tools
            </a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">Professional Desktop Software</div>
        <h1>Tools that work where the internet can&apos;t reach them.</h1>
        <p>
          A focused suite of professional utilities that run entirely on your device. PDF editing, EXIF stripping, image compression, data recovery — no uploads, no accounts.
        </p>
        <div className="hero-actions">
          <a href="#tools" className="btn btn-primary">See What&apos;s Available</a>
        </div>
      </header>

      {/* Why offline */}
      <section id="why" className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Built for professionals who can&apos;t afford a data breach</h2>
            <p>Most software is optimized for convenience, not confidentiality. We made different trade-offs.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>Your files stay on your machine</h3>
              <p>Legal documents, financial records, client photos — none of it should transit a third-party server to get a task done. Every tool processes files locally using your hardware, with no telemetry, no sync, and no accounts required.</p>
            </div>
            <div className="feature-card">
              <h3>Pay once, own it permanently</h3>
              <p>Monthly subscriptions for basic utilities make no sense. The core tools are free. When you need advanced capabilities — like full file recovery — you purchase a one-time license that never expires and never phones home.</p>
            </div>
            <div className="feature-card">
              <h3>Speed that reflects your hardware</h3>
              <p>Web-based tools are throttled by upload bandwidth and shared server queues. Running locally means a 500MB PDF compresses in seconds, not minutes. Your machine&apos;s CPU sets the ceiling, not someone else&apos;s infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools">
        <div className="container">
          <div className="section-header">
            <h2>The current lineup</h2>
            <p>Four tools, all offline, all free to use — built around the same principle of keeping your files on your machine.</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card">
              <h3>Phoenix Data Recovery</h3>
              <p>Recovers deleted files from formatted drives and corrupted SD cards by scanning raw disk sectors — bypassing the file system entirely.</p>
              <ul>
                <li>Works on dead partitions and formatted volumes</li>
                <li>Repairs unplayable MP4 and MOV video files</li>
                <li>Free to scan, pay only when you recover</li>
              </ul>
              <Link href="/data-recovery" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn more &rarr;
              </Link>
            </div>

            <div className="tool-card">
              <h3>NexPDF Toolkit</h3>
              <p>A full PDF editor in your browser — merge documents, reorder pages, add signatures, stamp dates, and compress files. No upload, no account.</p>
              <ul>
                <li>Drag-and-drop page management and annotations</li>
                <li>Handwritten and typed signature support</li>
                <li>Compression with live file size preview</li>
              </ul>
              <Link href="/pdf-toolkit" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn more &rarr;
              </Link>
            </div>

            <div className="tool-card">
              <h3>EXIF Metadata Stripper</h3>
              <p>Shows what&apos;s hidden in your photos — GPS coordinates, device fingerprints, timestamps — then removes all of it before you share.</p>
              <ul>
                <li>Detects and removes GPS location data</li>
                <li>Shows every metadata field before stripping</li>
                <li>Download individually or as a ZIP</li>
              </ul>
              <Link href="/exif-stripper" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn more &rarr;
              </Link>
            </div>

            <div className="tool-card">
              <h3>Image Compressor</h3>
              <p>Compress JPG, PNG, and WebP images locally. Adjust quality with a slider, compare before and after at full size, and download — nothing leaves your device.</p>
              <ul>
                <li>JPEG, PNG, and WebP output formats</li>
                <li>Side-by-side comparison before downloading</li>
                <li>Batch processing with total savings tracker</li>
              </ul>
              <Link href="/image-compressor" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn more &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>No accounts. No uploads. No nonsense.</h2>
          <p>TheNexTools exists because the best version of these tools should work offline, owned outright, without conditions.</p>
          <a href="#tools" className="btn btn-primary">Explore the Tools</a>
        </div>
      </section>

      <footer>
        <div className="container">
          &copy; {new Date().getFullYear()} TheNexTools. All rights reserved.
        </div>
      </footer>
    </>
  );
}
