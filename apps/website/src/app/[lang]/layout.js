import { locales, defaultLocale } from '@/lib/i18n-config';
import { getDictionary } from '@/dictionaries';

export async function generateStaticParams() {
  return locales
    .filter(locale => locale !== defaultLocale)
    .map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = locales.includes(lang) ? lang : defaultLocale;
  const d = await getDictionary(locale);

  return {
    metadataBase: new URL('https://thenextools.com'),
    title: d.meta.layout.title,
    description: d.meta.layout.description,
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

export default function LangLayout({ children }) {
  return <>{children}</>;
}
