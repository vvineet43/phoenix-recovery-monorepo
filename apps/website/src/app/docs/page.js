import Link from 'next/link';

export const metadata = {
  title: 'Documentation | TheNexTools',
  description: 'Learn how to use TheNexTools suite of privacy-first utilities.',
  alternates: { canonical: '/docs' },
};

export default function DocsPage() {
  return (
    <>
      

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1>Documentation</h1>
          <p className="text-muted">Guides and technical specifications for the TheNexTools suite.</p>
        </header>

        <section className="docs-grid" style={{ display: 'grid', gap: '3rem' }}>
          <div>
            <h3>NexData Recovery</h3>
            <p className="mt-sm">NexData works by scanning physical drive sectors. For best results:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Connect the target drive via a stable USB or SATA connection.</li>
              <li>Ensure you have enough space on a <strong>separate</strong> drive to save recovered files.</li>
              <li>Avoid writing any new data to the drive you are scanning.</li>
            </ul>
          </div>

          <div>
            <h3>NexPDF Toolkit</h3>
            <p className="mt-sm">All PDF operations happen in your browser using the local CPU. Supported features include:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Merge:</strong> Combine multiple files in any order.</li>
              <li><strong>Sign:</strong> Place signatures as flattened vector elements.</li>
              <li><strong>Compress:</strong> Reduce file size with live quality presets.</li>
            </ul>
          </div>

          <div>
            <h3>Troubleshooting PWAs</h3>
            <p className="mt-sm">To install our tools as standalone apps:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Chrome:</strong> Look for the "Install" icon in the right side of the address bar.</li>
              <li><strong>iOS Safari:</strong> Tap Share &rarr; Add to Home Screen.</li>
              <li><strong>Android:</strong> Tap the "Add to Home Screen" banner or browser menu.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
