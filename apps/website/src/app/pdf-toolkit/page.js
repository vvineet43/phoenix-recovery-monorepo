import Link from 'next/link';

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

      <header className="hero container">
        <div className="badge">NexPDF — Free &amp; Private</div>
        <h1>Edit PDFs without handing your files to someone else&apos;s server.</h1>
        <p>
          Every time you use a free online PDF tool, your document gets uploaded to a company you&apos;ve never heard of, processed on their machines, and (maybe) deleted afterward. NexPDF skips all of that. Merging, signing, compressing, redacting — it all happens right here in your browser. No account. No waiting. No trace left behind.
        </p>
        <div className="hero-actions">
          <Link href="/pdf-tools" className="btn btn-primary">Open PDF Editor</Link>
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
          <div className="section-header">
            <h2>All 17 tools</h2>
            <p>Jump straight to the tool you need.</p>
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
          <p>Open the editor, drop in a file, and get to work. No sign-up, no trial countdown.</p>
          <Link href="/pdf-tools" className="btn btn-primary">Launch NexPDF</Link>
        </div>
      </section>

    </>
  );
}
