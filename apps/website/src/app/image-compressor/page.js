import Link from 'next/link';

export const metadata = {
  title: 'Image Compressor — Local JPG, PNG, WebP | TheNexTools',
  description: 'Compress images locally in your browser. No uploads. Adjust quality, choose output format, compare before and after, and download compressed files instantly.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/image-compressor',
  },
};

export default function ImageCompressorLanding() {
  return (
    <>
      

      <header className="hero container">
        <div className="badge">NexCompress — Local &amp; Private</div>
        <h1>Compress images without uploading them to a server.</h1>
        <p>
          Most image compression tools send your files to a remote server, process them there, and hand them back. NexCompress does the same work inside your browser tab — faster, private, and with no file size limits imposed by someone else&apos;s infrastructure.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools" className="btn btn-primary">Open in Browser</Link>
          <Link href="/image-tools" className="btn btn-outline">Install App</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Built for real compression workflows</h2>
            <p>Batch processing, format conversion, side-by-side comparison — the things that actually matter when compressing images at volume.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>JPEG, PNG, and WebP output</h3>
              <p>Convert between formats as part of the compression step. PNG files with transparency stay lossless. JPEG and WebP quality is adjustable from 10% to 100% with a slider — the estimated output size updates as you move it.</p>
            </div>
            <div className="feature-card">
              <h3>Side-by-side comparison</h3>
              <p>Every processed image has a compare view that shows the original and compressed version at full width. It makes the quality trade-off visible before committing to a download.</p>
            </div>
            <div className="feature-card">
              <h3>Batch processing with totals</h3>
              <p>Drop in an entire folder of images at once. NexCompress processes them in sequence and shows a running total of space saved across all files. Download them individually or grab the whole batch as a ZIP.</p>
            </div>
            <div className="feature-card">
              <h3>No upload, no account, no limit</h3>
              <p>Web-based compressors typically cap file sizes at 5–10MB and require sign-up for anything larger. NexCompress runs entirely on your device — the only practical limit is your browser&apos;s available memory.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Drop in your images and see the difference.</h2>
          <p>Works on Mac, Windows, and Linux in any modern browser.</p>
          <Link href="/image-tools" className="btn btn-primary">Open NexCompress</Link>
        </div>
      </section>

    </>
  );
}
