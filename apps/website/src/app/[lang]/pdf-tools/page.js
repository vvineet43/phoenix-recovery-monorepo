import PdfToolsPage from '@/app/pdf-tools/page';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  
  return {
    title: `${d.home.pdfToolkitTitle} | ${d.nav.brand}`,
    description: d.home.pdfToolkitDesc,
    manifest: '/pdf-manifest.json',
    alternates: {
      canonical: locale === 'en' ? '/pdf-tools' : `/${locale}/pdf-tools`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/pdf-tools' : `/${l}/pdf-tools`;
          return acc;
        }, {}),
        'x-default': '/pdf-tools',
      }
    },
    openGraph: {
      title: `${d.home.pdfToolkitTitle} | ${d.nav.brand}`,
      description: d.home.pdfToolkitDesc,
      url: `https://thenextools.com/${locale}/pdf-tools`,
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default PdfToolsPage;
