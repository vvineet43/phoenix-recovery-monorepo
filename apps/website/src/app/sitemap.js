import { TOOLS_METADATA } from '../lib/pdf-tools-metadata';
import { locales, defaultLocale } from '@/lib/i18n-config';

export default function sitemap() {
  const baseUrl = 'https://thenextools.com';

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
  ];

  const dynamicRoutes = Object.keys(TOOLS_METADATA).map(
    (slug) => `/pdf-toolkit/tools/${slug}`
  );

  const baseRoutes = [...staticRoutes, ...dynamicRoutes];
  const allRoutes = [];

  baseRoutes.forEach((route) => {
    // Add default prefixless route
    allRoutes.push(route);

    // Add prefixed routes for non-default locales
    locales.forEach((locale) => {
      if (locale !== defaultLocale) {
        allRoutes.push(`/${locale}${route}`);
      }
    });
  });

  return allRoutes.map((route) => {
    const isHome = route === '' || locales.some((l) => l !== defaultLocale && route === `/${l}`);
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: isHome ? 1 : 0.8,
    };
  });
}
