import { TOOLS_METADATA } from '../lib/pdf-tools-metadata';
import { locales, defaultLocale } from '@/lib/i18n-config';

export default function sitemap() {
  const baseUrl = 'https://thenextools.com';
  // Use a fixed date to avoid telling crawlers "everything changed" on every deploy.
  // Update this manually when making significant site-wide content changes.
  const lastModified = '2026-05-28T00:00:00.000Z';

  const staticRoutes = [
    '',
    '/pdf-toolkit',
    '/exif-stripper',
    '/image-compressor',
    '/image-converter',
    '/image-redactor',
    '/image-toolkit',
    '/data-recovery',
    '/contact',
    '/docs',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/sitemap',
  ];

  const dynamicRoutes = Object.keys(TOOLS_METADATA).map(
    (slug) => `/pdf-toolkit/tools/${slug}`
  );

  const baseRoutes = [...staticRoutes, ...dynamicRoutes];

  // Build sitemap entries with full hreflang alternate annotations per URL.
  // Each entry gets <xhtml:link rel="alternate"> for every locale so Google
  // can properly associate equivalent pages across languages.
  return locales.flatMap((locale) => {
    return baseRoutes.map((route) => {
      const isHome = route === '';
      const url = locale === defaultLocale
        ? `${baseUrl}${route}`
        : `${baseUrl}/${locale}${route}`;

      // Build the alternates map: { en: "https://…/route", es: "https://…/es/route", … }
      const languages = {};
      locales.forEach((l) => {
        if (l === defaultLocale) {
          languages[l] = `${baseUrl}${route}`;
        } else {
          languages[l] = `${baseUrl}/${l}${route}`;
        }
      });
      // x-default should point to the English/fallback version
      languages['x-default'] = `${baseUrl}${route}`;

      return {
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: isHome ? 1 : 0.8,
        alternates: {
          languages,
        },
      };
    });
  });
}
