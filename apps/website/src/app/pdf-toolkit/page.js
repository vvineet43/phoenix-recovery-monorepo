import Link from 'next/link';

export const metadata = {
  title: 'NexPDF — Offline PDF Editor | TheNexTools',
  description: 'Edit, merge, sign, and compress PDF files entirely in your browser. No file uploads, no account required, no watermarks. NexPDF runs locally on your device.',
};

export default function PdfToolkitLanding() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TheNexTools</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="link">All Tools</Link>
            <a href="#features" className="link">Features</a>
            <Link href="/pdf-tools" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
              Open Editor
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="badge">NexPDF — Free &amp; Private</div>
        <h1>Edit PDFs without handing your files to a stranger&apos;s server.</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          Most free PDF tools require an upload. NexPDF doesn&apos;t. Everything — merging, signing, compressing, annotating — happens directly in your browser using your device&apos;s own processing power. No account. No waiting. No trace.
        </p>
        
        <div className="hero-actions" style={{ marginTop: '2rem' }}>
          <Link href="/pdf-tools" className="btn btn-primary">
            Open NexPDF — No Login Required
          </Link>
        </div>
      </header>

      <section id="features" className="features" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>What NexPDF actually does</h2>
            <p>A practical toolkit for the PDF tasks that come up constantly — handled the way they should be.</p>
          </div>
          
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', textAlign: 'left' }}>
            
            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Signatures and Annotations</h3>
              <p>Draw a signature by hand, type one out, or stamp the date on any page. Drag the element exactly where it needs to go, resize it, and save. The output is a clean, flattened PDF — no hidden layers, no editable fields left behind.</p>
            </div>

            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Merge and Reorder Pages</h3>
              <p>Load multiple PDFs at once, then drag pages into the right order. Rotate anything scanned sideways. Pull out specific pages and export them separately. It&apos;s the document management workflow most people currently do with Acrobat — minus the subscription.</p>
            </div>

            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Compression with a Preview</h3>
              <p>When a PDF is too heavy to email, the compress tool lets you dial in the quality level and see the estimated file size before committing. High-quality scans that come in at 40MB routinely compress to under 3MB without visible degradation.</p>
            </div>

            <div className="feature-card" style={{ padding: '2rem', border: '1px solid var(--border-color)' }}>
              <h3>Works offline after first load</h3>
              <p>Once NexPDF has loaded in your browser, you can disconnect from the internet and keep working. Nothing is sent anywhere. Legal documents, HR files, financial statements — whatever is in the document, it stays between you and the PDF.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready when you are.</h2>
          <p>Open the editor, drop in your files, and get to work. No sign-up step, no trial period.</p>
          <Link href="/pdf-tools" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Launch NexPDF
          </Link>
        </div>
      </section>

      <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--border-color)', marginTop: '4rem', textAlign: 'center' }}>
        <div className="container">
          &copy; {new Date().getFullYear()} TheNexTools. All rights reserved.
        </div>
      </footer>
    </>
  );
}
