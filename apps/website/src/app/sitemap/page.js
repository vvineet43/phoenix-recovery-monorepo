import Link from 'next/link';
import { TOOLS_METADATA } from '../../lib/pdf-tools-metadata';
import { 
  FileText, Image, AlertTriangle, ArrowRight, ShieldCheck, 
  HelpCircle, Mail, Home, Database, FileMinus
} from 'lucide-react';
import { locales } from '@/lib/i18n-config';

export const metadata = {
  title: 'Sitemap | TheNexTools',
  description: 'Navigate through TheNexTools. Complete index of all our online PDF tools, image compressors, metadata strippers, and offline data recovery applications.',
  alternates: {
    canonical: '/sitemap',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/sitemap' : `/${l}/sitemap`;
        return acc;
      }, {}),
      'x-default': '/sitemap',
    }
  },
  openGraph: {
    title: 'Sitemap | TheNexTools',
    description: 'Navigate through TheNexTools. Complete index of all our online PDF tools, image compressors, metadata strippers, and offline data recovery applications.',
    type: 'website',
    siteName: 'TheNexTools',
    locale: 'en_US',
    url: 'https://thenextools.com/sitemap',
    images: [
      {
        url: 'https://thenextools.com/thenextools-com-og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheNexTools — Free Offline PDF, Image & Data Recovery Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap | TheNexTools',
    description: 'Navigate through TheNexTools. Complete index of all our online PDF tools, image compressors, metadata strippers, and offline data recovery applications.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function SitemapPage() {
  const pdfTools = Object.entries(TOOLS_METADATA).map(([slug, meta]) => ({
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    desc: meta.description.split('.')[0] + '.',
  }));

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>Index</div>
        <h1 style={{ marginBottom: '1rem' }}>Sitemap</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          Find direct links to every utility, tool, documentation page, and policy document across TheNexTools.
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Main Sections */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Home size={20} /></span>
              Core Pages
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Home Page</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Welcome to TheNexTools. Free web utilities and offline data recovery software.</p>
              </Link>
              <Link href="/data-recovery" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>NexData Recovery</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Professional offline data recovery desktop application for macOS and Windows.</p>
              </Link>
              <Link href="/docs" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Documentation</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Guides, support resources, FAQs, and integration docs for all utilities.</p>
              </Link>
              <Link href="/contact" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Contact Us</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Get in touch with support, billing enquiries, or general feedback.</p>
              </Link>
            </div>
          </div>

          {/* PDF Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><FileText size={20} /></span>
              NexPDF Toolkit
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              All PDF tools run 100% locally in your web browser. No files are uploaded to any server.
            </p>
            <div className="dashboard-grid">
              <Link href="/pdf-toolkit" className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>NexPDF Toolkit Workspace</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Open the comprehensive PDF Editing Suite interface with file previews and drag-and-drop workspace.</p>
              </Link>
              {pdfTools.map((t) => (
                <Link key={t.slug} href={`/pdf-toolkit/tools/${t.slug}`} className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3>{t.title}</h3>
                    <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                  </div>
                  <p>{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Image Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Image size={20} /></span>
              NexImage Toolkit
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/image-toolkit" className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>NexImage Dashboard</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Access our localized suite of batch image processing and compression tools.</p>
              </Link>
              <Link href="/image-compressor" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Image Compressor</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Shrink JPG, PNG, and WebP files locally with real-time compression ratio previews.</p>
              </Link>
              <Link href="/image-converter" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Image Converter</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Convert images locally between formats including JPEG, PNG, WebP, and AVIF.</p>
              </Link>
              <Link href="/image-redactor" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Image Redactor &amp; Blur</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Permanently blur faces, license plates, or confidential text in images before sharing.</p>
              </Link>
              <Link href="/exif-stripper" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>EXIF Stripper</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Remove private EXIF metadata (GPS coordinates, camera model, lens) from photographs.</p>
              </Link>
            </div>
          </div>

          {/* Legal / Policy Pages */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><ShieldCheck size={20} /></span>
              Policies &amp; Legal
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/privacy" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Privacy Policy</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Learn about our local-first data processing policy. We never upload your documents.</p>
              </Link>
              <Link href="/terms" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Terms of Service</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Terms, conditions, license details, and liability terms for using our software.</p>
              </Link>
              <Link href="/refund-policy" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Refund Policy</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Information on our 10-day refund guarantee for NexData Recovery Pro licenses.</p>
              </Link>
              <Link href="/sitemap" className="dashboard-card" style={{ borderStyle: 'dashed' }}>
                <div className="dashboard-card-header">
                  <h3>HTML Sitemap</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>You are currently viewing the HTML sitemap page of TheNexTools.</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
