import Link from 'next/link';

export const metadata = {
  title: 'Phoenix Data Recovery | TheNexTools',
  description: 'Recover deleted files, photos, and videos from formatted drives and corrupted SD cards. Phoenix reads raw disk sectors to find what the OS considers gone.',
};

export default function DataRecoveryLanding() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TheNexTools</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="link">All Tools</Link>
            <a href="#features" className="link">How It Works</a>
            <a href="#download" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
              Download Free Trial
            </a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">Phoenix Data Recovery</div>
        <h1>What looks permanently deleted often isn&apos;t.</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          When a drive is formatted or a partition disappears, the files are usually still there — the file system just stops pointing to them. Phoenix reads the raw data directly, rebuilds the picture of what&apos;s recoverable, and puts you back in control.
        </p>
        
        <div className="hero-actions" style={{ marginTop: '2rem' }}>
          <a href="#download" className="btn btn-primary">
            Download and Scan for Free
          </a>
        </div>
      </header>

      <section id="features" className="features" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>How Phoenix recovers what other tools miss</h2>
            <p>Standard recovery tools read the file system. When that&apos;s gone, they stop. Phoenix doesn&apos;t.</p>
          </div>
          
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', textAlign: 'left' }}>
            
            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Raw sector scanning</h3>
              <p>Phoenix bypasses the file system entirely and reads the physical sectors of the disk. It identifies file types by their binary signatures — the patterns at the start of every JPEG, PDF, MP4, and hundreds of other formats — and reconstructs what&apos;s there regardless of what the partition table says.</p>
            </div>
            
            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Video file repair</h3>
              <p>Video files recovered from fragmented drives are frequently unplayable. The container is intact but the header that tells media players how to read it is missing or corrupt. Phoenix&apos;s repair module rebuilds those headers using a reference sample, making recovered footage watchable again.</p>
            </div>

            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Encrypted volume support</h3>
              <p>BitLocker, FileVault, and APFS encryption aren&apos;t obstacles. If you have the original recovery key or password, Phoenix can unlock the volume and run a full sector scan underneath the encryption layer. The recovery process is identical to an unencrypted drive.</p>
            </div>

            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Completely offline operation</h3>
              <p>Data recovery involves sensitive content by nature. Phoenix is designed to run with no internet connection. Scan results, recovered file previews, and the files themselves never leave your machine. Nothing is logged to a remote server at any point in the process.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>The sooner you scan, the better your chances.</h2>
          <p>Every write operation to a drive risks overwriting recoverable data. Download Phoenix, run a free scan, and see exactly what&apos;s still there before deciding whether to recover it.</p>
          <a href="#download" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Download Phoenix — Mac &amp; Windows
          </a>
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
