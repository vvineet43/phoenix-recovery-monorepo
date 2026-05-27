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
      url: `https://thenextools.com/${locale}/exif-tools`,
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
    },
    twitter: {
      title: `${d.imageToolkit.stripperTitle} | ${d.nav.brand}`,
      description: d.imageToolkit.stripperDesc,
    }
  };
}

export default ExifToolsPage;
