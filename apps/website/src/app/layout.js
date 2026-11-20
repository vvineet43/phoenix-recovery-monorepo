import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Generate SEO alternate hreflang tags dynamically based on locale
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  return {
    metadataBase: new URL('https://thenextools.com'),
    title: d.meta.layout.title,
    description: d.meta.layout.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/thenextools-com-favicon.ico', sizes: '48x48' },
        { url: '/thenextools-com-icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/thenextools-com-icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/thenextools-com-favicon.ico',
      apple: '/thenextools-com-apple-icon.png',
    },
    openGraph: {
      title: d.meta.layout.title,
      description: d.meta.layout.description,
      url: locale === 'en' ? 'https://thenextools.com/' : `https://thenextools.com/${locale}`,
      siteName: 'TheNexTools Suite',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: d.meta.layout.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: d.meta.layout.title,
      description: d.meta.layout.description,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    },
  };
}


export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="https://thenextools.com/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="https://thenextools.com/llms-full.txt" title="LLMs Full Reference" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=location.pathname.split('/')[1];var l=${JSON.stringify(locales)};if(l.indexOf(s)!==-1){document.documentElement.lang=s;}}catch(e){}})();`
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        {/* Lemon Squeezy Affiliate Tracking Script */}
        <Script
          id="lemon-squeezy-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.lemonSqueezyAffiliateConfig = { store: "thenextools" };`
          }}
        />
        <Script
          id="lemon-squeezy-affiliate"
          src="https://lmsqueezy.com/affiliate.js"
          strategy="lazyOnload"
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

