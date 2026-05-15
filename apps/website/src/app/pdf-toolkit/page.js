import Link from 'next/link';

export const metadata = {
  title: 'NexPDF — Offline PDF Editor | TheNexTools',
  description: 'Edit, merge, sign, and compress PDF files entirely in your browser. No file uploads, no account required, no watermarks. NexPDF runs locally on your device.',
  manifest: '/pdf-manifest.json',
  alternates: {
    canonical: '/pdf-toolkit',
  },
};

function Nav() {
  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">TheNexTools</Link>
        <div className="nav-links">
          <Link href="/" className="link nav-hide-mobile">All Tools</Link>
          <a href="#features" className="link nav-hide-mobile">Features</a>
          <Link href="/pdf-tools" className="btn btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.83rem' }}>
            Open Editor
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function PdfToolkitLanding() {
  return (
    <>
      <Nav />

      <header className="hero container">
        <div className="badge">NexPDF — Free &amp; Private</div>
        <h1>Edit PDFs without handing your files to a stranger&apos;s server.</h1>
        <p>
          Most free PDF tools require an upload. NexPDF doesn&apos;t. Everything — merging, signing, compressing, annotating — happens directly in your browser using your device&apos;s own processing power. No account. No waiting. No trace.
        </p>
        <div className="hero-actions">
          <Link href="/pdf-tools" className="btn btn-primary">Open in Browser</Link>
          <Link href="/pdf-tools" className="btn btn-outline">Install App</Link>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>What NexPDF actually does</h2>
            <p>A practical toolkit for the PDF tasks that come up constantly — handled the way they should be.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Signatures and Annotations</h3>
              <p>Draw a signature by hand, type one out, or stamp the date on any page. Drag the element exactly where it needs to go, resize it, and save. The output is a clean, flattened PDF — no hidden layers, no editable fields left behind.</p>
            </div>
            <div className="feature-card">
              <h3>Merge and Reorder Pages</h3>
              <p>Load multiple PDFs at once, then drag pages into the right order. Rotate anything scanned sideways. Pull out specific pages and export them separately — without a subscription.</p>
            </div>
            <div className="feature-card">
              <h3>Compression with a Preview</h3>
              <p>When a PDF is too heavy to email, the compress tool lets you dial in the quality level and see the estimated file size before committing. High-quality scans that come in at 40MB routinely compress to under 3MB.</p>
            </div>
            <div className="feature-card">
              <h3>Works offline after first load</h3>
              <p>Once NexPDF has loaded, you can disconnect from the internet and keep working. Nothing is sent anywhere. Legal documents, HR files, financial statements — whatever is in the document, it stays between you and the PDF.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="divider">
        <div className="container">
          <div className="section-header">
            <h2>Individual PDF Utilities</h2>
            <p>Direct access to specific tools for faster workflows.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <Link href="/pdf-toolkit/tools/compress-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Compress PDF</Link>
            <Link href="/pdf-toolkit/tools/merge-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Merge PDF</Link>
            <Link href="/pdf-toolkit/tools/split-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Split PDF</Link>
            <Link href="/pdf-toolkit/tools/pdf-to-images" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>PDF to Images</Link>
            <Link href="/pdf-toolkit/tools/images-to-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Images to PDF</Link>
            <Link href="/pdf-toolkit/tools/rotate-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Rotate PDF</Link>
            <Link href="/pdf-toolkit/tools/rearrange-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Rearrange Pages</Link>
            <Link href="/pdf-toolkit/tools/sign-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Sign PDF</Link>
            <Link href="/pdf-toolkit/tools/add-page-numbers" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Add Page Numbers</Link>
            <Link href="/pdf-toolkit/tools/scan-to-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Scan to PDF</Link>
            <Link href="/pdf-toolkit/tools/protect-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Protect PDF</Link>
            <Link href="/pdf-toolkit/tools/unlock-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Unlock PDF</Link>
            <Link href="/pdf-toolkit/tools/watermark-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Watermark PDF</Link>
            <Link href="/pdf-toolkit/tools/ocr-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>OCR PDF</Link>
            <Link href="/pdf-toolkit/tools/redact-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Redact PDF</Link>
            <Link href="/pdf-toolkit/tools/html-to-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>HTML to PDF</Link>
            <Link href="/pdf-toolkit/tools/text-to-pdf" className="btn btn-outline" style={{ justifyContent: 'center', textAlign: 'center' }}>Text to PDF</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready when you are.</h2>
          <p>Open the editor, drop in your files, and get to work. No sign-up step, no trial period.</p>
          <Link href="/pdf-tools" className="btn btn-primary">Launch NexPDF</Link>
        </div>
      </section>

    </>
  );
}
