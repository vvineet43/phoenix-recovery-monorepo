import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | TheNexTools',
  description: 'Our privacy policy is simple: we don\'t want your data. All tools run locally on your device.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3>The Core Principle</h3>
            <p>TheNexTools was built because we believe your data belongs on your machine. Our business model is based on selling professional software licenses (like Phoenix Data Recovery), not on harvesting or selling user data.</p>
          </div>

          <div>
            <h3>No File Uploads</h3>
            <p>Every web-based tool in our suite (NexPDF, NexStrip, NexCompress) uses modern browser APIs to process your files <strong>locally</strong> in your browser tab. Your files never transit our servers. We cannot see them, and we certainly do not store them.</p>
          </div>

          <div>
            <h3>No Accounts or Tracking</h3>
            <p>We do not require accounts to use our free utilities. We do not use invasive tracking pixels or third-party cookies for advertising. We may collect minimal, anonymized server logs (like page views) purely for performance monitoring and to prevent abuse of our infrastructure.</p>
          </div>

          <div>
            <h3>Local Storage</h3>
            <p>Some tools may use your browser&apos;s local storage or IndexedDB to save your preferences or temporary work files (like a PDF being edited). This data stays on your device and is never synced to any cloud service by us.</p>
          </div>

          <div>
            <h3>Phoenix Desktop App</h3>
            <p>Our desktop application, Phoenix Data Recovery, is designed to run entirely offline. It does not require an internet connection to scan or recover files. License verification happens via a secure, local-first mechanism.</p>
          </div>
        </section>
      </main>
    </>
  );
}
