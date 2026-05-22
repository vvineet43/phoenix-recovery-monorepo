import Link from 'next/link';
import { ShieldCheck, HardDrive, Cpu, Layers, Info, Check, HelpCircle, Terminal, Play, Download } from 'lucide-react';

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

      <header className="hero container" style={{ position: 'relative', overflow: 'visible' }}>
        {/* Glow decoration */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none' }} />

        <div className="badge" style={{ background: 'rgba(139,92,246,0.1)', color: '#c084fc', borderColor: 'rgba(139,92,246,0.2)' }}>
          <HardDrive size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> NexData Recovery
        </div>
        
        <h1 style={{ lineHeight: 1.2 }}>
          What looks permanently <br />
          <span className="gradient-text">deleted usually isn&apos;t.</span>
        </h1>
        <p style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          When a drive gets formatted or a partition vanishes, the files don&apos;t disappear — the file system just forgets where they are. NexData reads the raw sectors directly, reconstructs what&apos;s still there, and lets you pull it back. Scan for free. Preview everything. Recover what matters.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary">Get Started For Free</a>
          <a href="#pipeline" className="btn btn-outline">How Recovery Works</a>
        </div>
      </header>

      {/* Pipeline / How it works */}
      <section id="pipeline" style={{ borderTop: '1px solid var(--border)', padding: '5rem 0 3rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>The Offline Recovery Pipeline</h2>
            <p>How NexData reconstructs lost files directly on your machine without cloud dependency.</p>
          </div>
          <div className="grid-3" style={{ gap: '2.5rem' }}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '2.5rem 2rem 2rem 2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)', color: 'white', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', border: '4px solid var(--bg)', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>1</div>
              <div style={{ color: '#a78bfa', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HardDrive size={18} />
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Sector Scan</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>Reads every physical block of disk space directly, bypassing the OS file system layer to discover orphaned data.</p>
            </div>
            
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '2.5rem 2rem 2rem 2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)', color: 'white', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', border: '4px solid var(--bg)', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>2</div>
              <div style={{ color: '#a78bfa', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={18} />
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Deep Carving</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>AI-driven heuristics parse binary signatures (headers/footers) to reconstruct file boundaries without folder tables.</p>
            </div>

            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '2.5rem 2rem 2rem 2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)', color: 'white', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', border: '4px solid var(--bg)', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>3</div>
              <div style={{ color: '#a78bfa', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={18} />
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Local Write</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>Reassembles raw fragments locally, verifying file integrity and extracting files securely to a healthy drive.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>How NexData finds what other tools miss</h2>
            <p>Most recovery tools rely on the file system. When that&apos;s gone — formatted, corrupted, or just missing — they have nothing to work with. NexData doesn&apos;t need it.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Raw sector scanning</h3>
              <p>Instead of asking the file system what&apos;s on the disk, NexData reads the physical sectors directly. It recognizes file types by their binary headers — JPEG, MP4, PDF, DOCX — and reconstructs them regardless of what the partition table says. This is how recovery works on drives that won&apos;t even mount.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Video repair for corrupted footage</h3>
              <p>Video files recovered from fragmented drives are almost always unplayable — the container headers get mangled during the recovery process. NexData&apos;s repair module takes a working reference clip from the same camera and uses it to rebuild corrupted headers, making the footage watchable again.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Encrypted volume support</h3>
              <p>BitLocker, FileVault, APFS encryption — these aren&apos;t roadblocks as long as you have the recovery key. NexData can unlock the volume and run a full sector scan underneath the encryption layer, recovering files that were deleted before the drive was encrypted.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Completely offline</h3>
              <p>NexData doesn&apos;t call home. Ever. The scan results, file previews, and recovered files stay entirely on your machine. Nothing is transmitted, logged, or reported. If you&apos;re recovering sensitive documents — legal files, medical records, personal photos — this is the baseline you should expect.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="divider" style={{ padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Download &amp; Pricing</h2>
            <p>Scan any drive and preview every recoverable file for free. Upgrade only when you need to actually pull files off the disk.</p>
          </div>
          
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '2.5rem', alignItems: 'stretch' }}>
            
            {/* Free Card */}
            <div className="feature-card" style={{ border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.01)', padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Free Version</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0 1.5rem 0', color: 'var(--text)' }}>
                $0 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ forever</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#a78bfa', marginTop: '2px', flexShrink: 0 }} /> Unlimited raw sector scanning</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#a78bfa', marginTop: '2px', flexShrink: 0 }} /> Preview every recoverable file and video</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#a78bfa', marginTop: '2px', flexShrink: 0 }} /> Recover 1 file (up to 10MB)</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#a78bfa', marginTop: '2px', flexShrink: 0 }} /> Save and resume scan sessions</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}><span style={{ color: '#ff5f56', paddingLeft: '2px', marginRight: '6px' }}>✗</span> Unlimited file recovery</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}><span style={{ color: '#ff5f56', paddingLeft: '2px', marginRight: '6px' }}>✗</span> Video and photo repair</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <a href="/downloads/NexData_Pro_Trial.dmg" download className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Mac (.dmg)</a>
                <a href="/downloads/NexData_Pro_Trial.exe" download className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>Windows (.exe)</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1.25rem', marginBottom: 0 }}>Install free. Scan your drive. Verify files before recovery.</p>
            </div>
            
            {/* Pro Card */}
            <div className="feature-card popular-card" style={{ 
              border: '2px solid #8b5cf6', 
              background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(124,58,237,0.05) 100%)',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.15)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>POPULAR</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>NexData Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '1rem 0 1.5rem 0', color: '#c084fc' }}>
                $49.99 <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ one-time</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> <strong>Unlimited file recovery</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> <strong>No file size limits</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> Corrupted video and photo repair</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> APFS, HFS+, NTFS, FAT32 support</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> Commercial use license</li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.95rem' }}><Check size={16} style={{ color: '#c084fc', marginTop: '2px', flexShrink: 0 }} /> Free lifetime updates</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="https://store.thenextools.com/checkout/buy/dc65d7a1-8030-4e2c-9b29-328989852cd5" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.95rem', padding: '0.8rem' }}>Buy Pro License</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1.25rem', marginBottom: 0 }}>License delivered instantly. <a href="/refund-policy" style={{ color: '#a78bfa' }}>10-day refund policy</a>.</p>
            </div>
          </div>
          
          {/* Installation note */}
          <div style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '2.5rem', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
              <Info size={20} style={{ color: '#a78bfa' }} /> Installation security note
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              We&apos;re an independent developer, so the initial builds aren&apos;t code-signed with Apple or Microsoft certificates yet. Your OS will show a standard safety prompt. Here is how to bypass it:
            </p>
            
            <div className="grid-2" style={{ gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>🍏 macOS Setup</h4>
                <ol style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li>Drag the application to <strong>Applications</strong>.</li>
                  <li>Launch <strong>Terminal</strong> (cmd + space, type terminal).</li>
                  <li>Copy and run this command:
                    <div style={{ background: '#090e1a', border: '1px solid var(--border)', borderRadius: '8px', marginTop: '0.75rem', overflow: 'hidden' }}>
                      <div style={{ background: '#0e1526', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></span>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginLeft: '0.5rem' }}>zsh - Terminal</span>
                      </div>
                      <div style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.825rem', color: '#a78bfa', overflowX: 'auto', userSelect: 'all' }}>
                        xattr -cr "/Applications/NexData Recovery.app"
                      </div>
                    </div>
                  </li>
                  <li>Double-click the app icon to launch.</li>
                </ol>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>🪟 Windows Setup</h4>
                <ol style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li>Run the downloaded <strong>.exe</strong> installer.</li>
                  <li>If you see a blue <em>&quot;Windows protected your PC&quot;</em> filter, click the <strong>&quot;More info&quot;</strong> link.</li>
                  <li>Click the <strong>&quot;Run anyway&quot;</strong> button that appears.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What NexData can&apos;t recover</h2>
            <p>No recovery tool can work miracles. Here&apos;s what to know upfront.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Overwritten data</h3>
              <p>Once new data is written to the same physical sectors, the original content is destroyed at the hardware level. No software — ours included — can undo that. This is why you should stop writing to the drive the moment you realize files are missing.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Physically damaged drives</h3>
              <p>If a drive has suffered mechanical failure — head crash, water damage, burned circuitry — software can&apos;t access the platters or chips. That requires a cleanroom and professional data recovery, which is a different service entirely.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>SSD blocks after TRIM</h3>
              <p>Modern SSDs with TRIM enabled will erase deleted blocks in the background, usually within minutes. Once the controller zeroes a block, that data is physically gone. TRIM is on by default for most SSDs, which is why HDD recovery success rates are typically higher.</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', transition: 'all 0.3s ease' }}>
              <h3>Encrypted volumes without the key</h3>
              <p>If a drive was encrypted with BitLocker, FileVault, or APFS encryption and you&apos;ve lost the password and recovery key, the data can&apos;t be decrypted. No software can brute-force modern encryption in any reasonable timeframe.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            These scenarios fall outside our <a href="/refund-policy" style={{ color: '#a78bfa' }}>refund policy</a>. We recommend scanning with the free version first to confirm your files are actually recoverable.
          </p>
        </div>
      </section>

      <section className="cta-section" style={{ borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Scan first. See what&apos;s there. Decide later.</h2>
          <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>The free version does a full scan and lets you preview every recoverable file — so you know exactly what you&apos;re getting before you pay.</p>
          <a href="#pricing" className="btn btn-primary">Download Free Version</a>
        </div>
      </section>

    </>
  );
}
