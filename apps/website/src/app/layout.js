import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

// Optimize fonts for SSR
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

/** Required for real mobile layout; without this, many browsers assume ~980px width. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Fully SEO Optimized Metadata (Injected beautifully by Next.js Server Side)
export const metadata = {
  metadataBase: new URL('https://thenextools.com'),
  title: 'TheNexTools | NexData Recovery & Essential Utilities',
  description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files, and keep your digital life running smoothly.',
  keywords: ['data recovery', 'file repair', 'mac data recovery', 'deep sector scan', 'utilities', 'TheNexTools', 'NexData Recovery'],
  alternates: {
    canonical: '/',
  },
  icons: {
    apple: '/thenextools-com-apple-icon.png',
  },
  openGraph: {
    title: 'TheNexTools | NexData Recovery & Essential Utilities',
    description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files, and keep your digital life running smoothly.',
    url: 'https://thenextools.com',
    siteName: 'TheNexTools Suite',
    images: [
      {
        url: '/thenextools-com-og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheNexTools | NexData Recovery & Essential Utilities',
    description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files.',
  images: ['/thenextools-com-og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
