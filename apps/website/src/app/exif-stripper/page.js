import Link from 'next/link';

export const metadata = {
  title: 'EXIF Metadata Stripper — Remove GPS & Camera Data | TheNexTools',
  description: 'Strip GPS coordinates, camera model, timestamps, and all hidden EXIF metadata from your photos before sharing. Runs locally — nothing is uploaded.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/exif-stripper',
  },
};

export default function ExifStripperLanding() {
  return (
    <>
      <nav className="site-nav">
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          <div className="nav-links">
            <Link href="/" className="link nav-hide-mobile">All Tools</Link>
            <a href="#features" className="link nav-hide-mobile">Why It Matters</a>
            <Link href="/exif-tools" className="btn btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.83rem' }}>
              Strip Metadata
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">NexStrip — Free &amp; Private</div>
        <h1>Your photos carry more information than you think.</h1>
        <p>
          Every photo taken on a smartphone embeds GPS coordinates, the exact timestamp, your device model, and sometimes your name. NexStrip reads that data, shows you exactly what&apos;s there, then removes it — without touching a server.
        </p>
        <div className="hero-actions">
          <Link href="/exif-tools" className="btn btn-primary">Open in Browser</Link>
          <Link href="/exif-tools" className="btn btn-outline">Install App</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What gets stripped — and why it matters</h2>
            <p>Metadata was designed for camera manufacturers. It was never designed for public photo sharing.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>GPS &amp; Location data</h3>
              <p>If location services were on when the photo was taken, the file contains the exact latitude and longitude — accurate to a few meters. Sharing a photo of your home or office exposes that data to anyone who checks the file properties.</p>
            </div>
            <div className="feature-card">
              <h3>Device &amp; camera fingerprint</h3>
              <p>Camera make, model, software version, and lens data are stored in every image. In legal and journalistic contexts, this information can be used to link photos to a specific person or device.</p>
            </div>
            <div className="feature-card">
              <h3>Timestamps and shooting data</h3>
              <p>The original capture time, editing timestamps, and exposure details are embedded by default. For anyone who wants to keep their schedule private, stripping this is straightforward hygiene.</p>
            </div>
            <div className="feature-card">
              <h3>Everything stays local</h3>
              <p>NexStrip reads and strips metadata entirely inside your browser using canvas APIs. Your images are never sent anywhere. Batch-process an entire folder and download clean copies individually or as a ZIP — all offline after first load.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>See what&apos;s in your files before you share them.</h2>
          <p>Drop in any image and NexStrip will show you exactly what metadata is embedded — then remove it.</p>
          <Link href="/exif-tools" className="btn btn-primary">Open NexStrip</Link>
        </div>
      </section>

    </>
  );
}
