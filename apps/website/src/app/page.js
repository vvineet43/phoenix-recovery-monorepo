import { 
  HardDrive, MonitorStop, ShieldCheck, Download, 
  Video, CopyMinus, FileText, Blocks
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TheNexTools</span>
          </Link>
          <div className="nav-links">
            <a href="#suite" className="link">Our Tools</a>
            <a href="#about" className="link">Why Offline?</a>
            <a href="#pricing" className="link">Pricing</a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">Professional Desktop Software</div>
        <h1>Tools that work where the internet can't reach them.</h1>
        <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          TheNexTools is a focused collection of desktop utilities for people who handle sensitive files for a living. Recover deleted data, edit PDFs, and process documents — all without a single byte leaving your machine.
        </p>
        
        <div className="hero-actions" style={{ marginTop: '2rem' }}>
          <a href="#suite" className="btn btn-primary">
            See What's Available
          </a>
        </div>
      </header>

      <section id="about" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Built for professionals who can't afford a data breach</h2>
            <p>Most software tools are optimized for convenience, not confidentiality. We made different trade-offs.</p>
          </div>
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <h3>Your files stay on your machine</h3>
              <p>Legal documents, financial records, client photos — none of it should transit a third-party server to get a task done. Every tool in the TheNexTools suite processes files locally using your hardware, with no telemetry, no sync, and no accounts required.</p>
            </div>
            <div>
              <h3>Pay once, own it permanently</h3>
              <p>Monthly subscriptions for basic utilities make no sense. The core tools are free. When you need advanced capabilities — like full file recovery and export — you purchase a one-time license that never expires and never phones home.</p>
            </div>
            <div>
              <h3>Speed that reflects your hardware</h3>
              <p>Web-based tools are throttled by upload bandwidth and shared server queues. Running locally means a 500MB PDF compresses in seconds, not minutes. Your machine's CPU sets the ceiling, not someone else's infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="suite" className="features" style={{ background: 'transparent', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>The current lineup</h2>
            <p>Two flagship applications, built to solve two very specific — and very painful — problems.</p>
          </div>
          
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            
            <div className="feature-card" style={{ padding: '3rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Phoenix Data Recovery</h3>
              <p style={{ fontSize: '1.05rem', flex: 1, marginBottom: '2rem', lineHeight: '1.7' }}>
                For when a drive fails, a card gets formatted, or years of files go missing. Phoenix reads raw disk sectors — bypassing whatever the file system can no longer tell you — and recovers what the OS considers gone. Photos, videos, documents, archives.
              </p>
              <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>Works on dead partitions and formatted volumes</li>
                <li>Repairs unplayable MP4 and MOV video files</li>
                <li>Free to scan, pay only when you recover</li>
              </ul>
              <Link href="/data-recovery" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn about Phoenix &rarr;
              </Link>
            </div>

            <div className="feature-card" style={{ padding: '3rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>NexPDF Toolkit</h3>
              <p style={{ fontSize: '1.05rem', flex: 1, marginBottom: '2rem', lineHeight: '1.7' }}>
                A full-featured PDF editor that runs entirely in your browser — no upload, no account, no watermarks. Merge documents, reorder pages, add signatures, stamp dates, and compress files down to a sendable size. It all happens locally, in your tab.
              </p>
              <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: '2' }}>
                <li>Drag-and-drop page management and annotations</li>
                <li>Handwritten and typed signature support</li>
                <li>Compression with live file size preview</li>
              </ul>
              <Link href="/pdf-toolkit" className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn about NexPDF &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>No accounts. No uploads. No nonsense.</h2>
          <p>TheNexTools exists because the best version of these tools should work offline, owned outright, without conditions.</p>
        </div>
      </section>

      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', marginTop: '4rem', textAlign: 'center' }}>
        <div className="container">
          &copy; {new Date().getFullYear()} TheNexTools. All rights reserved.
        </div>
      </footer>
    </>
  );
}
