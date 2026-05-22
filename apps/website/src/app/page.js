import Link from 'next/link';
import { ShieldCheck, HardDrive, FileText, Image, Lock, Zap, FileCode } from 'lucide-react';

export const metadata = {
  title: 'TheNexTools — Private, Offline Desktop Utilities',
  description: 'Professional tools that run on your device. PDF editing, image compression, metadata stripping, and data recovery — no uploads, no accounts, no subscriptions.',
};

export default function Home() {
  return (
    <>

      <header className="hero container" style={{ position: 'relative', overflow: 'visible' }}>
        {/* Glow decoration */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none' }} />

        <div className="badge" style={{ background: 'rgba(139,92,246,0.1)', color: '#c084fc', borderColor: 'rgba(139,92,246,0.2)' }}>
          <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Professional Desktop Software
        </div>
        
        <h1 style={{ lineHeight: 1.2 }}>
          Tools that work where the <br />
          <span className="gradient-text">internet can&apos;t reach them.</span>
        </h1>
        <p style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          A small, focused collection of utilities built around one idea: your files shouldn&apos;t have to leave your machine just to get something done. PDF editing, image work, metadata cleanup, data recovery — all of it runs locally.
        </p>
        <div className="hero-actions">
          <a href="#tools" className="btn btn-primary">See What&apos;s Available</a>
          <a href="#why" className="btn btn-outline">Why Local Only?</a>
        </div>
      </header>

      {/* Why offline */}
      <section id="why" className="divider" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Built for people who handle sensitive files</h2>
            <p>Most tools upload your data to a server. That&apos;s a bad default.</p>
          </div>
          <div className="grid-3">
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.6rem', borderRadius: '8px', width: 'fit-content', marginBottom: '1.25rem' }}>
                <Lock size={20} />
              </div>
              <h3>Your files stay on your machine</h3>
              <p>Legal briefs, financial records, client photos, medical documents — none of that should pass through a third-party server just to merge two PDFs. Every tool here processes files using your own hardware. No telemetry, no cloud sync, no account needed.</p>
            </div>
            
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.6rem', borderRadius: '8px', width: 'fit-content', marginBottom: '1.25rem' }}>
                <Zap size={20} />
              </div>
              <h3>Pay once, own it</h3>
              <p>Subscriptions for basic utilities don&apos;t make sense. The core tools are free and always will be. When you need something deeper — like recovering files from a dead drive — that&apos;s a one-time purchase. No renewals, no expiry.</p>
            </div>

            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.6rem', borderRadius: '8px', width: 'fit-content', marginBottom: '1.25rem' }}>
                <HardDrive size={20} />
              </div>
              <h3>Speed that matches your hardware</h3>
              <p>Web tools are bottlenecked by your upload speed and some shared server queue. Here, a 500MB PDF compresses in seconds because it&apos;s using your CPU directly. The ceiling is your machine, not someone else&apos;s infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools">
        <div className="container">
          <div className="section-header">
            <h2>The current lineup</h2>
            <p>Three toolkits, all offline-capable, all free to start with — each built around keeping your files on your machine.</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                  <HardDrive size={18} />
                </div>
                <h3 style={{ margin: 0 }}>NexData Recovery</h3>
              </div>
              <p>Finds and recovers deleted files by reading raw disk sectors — bypassing the file system entirely. Works on formatted drives, corrupted partitions, and SD cards that won&apos;t mount.</p>
              <ul>
                <li>Scans past deleted partitions and format events</li>
                <li>Repairs corrupted MP4 and MOV video files</li>
                <li>Scan free, pay only when you actually recover</li>
              </ul>
              <Link href="/data-recovery" className="btn btn-outline" style={{ width: 'fit-content', marginTop: 'auto' }}>
                Learn more &rarr;
              </Link>
            </div>

            <div className="tool-card" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                  <FileText size={18} />
                </div>
                <h3 style={{ margin: 0 }}>NexPDF Toolkit</h3>
              </div>
              <p>A full-featured PDF editor that runs in your browser. Merge documents, reorder pages, sign contracts, stamp dates, redact sensitive text, and compress heavy scans — without uploading a thing.</p>
              <ul>
                <li>Drag-and-drop page management with annotations</li>
                <li>Handwritten and typed signature support</li>
                <li>Compression with real-time file size preview</li>
              </ul>
              <Link href="/pdf-toolkit" className="btn btn-outline" style={{ width: 'fit-content', marginTop: 'auto' }}>
                Learn more &rarr;
              </Link>
            </div>

            <div className="tool-card" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                  <Image size={18} />
                </div>
                <h3 style={{ margin: 0 }}>NexImage Toolkit</h3>
              </div>
              <p>Four image tools in one workspace — compress, convert formats, blur sensitive areas, and strip hidden EXIF metadata. Everything runs in your browser, nothing gets uploaded.</p>
              <ul>
                <li>Compress JPG, PNG, and WebP with real-time quality preview</li>
                <li>Convert between formats and batch-download as ZIP</li>
                <li>Blur faces and plates, strip GPS and device data from photos</li>
              </ul>
              <Link href="/image-toolkit" className="btn btn-outline" style={{ width: 'fit-content', marginTop: 'auto' }}>
                Learn more &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Built to work offline, built to stay that way.</h2>
          <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>TheNexTools exists because the best version of these utilities shouldn&apos;t need an internet connection or a monthly subscription.</p>
          <a href="#tools" className="btn btn-primary">Explore the Tools</a>
        </div>
      </section>

    </>
  );
}
