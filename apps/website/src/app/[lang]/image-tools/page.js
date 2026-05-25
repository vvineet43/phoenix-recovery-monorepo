import ImageToolPage from '@/app/image-tools/page';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const isPt = lang === 'pt';
  
  return {
    title: isPt ? 'Compressor de Imagens | TheNexTools' : 'Compresor de Imágenes | TheNexTools',
    description: isPt 
      ? 'Compacte imagens JPG, PNG e WebP localmente em seu navegador. Ajuste a qualidade, escolha o formato de saída e baixe — sem uploads, sem contas, sem marcas d’água.' 
      : 'Comprime imágenes JPG, PNG y WebP localmente en tu navegador. Ajusta la calidad, elige el formato de salida y descarga — sin cargas, sin cuentas, sin marcas de agua.',
    manifest: '/image-manifest.json',
    alternates: {
      canonical: `/${lang}/image-tools`,
      languages: {
        'en': '/image-tools',
        'es': '/es/image-tools',
        'pt': '/pt/image-tools',
        'x-default': '/image-tools',
      }
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default ImageToolPage;
