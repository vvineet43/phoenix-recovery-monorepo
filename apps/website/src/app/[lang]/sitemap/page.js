import Link from 'next/link';
import { TOOLS_METADATA } from '@/lib/pdf-tools-metadata';
import { 
  FileText, Image, ArrowRight, ShieldCheck, Home
} from 'lucide-react';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Mapa del Sitio | TheNexTools',
    description: 'Navega por TheNexTools. Índice completo de todas nuestras herramientas de PDF en línea, compresores de imágenes, limpiadores de metadatos y aplicaciones de recuperación de datos sin conexión.',
    badge: 'Índice',
    h1: 'Mapa del Sitio',
    sub: 'Encuentra enlaces directos a cada utilidad, herramienta, página de documentación y políticas en TheNexTools.',
    sec1Title: 'Páginas Principales',
    homeTitle: 'Página de Inicio',
    homeDesc: 'Bienvenido a TheNexTools. Utilidades web gratuitas y software de recuperación de datos sin conexión.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Aplicación de escritorio profesional para la recuperación de datos sin conexión en macOS y Windows.',
    docsTitle: 'Documentación',
    docsDesc: 'Guías, recursos de soporte, preguntas frecuentes y documentación de integración para todas las utilidades.',
    contactTitle: 'Contacto',
    contactDesc: 'Ponte en contacto con soporte, consultas de facturación o comentarios generales.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Todas las herramientas PDF se ejecutan al 100% localmente en tu navegador. Ningún archivo se carga a ningún servidor.',
    pdfWorkspaceTitle: 'Espacio de Trabajo NexPDF',
    pdfWorkspaceDesc: 'Abre la suite de edición de PDF completa con vista previa de archivos y área de trabajo de arrastrar y soltar.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Panel NexImage',
    imageWorkspaceDesc: 'Accede a nuestro conjunto localizado de herramientas para procesamiento y compresión de imágenes por lotes.',
    compressorTitle: 'Compresor de Imágenes',
    compressorDesc: 'Reduce el peso de archivos JPG, PNG y WebP de forma local con vistas previas de relación de compresión en tiempo real.',
    converterTitle: 'Convertidor de Imágenes',
    converterDesc: 'Convierte formatos de imágenes localmente entre formatos que incluyen JPEG, PNG y WebP.',
    redactorTitle: 'Difuminador de Privacidad',
    redactorDesc: 'Difumina de forma permanente rostros, matrículas o texto confidencial en las imágenes antes de compartirlas.',
    stripperTitle: 'Limpiador EXIF',
    stripperDesc: 'Elimina los metadatos EXIF privados (coordenadas GPS, modelo de cámara, lente) de tus fotografías.',
    sec4Title: 'Políticas y Avisos Legales',
    privacyTitle: 'Política de Privacidad',
    privacyDesc: 'Conoce nuestra política de procesamiento de datos local. Nunca cargamos tus documentos.',
    termsTitle: 'Términos de Servicio',
    termsDesc: 'Términos, condiciones, detalles de licencia y responsabilidad por el uso de nuestro software.',
    refundTitle: 'Política de Reembolso',
    refundDesc: 'Información sobre nuestra garantía de reembolso de 10 días para las licencias de NexData Recovery Pro.',
    sitemapTitle: 'Mapa del Sitio HTML',
    sitemapDesc: 'Actualmente estás viendo la página del mapa del sitio HTML en español.'
  },
  pt: {
    title: 'Mapa do Site | TheNexTools',
    description: 'Navegue pelo TheNexTools. Índice completo de todas as nossas ferramentas de PDF online, compressores de imagem, removedores de metadados e aplicativos de recuperação de dados offline.',
    badge: 'Índice',
    h1: 'Mapa do Site',
    sub: 'Encontre links diretos para cada utilitário, ferramenta, página de documentação e políticas no TheNexTools.',
    sec1Title: 'Páginas Principais',
    homeTitle: 'Página Inicial',
    homeDesc: 'Bem-vindo ao TheNexTools. Utilitários web gratuitos e software de recuperação de dados offline.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Aplicativo de desktop profissional para recuperação de dados offline no macOS e Windows.',
    docsTitle: 'Documentação',
    docsDesc: 'Guias, recursos de suporte, FAQs e documentos de integração para todos os utilitários.',
    contactTitle: 'Contato',
    contactDesc: 'Entre em contato com suporte, dúvidas sobre faturamento ou feedback geral.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Todas as ferramentas PDF funcionam 100% localmente em seu navegador web. Nenhum arquivo é enviado para qualquer servidor.',
    pdfWorkspaceTitle: 'Espaço de Trabalho NexPDF',
    pdfWorkspaceDesc: 'Abra a suíte completa de edição de PDF com pré-visualização de arquivos e espaço de trabalho arrastar e soltar.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Painel NexImage',
    imageWorkspaceDesc: 'Acesse nossa suíte localizada de processamento e compactação de imagens em lote.',
    compressorTitle: 'Compressor de Imagens',
    compressorDesc: 'Reduza arquivos JPG, PNG e WebP localmente com visualizações de taxa de compactação em tempo real.',
    converterTitle: 'Conversor de Imagens',
    converterDesc: 'Converta imagens localmente entre formatos incluindo JPEG, PNG e WebP.',
    redactorTitle: 'Redator de Privacidade',
    redactorDesc: 'Desfoque rostos, placas ou textos confidenciais permanentemente antes de compartilhar.',
    stripperTitle: 'Removedor EXIF',
    stripperDesc: 'Remova metadados EXIF privados (coordenadas GPS, modelo da câmera, lentes) das fotos.',
    sec4Title: 'Políticas e Avisos Legais',
    privacyTitle: 'Política de Privacidade',
    privacyDesc: 'Saiba mais sobre nossa política de processamento local. Nunca enviamos seus documentos.',
    termsTitle: 'Termos de Serviço',
    termsDesc: 'Termos, condições, detalhes de licença e responsabilidade pelo uso do nosso software.',
    refundTitle: 'Política de Reembolso',
    refundDesc: 'Informações sobre nossa garantia de reembolso de 10 dias para licenças do NexData Recovery Pro.',
    sitemapTitle: 'Mapa do Site HTML',
    sitemapDesc: 'Você está visualizando atualmente a página do mapa do site HTML em português.'
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/sitemap`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/sitemap' : `/${l}/sitemap`;
          return acc;
        }, {}),
        'x-default': '/sitemap',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}

export default async function SitemapPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  const pdfTools = Object.entries(TOOLS_METADATA).map(([slug, meta]) => ({
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    desc: meta.description.split('.')[0] + '.',
  }));

  const getLink = (path) => {
    return `/${lang}${path}`;
  };

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>{t.badge}</div>
        <h1 style={{ marginBottom: '1rem' }}>{t.h1}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          {t.sub}
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Main Sections */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Home size={20} /></span>
              {t.sec1Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={`/${lang}`} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.homeTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.homeDesc}</p>
              </Link>
              <Link href={getLink('/data-recovery')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.recoveryTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.recoveryDesc}</p>
              </Link>
              <Link href={getLink('/docs')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.docsTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.docsDesc}</p>
              </Link>
              <Link href={getLink('/contact')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.contactTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.contactDesc}</p>
              </Link>
            </div>
          </div>

          {/* PDF Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><FileText size={20} /></span>
              {t.sec2Title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {t.sec2Sub}
            </p>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit')} className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>{t.pdfWorkspaceTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.pdfWorkspaceDesc}</p>
              </Link>
              {pdfTools.map((tTool) => (
                <Link key={tTool.slug} href={getLink(`/pdf-toolkit/tools/${tTool.slug}`)} className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3>{
                      lang === 'es' ? (
                        tTool.title === 'Merge Pdf' ? 'Combinar PDF' : tTool.title === 'Split Pdf' ? 'Dividir PDF' : tTool.title === 'Compress Pdf' ? 'Comprimir PDF' : tTool.title === 'Watermark Pdf' ? 'Marca de Agua PDF' : tTool.title === 'Protect Pdf' ? 'Proteger PDF' : tTool.title === 'Unlock Pdf' ? 'Desbloquear PDF' : tTool.title === 'Sign Pdf' ? 'Firmar PDF' : tTool.title
                      ) : (
                        tTool.title === 'Merge Pdf' ? 'Mesclar PDF' : tTool.title === 'Split Pdf' ? 'Dividir PDF' : tTool.title === 'Compress Pdf' ? 'Compactar PDF' : tTool.title === 'Watermark Pdf' ? 'Marca de Água PDF' : tTool.title === 'Protect Pdf' ? 'Proteger PDF' : tTool.title === 'Unlock Pdf' ? 'Desbloquear PDF' : tTool.title === 'Sign Pdf' ? 'Assinar PDF' : tTool.title
                      )
                    }</h3>
                    <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                  </div>
                  <p>{tTool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Image Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Image size={20} /></span>
              {t.sec3Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={getLink('/image-toolkit')} className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>{t.imageWorkspaceTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.imageWorkspaceDesc}</p>
              </Link>
              <Link href={getLink('/image-compressor')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.compressorTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.compressorDesc}</p>
              </Link>
              <Link href={getLink('/image-converter')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.converterTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.converterDesc}</p>
              </Link>
              <Link href={getLink('/image-redactor')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.redactorTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.redactorDesc}</p>
              </Link>
              <Link href={getLink('/exif-stripper')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.stripperTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.stripperDesc}</p>
              </Link>
            </div>
          </div>

          {/* Legal / Policy Pages */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><ShieldCheck size={20} /></span>
              {t.sec4Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={getLink('/privacy')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.privacyTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.privacyDesc}</p>
              </Link>
              <Link href={getLink('/terms')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.termsTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.termsDesc}</p>
              </Link>
              <Link href={getLink('/refund-policy')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.refundTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.refundDesc}</p>
              </Link>
              <Link href={getLink('/sitemap')} className="dashboard-card" style={{ borderStyle: 'dashed' }}>
                <div className="dashboard-card-header">
                  <h3>{t.sitemapTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.sitemapDesc}</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
