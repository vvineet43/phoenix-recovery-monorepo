import PdfToolsPage from '@/app/pdf-tools/page';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const isPt = lang === 'pt';
  
  return {
    title: isPt ? 'Ferramentas de PDF | TheNexTools' : 'Herramientas de PDF | TheNexTools',
    description: isPt 
      ? 'Mescle, divida, adicione marcas d’água e processe seus documentos PDF com segurança nativamente em seu navegador.' 
      : 'Combina, divide, añade marcas de agua y procesa tus documentos PDF de forma segura y nativa en tu navegador.',
    manifest: '/pdf-manifest.json',
    alternates: {
      canonical: `/${lang}/pdf-tools`,
      languages: {
        'en': '/pdf-tools',
        'es': '/es/pdf-tools',
        'pt': '/pt/pdf-tools',
        'x-default': '/pdf-tools',
      }
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default PdfToolsPage;
