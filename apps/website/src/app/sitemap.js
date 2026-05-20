import { TOOLS_METADATA } from '../lib/pdf-tools-metadata';

export default function sitemap() {
  const baseUrl = 'https://thenextools.com';

  const staticRoutes = [
    '',
    '/pdf-toolkit',
    '/exif-stripper',
    '/image-compressor',
    '/data-recovery',
    '/docs',
    '/privacy',
    '/terms',
    '/refund-policy',
  ];

  const dynamicRoutes = Object.keys(TOOLS_METADATA).map(
    (slug) => `/pdf-toolkit/tools/${slug}`
  );

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
