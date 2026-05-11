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
          <Link href="/" className="brand">TheNexTools</Link>
          <div className="nav-links">
            <Link href="/" className="link nav-hide-mobile">All Tools</Link>
            <a href="#features" className="link nav-hide-mobile">How It Works</a>
            <a href="#download" className="btn btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.83rem' }}>
              Download Free Trial
            </a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">Phoenix Data Recovery</div>
        <h1>What looks permanently deleted often isn&apos;t.</h1>
        <p>
          When a drive is formatted or a partition disappears, the files are usually still there — the file system just stops pointing to them. Phoenix reads the raw data directly, rebuilds the picture of what&apos;s recoverable, and puts you back in control.
        </p>
        <div className="hero-actions">
          <a href="#download" className="btn btn-primary">Download and Scan for Free</a>
          <Link href="/" className="btn btn-outline">All Tools</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How Phoenix recovers what other tools miss</h2>
            <p>Standard recovery tools read the file system. When that&apos;s gone, they stop. Phoenix doesn&apos;t.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Raw sector scanning</h3>
              <p>Phoenix bypasses the file system entirely and reads the physical sectors of the disk. It identifies file types by their binary signatures and reconstructs what&apos;s there regardless of what the partition table says.</p>
            </div>
            <div className="feature-card">
              <h3>Video file repair</h3>
              <p>Video files recovered from fragmented drives are frequently unplayable. Phoenix&apos;s repair module rebuilds corrupted headers using a reference sample, making recovered footage watchable again.</p>
            </div>
            <div className="feature-card">
              <h3>Encrypted volume support</h3>
              <p>BitLocker, FileVault, and APFS encryption aren&apos;t obstacles. If you have the original recovery key, Phoenix can unlock the volume and run a full sector scan underneath the encryption layer.</p>
            </div>
            <div className="feature-card">
              <h3>Completely offline operation</h3>
              <p>Phoenix is designed to run with no internet connection. Scan results, recovered file previews, and the files themselves never leave your machine. Nothing is logged to a remote server at any point in the process.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>The sooner you scan, the better your chances.</h2>
          <p>Every write operation to a drive risks overwriting recoverable data. Download Phoenix, run a free scan, and see exactly what&apos;s still there.</p>
          <a href="#download" className="btn btn-primary">Download Phoenix — Mac &amp; Windows</a>
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
