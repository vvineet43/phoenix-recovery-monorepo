import Link from 'next/link';
import { ImageEditorApp } from '../../components/image-tools/ImageEditorApp';
import { ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Professional Image Editor | TheNexTools',
  description: 'Compress images and strip metadata locally in your browser. All-in-one privacy-focused image toolkit. No uploads, no server, 100% private.',
};

export default function ImageEditorPage() {
  return (
    <main className="pdf-tools-page">
      <ImageEditorApp />
      
      <section className="divider" style={{ borderTop: '1px solid var(--border)', marginTop: '1rem' }}>
        <div className="container">
          <div className="section-header">
            <h2>Professional Image Utilities</h2>
            <p>Direct access to specialized tools for faster, private workflows.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '5rem' }}>
            <Link href="/image-editor/tools/compress-image" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Compress Image</h3>
              <p>Shrink file size without losing quality. Ideal for web optimization.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/strip-exif" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Strip EXIF</h3>
              <p>Remove GPS location, camera fingerprints, and timestamps.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/heic-to-jpg" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>HEIC to JPG</h3>
              <p>Convert iPhone photos to standard formats locally in seconds.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/remove-background" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Remove Background</h3>
              <p>Use local AI to isolate subjects and create transparent PNGs.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/blur-censor" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Blur & Censor</h3>
              <p>Hide faces, text, and sensitive PII before sharing photos.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/resize-image" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Resize & Crop</h3>
              <p>Batch adjust dimensions and aspect ratios for social media.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/image-editor/tools/watermark-image" className="tool-card" style={{ textDecoration: 'none' }}>
              <h3>Watermark</h3>
              <p>Apply branding or copyright notices to batches of images.</p>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Open Tool <ArrowRight size={14} />
              </span>
            </Link>
          </div>

          <div className="grid-3">
            <div className="feature-card">
               <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
               <h3>100% Private</h3>
               <p>Unlike other online editors, NexImage never uploads your photos to a server. All processing happens locally on your machine.</p>
            </div>
            <div className="feature-card">
               <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Zap size={32} /></div>
               <h3>Instant Speed</h3>
               <p>No upload or download wait times. Your machine's hardware handles the compression instantly, regardless of your internet speed.</p>
            </div>
            <div className="feature-card">
               <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Lock size={32} /></div>
               <h3>Secure by Design</h3>
               <p>Professional-grade tools built for users who handle sensitive visual data and can't risk a data breach.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand">TheNexTools</Link>
              <p>Professional, offline-first utilities designed for privacy-conscious users. Your data stays on your device.</p>
            </div>
            <div className="footer-group">
              <h4>Toolkit</h4>
              <ul className="footer-links">
                <li><Link href="/image-editor">Image Editor</Link></li>
                <li><Link href="/pdf-toolkit">NexPDF Home</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; {new Date().getFullYear()} TheNexTools. All processing happens locally.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

