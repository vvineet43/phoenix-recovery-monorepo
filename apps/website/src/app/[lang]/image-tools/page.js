import ImageToolPage from '@/app/image-tools/page';

export const metadata = {
  title: 'Compresor de Imágenes | TheNexTools',
  description: 'Comprime imágenes JPG, PNG y WebP localmente en tu navegador. Ajusta la calidad, elige el formato de salida y descarga — sin cargas, sin cuentas, sin marcas de agua.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/es/image-tools',
    languages: {
      'en': '/image-tools',
      'es': '/es/image-tools',
      'x-default': '/image-tools',
    }
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default ImageToolPage;
