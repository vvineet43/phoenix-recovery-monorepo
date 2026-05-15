import Link from 'next/link';
import { IMAGE_TOOLS_METADATA } from '../../../../lib/image-tools-metadata';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, Lock, Zap, ArrowRight, 
  Image as ImageIcon, Shield, Search 
} from 'lucide-react';
import { LaunchSection } from './LaunchSection';

const ICON_MAP = {
  'compress': Zap,
  'strip': Shield
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = IMAGE_TOOLS_METADATA[slug];
  
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: `/image-editor/tools/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(IMAGE_TOOLS_METADATA).map((slug) => ({
    slug,
  }));
}

export default async function ImageToolSeoPage({ params }) {
  const { slug } = await params;
  const tool = IMAGE_TOOLS_METADATA[slug];

  if (!tool) {
    notFound();
  }

  const ToolIcon = ICON_MAP[tool.toolParam] || ImageIcon;

  return (
    <>
      <nav className="site-nav">
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          <div className="nav-links">
            <Link href="/image-editor" className="link nav-hide-mobile">Image Editor</Link>
            <Link href="/image-editor" className="btn btn-outline nav-hide-mobile" style={{ padding: '0.45rem 0.9rem', fontSize: '0.83rem' }}>
              Full Toolkit
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero container" style={{ textAlign: 'left', alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <div className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
          <ToolIcon size={14} /> NexImage Toolkit
        </div>
        <h1 style={{ margin: '0 0 1.5rem 0' }}>{tool.h1}</h1>
        <p style={{ margin: '0 0 2.5rem 0', maxWidth: '700px', textAlign: 'left' }}>{tool.p}</p>
        
        <LaunchSection toolParam={tool.toolParam} label={tool.toolParam} />
      </header>

      <section className="divider">
        <div className="container">
          <div className="grid-2">
            <div className="feature-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Key Benefits</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tool.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ color: '#0f172a', marginTop: '0.2rem' }}><Zap size={18} /></div>
                    <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-card" style={{ background: '#f8fafc' }}>
              <h3>Local & Private</h3>
              <p>
                NexImage doesn't upload your files to any server. All processing for <strong>{tool.toolParam}ing</strong> is done directly in your browser using your machine's own hardware. This means your data remains strictly on your device.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div className="badge"><ShieldCheck size={14} /> Private</div>
                <div className="badge"><Lock size={14} /> Secure</div>
              </div>
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
                <li><Link href="/exif-stripper">EXIF Stripper</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; {new Date().getFullYear()} TheNexTools. All processing happens locally.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
