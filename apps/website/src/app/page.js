import { 
  HardDrive, MonitorStop, ShieldCheck, Download, 
  Video, CopyMinus, Box
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <Box size={22} color="var(--primary)" /> LifeTools
          </Link>
          <div className="nav-links">
            <a href="#products" className="link">Products</a>
            <a href="#pricing" className="link">Pricing</a>
            <a href="#download" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <h1>Reliable software for when life happens.</h1>
        <p>A minimalist suite of essential desktop tools to rescue lost data, compress sprawling media, and manage your files securely offline.</p>
        
        <div className="hero-actions">
          <a href="#download" className="btn btn-primary">
            Download Phoenix Recovery
          </a>
          <a href="#suite" className="btn btn-ghost">
            View All Apps <span style={{ marginLeft: 4 }}>&rarr;</span>
          </a>
        </div>

        <div className="mockup-wrapper">
          <Image 
            src="/phoenix-utility.png" 
            alt="LifeTools App Interface" 
            width={1200}
            height={700}
            priority
          />
        </div>
      </header>

      <section id="products" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Phoenix Recovery</h2>
            <p>Our flagship recovery engine. Instantly recover and repair deleted files natively on your device. Complete privacy with zero cloud processing.</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <HardDrive size={20} />
              </div>
              <h3>Deep Sector Scans</h3>
              <p>Bypasses corrupt file systems to parse raw disk bits, recovering files that standard tools can&apos;t even recognize.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <MonitorStop size={20} />
              </div>
              <h3>Media Repair Engine</h3>
              <p>Integrated automated workflows to reconstruct the headers and bitstreams of corrupted video and audio files.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck size={20} />
              </div>
              <h3>100% Offline</h3>
              <p>We believe data recovery should be private. LifeTools applications function completely devoid of internet telemetry.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="suite" className="suite-section">
        <div className="container">
          <div className="section-header">
            <h2>The LifeTools Suite</h2>
            <p>We are building a highly curated bundle of essential utility apps designed with focus and simplicity. One subscription, access to everything.</p>
          </div>

          <div className="app-list">
            <div className="app-item">
              <div className="app-item-icon">
                <HardDrive size={24} />
              </div>
              <div className="app-item-content">
                <h4>Phoenix Recovery <span className="badge">Available Now</span></h4>
                <p>Recover lost files, photos, and videos from corrupted drives and SD cards.</p>
              </div>
            </div>
            
            <div className="app-item">
              <div className="app-item-icon">
                <Video size={24} />
              </div>
              <div className="app-item-content">
                <h4>Media Compressor <span className="badge" style={{ background: 'transparent', border: '1px solid var(--border-color)'}}>Coming Soon</span></h4>
                <p>Locally compress massive 4K files for email or sharing with completely lossless-looking algorithms.</p>
              </div>
            </div>

            <div className="app-item">
              <div className="app-item-icon">
                <CopyMinus size={24} />
              </div>
              <div className="app-item-content">
                <h4>Duplicate Hunter <span className="badge" style={{ background: 'transparent', border: '1px solid var(--border-color)'}}>In Development</span></h4>
                <p>Identify identical and visually similar photos scattered across your system to securely reclaim disk space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to rescue your files?</h2>
          <p>Scan your device for free to see exactly what is recoverable. Upgrade only when you decide to save your data.</p>
          <a href="#download" className="btn btn-primary">
            <Download size={18} /> Download Trial
          </a>
        </div>
      </section>

      <footer>
        <div className="container">
          &copy; {new Date().getFullYear()} LifeTools. Crafted with care. All rights reserved.
        </div>
      </footer>
    </>
  );
}
