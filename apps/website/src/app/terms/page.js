import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

export const metadata = {
  title: 'Terms of Service | TheNexTools',
  description: 'The terms of using TheNexTools suite of utilities.',
  alternates: {
    canonical: '/terms',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/terms' : `/${l}/terms`;
        return acc;
      }, {}),
      'x-default': '/terms',
    }
  },
  openGraph: {
    title: 'Terms of Service | TheNexTools',
    description: 'The terms of using TheNexTools suite of utilities.',
    type: 'website',
    siteName: 'TheNexTools',
    locale: 'en_US',
    url: 'https://thenextools.com/terms',
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
    title: 'Terms of Service | TheNexTools',
    description: 'The terms of using TheNexTools suite of utilities.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function TermsPage() {
  return (
    <>
      

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Terms of Service</h1>
          <p className="text-muted">Last Updated: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Acceptance of Terms</h2>
            <p>By accessing or using TheNexTools (the &quot;Site&quot; and &quot;Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>License to Use</h2>
            <p>We grant you a non-exclusive, non-transferable license to use our web-based utilities for personal or commercial purposes. You may not attempt to decompile, reverse engineer, or otherwise extract the source code of our tools without express written permission.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Software &quot;As Is&quot;</h2>
            <p>While we strive for the highest quality and reliability, all tools provided by TheNexTools are offered &quot;as is&quot; without any warranty of any kind. We are not responsible for any data loss or hardware damage that may occur during the use of our software, particularly data recovery operations.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Paid Software &amp; Licensing</h2>
            <p>Certain tools, such as NexData Recovery, may require a paid license for full functionality. Licenses are typically node-locked or tied to specific hardware. Refunds are handled on a case-by-case basis as outlined in our documentation.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Your continued use of the site after such changes constitutes acceptance of the new terms.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Contact</h2>
            <p>Questions about these terms? Reach us at <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.</p>
          </div>
        </section>
      </main>
    </>
  );
}
