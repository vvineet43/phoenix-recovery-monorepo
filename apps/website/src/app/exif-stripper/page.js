import Link from 'next/link';

export const metadata = {
  title: 'EXIF Metadata Stripper — Remove GPS & Camera Data from Photos | TheNexTools',
  description: 'See the hidden data embedded in your photos — GPS location, device model, timestamps — and strip all of it before sharing. Runs locally in your browser.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/exif-stripper',
  },
};

export default function ExifStripperLanding() {
  return (
    <>

      <header className="hero container">
        <div className="badge">NexStrip — Free &amp; Private</div>
        <h1>Your photos know where you live. Seriously.</h1>
        <p>
          Every photo from your phone has GPS coordinates baked into the file — accurate to a few meters. It also has your device model, the exact time you took the shot, and sometimes your name. Most people have no idea this data is there. NexStrip shows you everything, then strips it out before you share the photo with anyone.
        </p>
        <div className="hero-actions">
          <Link href="/image-tools?tool=exif" className="btn btn-primary">Open EXIF Stripper</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What&apos;s actually hiding in your photos</h2>
            <p>EXIF metadata was designed for camera manufacturers, not for social media. Here&apos;s what gets embedded by default.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>GPS coordinates</h3>
              <p>If location services were on when you took the photo (and on most phones, they are by default), the file contains exact latitude and longitude. Posting a photo of your living room? You just posted your home address to anyone who knows how to right-click and check file properties.</p>
            </div>
            <div className="feature-card">
              <h3>Device fingerprint</h3>
              <p>Camera make, model, serial number, software version, lens data — all of it is stored in the image file. In legal or investigative contexts, this can directly link a photo to a specific device and person. Most people sharing vacation photos don&apos;t realize they&apos;re also sharing their phone&apos;s identity.</p>
            </div>
            <div className="feature-card">
              <h3>Timestamps and capture settings</h3>
              <p>The original capture time, any editing timestamps, ISO, shutter speed, aperture — it&apos;s all there. If you&apos;d rather not broadcast exactly when and how you took every photo, stripping this is basic digital hygiene.</p>
            </div>
            <div className="feature-card">
              <h3>Everything processed locally</h3>
              <p>NexStrip reads and removes metadata entirely inside your browser. No server involved. Batch-process a whole folder and download clean copies individually or as a ZIP. After the first page load, it even works offline.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Check what&apos;s in your photos before someone else does.</h2>
          <p>Drop in any image. NexStrip shows every metadata field, then removes it with one click.</p>
          <Link href="/image-tools?tool=exif" className="btn btn-primary">Open NexStrip</Link>
        </div>
      </section>

    </>
  );
}
