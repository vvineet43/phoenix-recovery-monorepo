import ImageToolPage from '@/app/image-tools/page';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  
  return {
    title: `${d.home.imageToolkitTitle} | ${d.nav.brand}`,
    description: d.home.imageToolkitDesc,
    manifest: '/image-manifest.json',
    alternates: {
      canonical: locale === 'en' ? '/image-tools' : `/${locale}/image-tools`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-tools' : `/${l}/image-tools`;
          return acc;
        }, {}),
        'x-default': '/image-tools',
      }
    },
    openGraph: {
      title: `${d.home.imageToolkitTitle} | ${d.nav.brand}`,
      description: d.home.imageToolkitDesc,
      url: `https://thenextools.com/${locale}/image-tools`,
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default ImageToolPage;
