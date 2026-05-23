import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

// Optimize fonts for SSR — display:'swap' forces Next.js to self-host fonts,
// eliminating the render-blocking request to fonts.googleapis.com
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

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
      <head />
      <body className={`${inter.variable} ${outfit.variable}`}>
        {/* Lemon Squeezy Affiliate Tracking Script */}
        <Script
          id="lemon-squeezy-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "thenextools" };`
          }}
        />
        <Script
          id="lemon-squeezy-affiliate"
          src="https://lmsqueezy.com/affiliate.js"
          strategy="afterInteractive"
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
