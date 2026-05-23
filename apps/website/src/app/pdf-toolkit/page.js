import Link from 'next/link';
import { PdfUploadLandingWrapper } from '../../components/pdf-tools/PdfEditorWrapper';
import { 
  Plus, Scissors, Minimize2, Type, ImageIcon, ShieldAlert, Lock, Unlock, EyeOff, 
  RotateCw, RefreshCw, Layers, Save, Camera, FileSearch, FileCode, FileText, ArrowRight, BookOpen, Layers2
} from 'lucide-react';

export const metadata = {
  title: 'NexPDF — Edit, Sign, Merge & Compress PDFs Offline | TheNexTools',
  description: 'A full PDF editor that runs in your browser. Merge, split, sign, compress, redact, watermark — no uploads, no accounts, no watermarks on output.',
  manifest: '/pdf-manifest.json',
  alternates: {
    canonical: '/pdf-toolkit',
  },
};

export default function PdfToolkitLanding() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does local PDF editing work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It uses WebAssembly and client-side JavaScript PDF manipulation libraries to compile, edit, sign, merge, and split files inside your browser. No files are ever sent to an external server."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are my PDF documents secure with NexPDF?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, entirely secure. Because all tools execute locally inside your browser client sandbox, sensitive files like contracts, bank statements, or tax documents never leave your machine."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I edit PDFs offline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. NexPDF is built as a Progressive Web App (PWA). Once you visit the site, the tools are cached locally and work without an active internet connection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there limits or watermarks on output files?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. NexPDF does not add watermarks, impose file size caps, or enforce daily usage limits. You get professional PDF editing completely free."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexPDF Toolkit",
              "url": "https://thenextools.com/pdf-toolkit",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 and modern JS support",
              "description": "Edit, merge, split, sign, compress, protect, and redact PDF documents locally in your browser. Safe and private.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://thenextools.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "PDF Toolkit",
                  "item": "https://thenextools.com/pdf-toolkit"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexPDF — Free &amp; Private</div>
        <h1>Edit PDFs without handing your files to someone else&apos;s server.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Every time you use a free online PDF tool, your document gets uploaded to a company you&apos;ve never heard of, processed on their machines, and (maybe) deleted afterward. NexPDF skips all of that. Merging, signing, compressing, redacting — it all happens right here in your browser. No account. No waiting. No trace left behind.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <PdfUploadLandingWrapper />
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What you can actually do with it</h2>
            <p>The PDF tasks that come up every week — handled locally, the way they should be.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Sign and annotate</h3>
              <p>Draw your signature with a mouse or your finger on a touchscreen. Or type it out and pick a font that looks handwritten. Place it anywhere on the page, resize it, then export a flattened PDF — no hidden layers, no editable signature field left behind. Good enough for leases, NDAs, and the dozen other documents that show up every month asking for your name on a line.</p>
            </div>
            <div className="feature-card">
              <h3>Merge, reorder, and extract pages</h3>
              <p>Load multiple PDFs, drag pages around until they&apos;re in the right order, rotate anything that came through the scanner sideways, and pull out specific pages as standalone files. The kind of thing you shouldn&apos;t need Acrobat Pro for.</p>
            </div>
            <div className="feature-card">
              <h3>Compress with a preview</h3>
              <p>When a scan comes in at 40MB and your email caps at 25MB, the compressor lets you dial in a quality level and see the estimated output size before saving. Most high-resolution scans compress to a third of their original size without visible quality loss.</p>
            </div>
            <div className="feature-card">
              <h3>Works offline</h3>
              <p>After the first load, NexPDF doesn&apos;t need the internet. You can disconnect your Wi-Fi and keep working. Legal documents, financial statements, HR paperwork — whatever it is, it stays between you and the file.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="divider">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <h2>Seventeen dedicated PDF utilities</h2>
            <p>Skip the complex menus. Launch the secure workspace with your chosen module pre-activated.</p>
          </div>

          {/* Category 1: Assembly */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Layers size={20} /></span>
              Document Structure &amp; Assembly
            </h3>
            <div className="dashboard-grid">
              <Link href="/pdf-toolkit/tools/merge-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Plus size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Merge PDF</h3>
                <p>Combine multiple documents or pages into a single file, easily ordered.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/split-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Scissors size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Split PDF</h3>
                <p>Extract specific page ranges or divide document into standalone files.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/rearrange-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Layers size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Rearrange Pages</h3>
                <p>Drag and drop thumbnails to reorder or delete pages visually.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/rotate-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><RotateCw size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Rotate PDF</h3>
                <p>Permanently rotate individual pages or full documents in steps.</p>
              </Link>
            </div>
          </div>

          {/* Category 2: Conversion */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><RefreshCw size={20} /></span>
              Optimization &amp; Conversion
            </h3>
            <div className="dashboard-grid">
              <Link href="/pdf-toolkit/tools/compress-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Minimize2 size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Compress PDF</h3>
                <p>Reduce file size with a real-time slider and local size preview.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/pdf-to-images" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><ImageIcon size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>PDF to Images</h3>
                <p>Convert pages into JPEG or PNG files, individual or batch ZIP.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/images-to-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Layers2 size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Images to PDF</h3>
                <p>Compile JPG, PNG, WebP photos into a cleanly formatted PDF document.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/html-to-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileCode size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>HTML to PDF</h3>
                <p>Convert raw HTML markup templates into formatted documents locally.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/text-to-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileText size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Text to PDF</h3>
                <p>Format plain text files, logs, or codes into printable PDF formats.</p>
              </Link>
            </div>
          </div>

          {/* Category 3: Security & Privacy */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Lock size={20} /></span>
              Security, Privacy &amp; Stamping
            </h3>
            <div className="dashboard-grid">
              <Link href="/pdf-toolkit/tools/protect-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Lock size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Protect PDF</h3>
                <p>Lock documents with local password encryption and AES constraints.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/unlock-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Unlock size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Unlock PDF</h3>
                <p>Remove passwords and viewing boundaries from authorized files.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/redact-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><EyeOff size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Redact PDF</h3>
                <p>Permanently black out private text or SSNs with physical flattening.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/watermark-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Type size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Watermark PDF</h3>
                <p>Stamp CONFIDENTIAL, draft overlays, or texts with custom opacity.</p>
              </Link>
            </div>
          </div>

          {/* Category 4: Sign & OCR */}
          <div className="dashboard-category-block" style={{ marginBottom: 0 }}>
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Save size={20} /></span>
              Digital Signatures &amp; Captures
            </h3>
            <div className="dashboard-grid">
              <Link href="/pdf-toolkit/tools/sign-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Save size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Sign PDF</h3>
                <p>Draw signatures or type cursive scripts to flat-sign document fields.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/scan-to-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Camera size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Scan to PDF</h3>
                <p>Capture document pages via device camera and enhance contrast.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/ocr-pdf" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileSearch size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>OCR PDF</h3>
                <p>Scan and extract copyable plain texts out of raster document scans.</p>
              </Link>
              <Link href="/pdf-toolkit/tools/add-page-numbers" className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><BookOpen size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>Add Page Numbers</h3>
                <p>Stamp sequential page number pagination labels across headings/footers.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about NexPDF offline editing.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How does local PDF editing work?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                It uses WebAssembly and client-side JavaScript PDF manipulation libraries to compile, edit, sign, merge, and split files inside your browser. No files are ever sent to an external server.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are my PDF documents secure with NexPDF?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes, entirely secure. Because all tools execute locally inside your browser client sandbox, sensitive files like contracts, bank statements, or tax documents never leave your machine.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Can I edit PDFs offline?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes. NexPDF is built as a Progressive Web App (PWA). Once you visit the site, the tools are cached locally and work without an active internet connection.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are there limits or watermarks on output files?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No. NexPDF does not add watermarks, impose file size caps, or enforce daily usage limits. You get professional PDF editing completely free.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready when you are.</h2>
          <p>Open the editor, drop in a file, and get to work. No sign-up, no trial countdown.</p>
          <a href="#" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>

    </>
  );
}
