export default function sitemap() {
  const baseUrl = 'https://thenextools.com';

  const routes = [
    '',
    '/pdf-toolkit',
    '/exif-stripper',
    '/image-compressor',
    '/data-recovery',
    '/docs',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
