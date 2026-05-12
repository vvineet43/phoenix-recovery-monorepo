import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | TheNexTools',
  description: 'The terms of using TheNexTools suite of utilities.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <nav>
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          <div className="nav-links">
            <Link href="/" className="link">Home</Link>
          </div>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Terms of Service</h1>
          <p className="text-muted">Last Updated: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3>Acceptance of Terms</h3>
            <p>By accessing or using TheNexTools (the &quot;Site&quot; and &quot;Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </div>

          <div>
            <h3>License to Use</h3>
            <p>We grant you a non-exclusive, non-transferable license to use our web-based utilities for personal or commercial purposes. You may not attempt to decompile, reverse engineer, or otherwise extract the source code of our tools without express written permission.</p>
          </div>

          <div>
            <h3>Software &quot;As Is&quot;</h3>
            <p>While we strive for the highest quality and reliability, all tools provided by TheNexTools are offered &quot;as is&quot; without any warranty of any kind. We are not responsible for any data loss or hardware damage that may occur during the use of our software, particularly data recovery operations.</p>
          </div>

          <div>
            <h3>Paid Software &amp; Licensing</h3>
            <p>Certain tools, such as Phoenix Data Recovery, may require a paid license for full functionality. Licenses are typically node-locked or tied to specific hardware. Refunds are handled on a case-by-case basis as outlined in our documentation.</p>
          </div>

          <div>
            <h3>Modifications</h3>
            <p>We reserve the right to modify these terms at any time. Your continued use of the site after such changes constitutes acceptance of the new terms.</p>
          </div>
        </section>
      </main>
    </>
  );
}
