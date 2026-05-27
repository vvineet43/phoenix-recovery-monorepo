import ExifToolsPage from '@/app/exif-tools/page';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  
  return {
    title: `${d.imageToolkit.stripperTitle} | ${d.nav.brand}`,
    description: d.imageToolkit.stripperDesc,
    manifest: '/exif-manifest.json',
    alternates: {
      canonical: locale === 'en' ? '/exif-tools' : `/${locale}/exif-tools`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/exif-tools' : `/${l}/exif-tools`;
          return acc;
        }, {}),
        'x-default': '/exif-tools',
      }
    },
    openGraph: {
      title: `${d.imageToolkit.stripperTitle} | ${d.nav.brand}`,
      description: d.imageToolkit.stripperDesc,
      type: 'website',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${d.imageToolkit.stripperTitle} | ${d.nav.brand}`,
      description: d.imageToolkit.stripperDesc,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}

export default ExifToolsPage;
