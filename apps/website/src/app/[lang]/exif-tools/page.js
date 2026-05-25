import ExifToolsPage from '@/app/exif-tools/page';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const isPt = lang === 'pt';
  
  return {
    title: isPt ? 'Removedor de Metadados EXIF | TheNexTools' : 'Limpiador de Metadatos EXIF | TheNexTools',
    description: isPt 
      ? 'Remova coordenadas GPS, informações da câmera, carimbos de data/hora e todos os metadados ocultos de suas fotos de forma local. Sem uploads. Grátis e privado.' 
      : 'Elimina coordenadas GPS, información de la cámara, marcas de tiempo y todos los metadatos ocultos de tus fotos de forma local. Sin cargas. Gratis y privado.',
    manifest: '/exif-manifest.json',
    alternates: {
      canonical: `/${lang}/exif-tools`,
      languages: {
        'en': '/exif-tools',
        'es': '/es/exif-tools',
        'pt': '/pt/exif-tools',
        'x-default': '/exif-tools',
      }
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default ExifToolsPage;
