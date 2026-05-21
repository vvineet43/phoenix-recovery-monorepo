import Link from 'next/link';

export const metadata = {
  title: 'NexData Recovery — Recover Deleted Files from Formatted Drives | TheNexTools',
  description: 'Recover deleted files, photos, and videos from formatted drives and corrupted SD cards. NexData scans raw disk sectors to find what the OS considers gone. Free to scan.',
  alternates: {
    canonical: '/data-recovery',
  },
};

export default function DataRecoveryLanding() {
  return (
    <>

      <header className="hero container">
        <div className="badge">NexData Recovery</div>
        <h1>What looks permanently deleted usually isn&apos;t.</h1>
        <p>
          When a drive gets formatted or a partition vanishes, the files don&apos;t disappear — the file system just forgets where they are. NexData reads the raw sectors directly, reconstructs what&apos;s still there, and lets you pull it back. Scan for free. Preview everything. Recover what matters.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary">Get Started For Free</a>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How NexData finds what other tools miss</h2>
            <p>Most recovery tools rely on the file system. When that&apos;s gone — formatted, corrupted, or just missing — they have nothing to work with. NexData doesn&apos;t need it.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Raw sector scanning</h3>
              <p>Instead of asking the file system what&apos;s on the disk, NexData reads the physical sectors directly. It recognizes file types by their binary headers — JPEG, MP4, PDF, DOCX — and reconstructs them regardless of what the partition table says. This is how recovery works on drives that won&apos;t even mount.</p>
            </div>
            <div className="feature-card">
              <h3>Video repair for corrupted footage</h3>
              <p>Video files recovered from fragmented drives are almost always unplayable — the container headers get mangled during the recovery process. NexData&apos;s repair module takes a working reference clip from the same camera and uses it to rebuild corrupted headers, making the footage watchable again.</p>
            </div>
            <div className="feature-card">
              <h3>Encrypted volume support</h3>
              <p>BitLocker, FileVault, APFS encryption — these aren&apos;t roadblocks as long as you have the recovery key. NexData can unlock the volume and run a full sector scan underneath the encryption layer, recovering files that were deleted before the drive was encrypted.</p>
            </div>
            <div className="feature-card">
              <h3>Completely offline</h3>
              <p>NexData doesn&apos;t call home. Ever. The scan results, file previews, and recovered files stay entirely on your machine. Nothing is transmitted, logged, or reported. If you&apos;re recovering sensitive documents — legal files, medical records, personal photos — this is the baseline you should expect.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="divider" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Download &amp; Pricing</h2>
            <p>Scan any drive and preview every recoverable file for free. Upgrade only when you need to actually pull files off the disk.</p>
          </div>
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '2rem' }}>
            <div className="feature-card" style={{ border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-2)' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Free Version</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0', color: 'var(--text)' }}>
                $0 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ forever</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Unlimited raw sector scanning</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Preview every recoverable file and video</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Recover 1 file (up to 10MB)</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Save and resume scan sessions</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>✗</span> Unlimited file recovery</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>✗</span> Video and photo repair</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="/downloads/NexData_Pro_Trial.dmg" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Mac (.dmg)</a>
                <a href="/downloads/NexData_Pro_Trial.exe" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Windows (.exe)</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>Install free. Scan your drive. Verify the files are intact before you spend anything.</p>
            </div>
            
            <div className="feature-card popular-card">
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'var(--primary)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(var(--primary), 0.3)' }}>POPULAR</div>
              <h3 style={{ fontSize: '1.4rem' }}>NexData Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0', color: 'var(--primary)' }}>
                $49.99 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ one-time</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>Unlimited file recovery</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>No file size limits</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Corrupted video and photo repair</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> APFS, HFS+, NTFS, FAT32 support</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Commercial use license</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> Free lifetime updates</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="https://store.thenextools.com/checkout/buy/dc65d7a1-8030-4e2c-9b29-328989852cd5" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Buy Pro License</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>License key delivered instantly via email. <a href="/refund-policy" style={{ color: 'var(--primary)' }}>10-day refund policy</a>.</p>
            </div>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '2.5rem', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>ℹ️</span> Installation note
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              We&apos;re an indie developer, so the initial builds aren&apos;t signed with Apple or Microsoft certificates yet. Your OS will show a standard security prompt — here&apos;s how to get past it:
            </p>
            
            <div className="grid-2" style={{ gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🍏 macOS</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Drag the app to <strong>Applications</strong>.</li>
                  <li>Open <strong>Terminal</strong>.</li>
                  <li>Paste this and press Enter:
                    <code style={{ background: '#080c14', padding: '0.6rem', borderRadius: '6px', display: 'block', marginTop: '0.5rem', color: '#32d74b', userSelect: 'all', border: '1px solid #333' }}>xattr -cr "/Applications/NexData Recovery.app"</code>
                  </li>
                  <li>Double-click the app to launch it.</li>
                </ol>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🪟 Windows</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Run the downloaded <strong>.exe</strong> file.</li>
                  <li>If you see a blue <em>&quot;Windows protected your PC&quot;</em> prompt — that&apos;s normal for unsigned indie software.</li>
                  <li>Click <strong>&quot;More info&quot;</strong>.</li>
                  <li>Click <strong>&quot;Run anyway&quot;</strong>.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What NexData can&apos;t recover</h2>
            <p>No recovery tool can work miracles. Here&apos;s what to know upfront.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Overwritten data</h3>
              <p>Once new data is written to the same physical sectors, the original content is destroyed at the hardware level. No software — ours included — can undo that. This is why you should stop writing to the drive the moment you realize files are missing.</p>
            </div>
            <div className="feature-card">
              <h3>Physically damaged drives</h3>
              <p>If a drive has suffered mechanical failure — head crash, water damage, burned circuitry — software can&apos;t access the platters or chips. That requires a cleanroom and professional data recovery, which is a different service entirely.</p>
            </div>
            <div className="feature-card">
              <h3>SSD blocks after TRIM</h3>
              <p>Modern SSDs with TRIM enabled will erase deleted blocks in the background, usually within minutes. Once the controller zeroes a block, that data is physically gone. TRIM is on by default for most SSDs, which is why HDD recovery success rates are typically higher.</p>
            </div>
            <div className="feature-card">
              <h3>Encrypted volumes without the key</h3>
              <p>If a drive was encrypted with BitLocker, FileVault, or APFS encryption and you&apos;ve lost the password and recovery key, the data can&apos;t be decrypted. No software can brute-force modern encryption in any reasonable timeframe.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            These scenarios fall outside our <a href="/refund-policy" style={{ color: 'var(--primary)' }}>refund policy</a>. We recommend scanning with the free version first to confirm your files are actually recoverable.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2>Scan first. See what&apos;s there. Decide later.</h2>
          <p>The free version does a full scan and lets you preview every recoverable file — so you know exactly what you&apos;re getting before you pay.</p>
          <a href="#pricing" className="btn btn-primary">Download Free Version</a>
        </div>
      </section>

    </>
  );
}
