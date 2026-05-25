import ExifToolsPage from '@/app/exif-tools/page';

export const metadata = {
  title: 'Limpiador de Metadatos EXIF | TheNexTools',
  description: 'Elimina coordenadas GPS, información de la cámara, marcas de tiempo y todos los metadatos ocultos de tus fotos de forma local. Sin cargas. Gratis y privado.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/es/exif-tools',
    languages: {
      'en': '/exif-tools',
      'es': '/es/exif-tools',
      'x-default': '/exif-tools',
    }
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default ExifToolsPage;
