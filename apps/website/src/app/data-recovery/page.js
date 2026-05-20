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
          <a href="#pricing" className="btn btn-primary">Get Started For Free</a>
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

      <section id="pricing" className="divider" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Download & Pricing</h2>
            <p>Scan your drive and preview recoverable files completely free. Upgrade only when you need full recovery.</p>
          </div>
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '2rem' }}>
            <div className="feature-card" style={{ border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-2)' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Free Version</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0', color: 'var(--text)' }}>
                $0 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ forever</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Unlimited Raw Sector Scanning</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Preview Recoverable Files & Videos</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Recover 1 File (up to 10MB limit)</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Save Scan Sessions</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>✗</span> Unlimited File Recoveries</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>✗</span> Corrupted Video & Photo Repair</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="/downloads/NexData_Pro_Trial.dmg" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Mac (.dmg)</a>
                <a href="/downloads/NexData_Pro_Trial.exe" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Windows (.exe)</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>Install free to scan and verify your data is fully intact before upgrading.</p>
            </div>
            
            <div className="feature-card" style={{ border: '3px solid var(--primary)', position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--bg)', transform: 'scale(1.05)' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'var(--primary)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(var(--primary), 0.3)' }}>POPULAR</div>
              <h3 style={{ fontSize: '1.4rem' }}>NexData Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0', color: 'var(--primary)' }}>
                $49.99 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ one-time purchase</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>Unlimited File Recovery</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>No File Size Limits</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Corrupted Video & Photo Repair</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> APFS, HFS+, NTFS, FAT32 Support</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Commercial Use License</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Free Lifetime Updates</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="https://store.thenextools.com/checkout/buy/dc65d7a1-8030-4e2c-9b29-328989852cd5" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Buy Pro License</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>Instant license key via email. <a href="/refund-policy" style={{ color: 'var(--primary)' }}>10-day refund policy</a>.</p>
            </div>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '2.5rem', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>ℹ️</span> Installation Instructions
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              As an independent developer, our initial launch binaries are not yet cryptographically signed by Apple or Microsoft. You may see a standard security warning when installing. Here is how to open the app safely:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🍏 macOS Users</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Drag the app to your <strong>Applications</strong> folder.</li>
                  <li>Open the <strong>Terminal</strong> app on your Mac.</li>
                  <li>Paste this command and press Enter to clear the quarantine flag:
                    <code style={{ background: '#080c14', padding: '0.6rem', borderRadius: '6px', display: 'block', marginTop: '0.5rem', color: '#32d74b', userSelect: 'all', border: '1px solid #333' }}>xattr -cr "/Applications/NexData Recovery.app"</code>
                  </li>
                  <li>Double-click the app to open it!</li>
                </ol>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🪟 Windows Users</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Double click the downloaded <strong>.exe</strong> file.</li>
                  <li>If you see a blue <em>"Windows protected your PC"</em> popup, do not worry. This is standard for indie software.</li>
                  <li>Click on the <strong>"More info"</strong> link text.</li>
                  <li>Click the <strong>"Run anyway"</strong> button that appears at the bottom.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What NexData Cannot Recover</h2>
            <p>No recovery tool can work miracles. Here&apos;s what to know before you buy.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Overwritten data</h3>
              <p>When new files are written to the same disk sectors, the original data is permanently destroyed. No software can reverse this — it is a physical limitation of how storage media works.</p>
            </div>
            <div className="feature-card">
              <h3>Physically damaged drives</h3>
              <p>If a drive has suffered physical damage (head crash, water damage, burned circuits), software cannot access the media. This requires professional cleanroom data recovery services.</p>
            </div>
            <div className="feature-card">
              <h3>SSD TRIM&apos;d blocks</h3>
              <p>Modern SSDs with TRIM enabled permanently erase deleted blocks at the hardware level. Once the SSD controller has zeroed a block, the data is physically gone and cannot be recovered by any tool.</p>
            </div>
            <div className="feature-card">
              <h3>Encrypted volumes without the key</h3>
              <p>If a drive was encrypted with BitLocker, FileVault, or APFS encryption and the password or recovery key has been lost, the data cannot be decrypted or recovered.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            These limitations are excluded from our <a href="/refund-policy" style={{ color: 'var(--primary)' }}>refund policy</a>. We recommend scanning with the free version first to verify recoverability.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2>Scan first. Recover what matters.</h2>
          <p>The free version lets you scan any drive and preview every recoverable file — so you know exactly what&apos;s there before spending a cent.</p>
          <a href="#pricing" className="btn btn-primary">Download Free Version</a>
        </div>
      </section>

    </>
  );
}
