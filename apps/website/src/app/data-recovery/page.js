import Link from 'next/link';

export const metadata = {
  title: 'NexData Recovery | TheNexTools',
  description: 'Recover deleted files, photos, and videos from formatted drives and corrupted SD cards. NexData reads raw disk sectors to find what the OS considers gone.',
  alternates: {
    canonical: '/data-recovery',
  },
};

export default function DataRecoveryLanding() {
  return (
    <>
      

      <header className="hero container">
        <div className="badge">NexData Recovery</div>
        <h1>What looks permanently deleted often isn&apos;t.</h1>
        <p>
          When a drive is formatted or a partition disappears, the files are usually still there — the file system just stops pointing to them. NexData reads the raw data directly, rebuilds the picture of what&apos;s recoverable, and puts you back in control.
        </p>
        <div className="hero-actions">
          <a href="#download" className="btn btn-primary">Download and Scan for Free</a>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How NexData recovers what other tools miss</h2>
            <p>Standard recovery tools read the file system. When that&apos;s gone, they stop. NexData doesn&apos;t.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Raw sector scanning</h3>
              <p>NexData bypasses the file system entirely and reads the physical sectors of the disk. It identifies file types by their binary signatures and reconstructs what&apos;s there regardless of what the partition table says.</p>
            </div>
            <div className="feature-card">
              <h3>Video file repair</h3>
              <p>Video files recovered from fragmented drives are frequently unplayable. NexData&apos;s repair module rebuilds corrupted headers using a reference sample, making recovered footage watchable again.</p>
            </div>
            <div className="feature-card">
              <h3>Encrypted volume support</h3>
              <p>BitLocker, FileVault, and APFS encryption aren&apos;t obstacles. If you have the original recovery key, NexData can unlock the volume and run a full sector scan underneath the encryption layer.</p>
            </div>
            <div className="feature-card">
              <h3>Completely offline operation</h3>
              <p>NexData is designed to run with no internet connection. Scan results, recovered file previews, and the files themselves never leave your machine. Nothing is logged to a remote server at any point in the process.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2>Don&apos;t install recovery software on the drive you are trying to recover.</h2>
          <p>Every write operation to a drive risks overwriting recoverable data. Download NexData, run a free scan, and see exactly what&apos;s still there.</p>
          <a href="#download" className="btn btn-primary">Download NexData — Mac &amp; Windows</a>
        </div>
      </section>

    </>
  );
}
