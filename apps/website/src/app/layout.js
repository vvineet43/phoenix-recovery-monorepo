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
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/' : `/${l}`;
          return acc;
        }, {}),
        'x-default': '/',
      }
    },
    icons: {
      apple: '/thenextools-com-apple-icon.png',
    },
    openGraph: {
      title: d.meta.layout.title,
      description: d.meta.layout.description,
      url: locale === 'en' ? 'https://thenextools.com' : `https://thenextools.com/${locale}`,
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
    <html lang={locale}>
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

