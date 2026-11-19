import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found (404) | TheNexTools',
  description: 'The requested page could not be found. Browse our free offline PDF, image, and data recovery tools.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 5rem)', paddingBottom: '6rem', textAlign: 'center', maxWidth: '720px' }}>
      <div className="badge" style={{ marginBottom: '1.25rem' }}>404 — Page Not Found</div>
      <h1 style={{ marginBottom: '1rem' }}>We couldn&apos;t find that page.</h1>
      <p className="text-muted" style={{ marginBottom: '2.5rem' }}>
        The link may have moved or been mistyped. Jump straight into one of our free offline toolkits below.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        <Link href="/" className="btn btn-primary">Go to Homepage</Link>
        <Link href="/pdf-toolkit" className="btn btn-outline">NexPDF Toolkit</Link>
        <Link href="/image-toolkit" className="btn btn-outline">NexImage Toolkit</Link>
        <Link href="/data-recovery" className="btn btn-outline">NexData Recovery</Link>
      </div>
    </main>
  );
}
