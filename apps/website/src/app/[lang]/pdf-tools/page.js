import PdfToolsPage from '@/app/pdf-tools/page';

export const metadata = {
  title: 'Herramientas de PDF | TheNexTools',
  description: 'Combina, divide, añade marcas de agua y procesa tus documentos PDF de forma segura y nativa en tu navegador.',
  manifest: '/pdf-manifest.json',
  alternates: {
    canonical: '/es/pdf-tools',
    languages: {
      'en': '/pdf-tools',
      'es': '/es/pdf-tools',
      'x-default': '/pdf-tools',
    }
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default PdfToolsPage;
