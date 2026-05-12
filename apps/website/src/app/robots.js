export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/pdf-tools',
        '/exif-tools',
        '/image-tools',
      ],
    },
    sitemap: 'https://thenextools.com/sitemap.xml',
  };
}
