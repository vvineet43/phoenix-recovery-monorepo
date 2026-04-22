import './globals.css';
import { Inter, Outfit } from 'next/font/google';

// Optimize fonts for SSR
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

// Fully SEO Optimized Metadata (Injected beautifully by Next.js Server Side)
export const metadata = {
  title: 'LifeTools | Phoenix Data Recovery & Essential Utilities',
  description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files, and keep your digital life running smoothly.',
  keywords: ['data recovery', 'file repair', 'mac data recovery', 'deep sector scan', 'utilities', 'LifeTools', 'Phoenix Recovery'],
  openGraph: {
    title: 'LifeTools | Phoenix Data Recovery & Essential Utilities',
    description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files, and keep your digital life running smoothly.',
    url: 'https://lifetools.app',
    siteName: 'LifeTools Suite',
    images: [
      {
        url: '/phoenix-utility.png', // Fallback SEO cover image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeTools | Phoenix Data Recovery & Essential Utilities',
    description: 'A suite of high-performance desktop utilities designed to rescue your data, repair corrupted files.',
  images: ['/phoenix-utility.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
