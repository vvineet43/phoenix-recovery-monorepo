import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

export const metadata = {
  title: 'Privacy Policy | TheNexTools',
  description: 'Our privacy policy is simple: we don\'t want your data. All tools run locally on your device.',
  alternates: {
    canonical: '/privacy',
    languages: {
      ...locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/privacy' : `/${l}/privacy`;
        return acc;
      }, {}),
      'x-default': '/privacy',
    }
  },
  openGraph: {
    title: 'Privacy Policy | TheNexTools',
    description: 'Our privacy policy is simple: we don\'t want your data. All tools run locally on your device.',
    type: 'website',
    siteName: 'TheNexTools',
    locale: 'en_US',
    url: 'https://thenextools.com/privacy',
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
    title: 'Privacy Policy | TheNexTools',
    description: 'Our privacy policy is simple: we don\'t want your data. All tools run locally on your device.',
    images: ['https://thenextools.com/thenextools-com-og-image.png'],
  }
};

export default function PrivacyPage() {
  return (
    <>
      

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Privacy Policy</h1>
          <p className="text-muted">Effective Date: {new Date().toLocaleDateString()}</p>
        </header>

        <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>The Core Principle</h2>
            <p>We sell software, not data. Our tools process everything on your device, and we have no interest in seeing, storing, or monetizing what you work on.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>No File Uploads</h2>
            <p>Every web-based tool in our suite (NexPDF, NexStrip, NexCompress) uses modern browser APIs to process your files <strong>locally</strong> in your browser tab. Your files never transit our servers. We cannot see them, and we certainly do not store them.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>No Accounts or Tracking</h2>
            <p>We do not require accounts to use our free utilities. We do not use invasive tracking pixels or third-party cookies for advertising. We may collect minimal, anonymized server logs (like page views) purely for performance monitoring and to prevent abuse of our infrastructure.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Local Storage</h2>
            <p>Some tools may use your browser&apos;s local storage or IndexedDB to save your preferences or temporary work files (like a PDF being edited). This data stays on your device and is never synced to any cloud service by us.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>NexData Desktop App</h2>
            <p>Our desktop application, NexData Recovery, is designed to run entirely offline. It does not require an internet connection to scan or recover files. License verification happens via a secure, local-first mechanism.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Contact</h2>
            <p>Questions about this privacy policy? Email us at <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.</p>
          </div>
        </section>
      </main>
    </>
  );
}
