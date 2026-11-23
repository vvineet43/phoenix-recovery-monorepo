import { TOOLS_METADATA } from './pdf-tools-metadata';
import { locales, defaultLocale } from './i18n-config';

export function getSitemapEntries() {
  const baseUrl = 'https://thenextools.com';
  // Update when making significant site-wide content changes.
  const lastModified = '2026-11-19T00:00:00.000Z';

  const coreStaticRoutes = [
    '',
    '/pdf-toolkit',
    '/exif-stripper',
    '/image-compressor',
    '/image-converter',
    '/image-redactor',
    '/image-toolkit',
    '/data-recovery',
  ];

  const resourceRoutes = [
    '/docs',
    '/contact',
  ];

  const legalRoutes = [
    '/privacy',
    '/terms',
    '/refund-policy',
  ];

  const dynamicRoutes = Object.keys(TOOLS_METADATA).map(
    (slug) => `/pdf-toolkit/tools/${slug}`
  );

  const highValueRoutes = [...coreStaticRoutes, ...dynamicRoutes];

  const buildAlternates = (route) => {
    const languages = {};
    locales.forEach((l) => {
      if (l === defaultLocale) {
        languages[l] = route === '' ? `${baseUrl}/` : `${baseUrl}${route}`;
      } else {
        languages[l] = `${baseUrl}/${l}${route}`;
      }
    });
    languages['x-default'] = route === '' ? `${baseUrl}/` : `${baseUrl}${route}`;
    return { languages };
  };

  const entries = [];

  // 1. Core toolkits and tool landing pages across all locales (highest crawl priority)
  for (const locale of locales) {
    for (const route of highValueRoutes) {
      const isHome = route === '';
      const isDefault = locale === defaultLocale;
      const url = isDefault
        ? (isHome ? `${baseUrl}/` : `${baseUrl}${route}`)
        : `${baseUrl}/${locale}${route}`;

      entries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: isHome ? (isDefault ? 1.0 : 0.9) : (isDefault ? 0.9 : 0.7),
        alternates: buildAlternates(route),
      });
    }
  }

  // 2. Documentation & contact pages (medium priority, English + localized)
  for (const locale of locales) {
    for (const route of resourceRoutes) {
      const isDefault = locale === defaultLocale;
      const url = isDefault ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: 'monthly',
        priority: isDefault ? 0.5 : 0.3,
        alternates: buildAlternates(route),
      });
    }
  }

  // 3. Legal pages (low priority, canonical English only to preserve crawl budget for tool pages)
  for (const route of legalRoutes) {
    entries.push({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: buildAlternates(route),
    });
  }

  return entries;
}
