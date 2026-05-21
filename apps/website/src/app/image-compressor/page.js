import Link from 'next/link';

export const metadata = {
  title: 'Image Compressor — Shrink JPG, PNG, WebP Locally | TheNexTools',
  description: 'Compress images in your browser without uploading them. Adjust quality, compare before and after at full resolution, and download — individually or as a batch ZIP.',
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
        <h1>Compress images without uploading them anywhere.</h1>
        <p>
          Every other image compressor sends your files to a server, processes them remotely, and sends them back. That&apos;s fine until it isn&apos;t — the file is too large, the queue is slow, or the image is something you&apos;d rather keep private. NexCompress runs the same compression algorithms directly in your browser. Faster, no size limits, and nothing leaves your machine.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=compress" className="btn btn-primary">Open Compressor</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What makes this different from TinyPNG</h2>
            <p>The things that actually matter when you&apos;re compressing images on a regular basis — not just one file at a time through a web form.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Output to JPEG, PNG, or WebP</h3>
              <p>Pick your output format as part of the compression step. PNGs with transparency stay lossless. For JPEG and WebP, drag the quality slider anywhere from 10% to 100% and the estimated file size updates as you move it. You see the trade-off before you commit.</p>
            </div>
            <div className="feature-card">
              <h3>Side-by-side comparison at full resolution</h3>
              <p>Every compressed image gets a compare view — original on the left, compressed on the right, both at full width. You can actually see the quality difference (or lack of it) before downloading anything.</p>
            </div>
            <div className="feature-card">
              <h3>Batch processing with running totals</h3>
              <p>Drop an entire folder in at once. NexCompress works through them sequentially and keeps a running tally of total space saved. Download files one at a time or grab the whole batch as a single ZIP.</p>
            </div>
            <div className="feature-card">
              <h3>No account, no upload, no artificial caps</h3>
              <p>Most web compressors limit you to 5MB per file unless you sign up. Some watermark the output. NexCompress doesn&apos;t do any of that — the only limit is your browser&apos;s available memory, which on any modern machine handles hundreds of megabytes easily.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Try it with one image. You&apos;ll see the difference.</h2>
          <p>Runs in Chrome, Firefox, Safari, and Edge on Mac, Windows, and Linux. Nothing to install.</p>
          <Link href="/image-tools?tool=compress" className="btn btn-primary">Open NexCompress</Link>
        </div>
      </section>

    </>
  );
}
