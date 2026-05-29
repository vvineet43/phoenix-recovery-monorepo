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
  },
  de: {
    title: 'Sitemap | TheNexTools',
    description: 'Durchsuchen Sie TheNexTools. Vollständiger Index aller unserer Online-PDF-Werkzeuge, Bildkompressoren, Metadaten-Bereiniger und Offline-Datenrettungs-Apps.',
    badge: 'Index',
    h1: 'Sitemap',
    sub: 'Finden Sie direkte Links zu jedem Dienstprogramm, Werkzeug, jeder Dokumentationsseite und den Richtlinien auf TheNexTools.',
    sec1Title: 'Hauptseiten',
    homeTitle: 'Startseite',
    homeDesc: 'Willkommen bei TheNexTools. Kostenlose Web-Dienstprogramme und Offline-Datenrettungssoftware.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Professionelle Desktop-Anwendung zur Offline-Datenrettung unter macOS und Windows.',
    docsTitle: 'Dokumentation',
    docsDesc: 'Anleitungen, Support-Ressourcen, FAQs und Integrationsdokumente für alle Dienstprogramme.',
    contactTitle: 'Kontakt',
    contactDesc: 'Wenden Sie sich an den Support, stellen Sie Abrechnungsfragen oder geben Sie allgemeines Feedback.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Alle PDF-Werkzeuge werden zu 100 % lokal in Ihrem Webbrowser ausgeführt. Es werden keine Dateien auf einen Server hochgeladen.',
    pdfWorkspaceTitle: 'NexPDF Arbeitsbereich',
    pdfWorkspaceDesc: 'Öffnen Sie die komplette PDF-Bearbeitungssuite mit Dateivorschau und Drag-and-drop-Arbeitsbereich.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage Dashboard',
    imageWorkspaceDesc: 'Greifen Sie auf unsere lokalisierten Werkzeuge zur Stapelverarbeitung und Komprimierung von Bildern zu.',
    compressorTitle: 'Bildkompressor',
    compressorDesc: 'Reduzieren Sie die Dateigröße von JPG-, PNG- und WebP-Dateien lokal mit Echtzeit-Vorschau des Komprimierungsverhältnisses.',
    converterTitle: 'Bildkonverter',
    converterDesc: 'Konvertieren Sie Bildformate lokal zwischen Formaten wie JPEG, PNG und WebP.',
    redactorTitle: 'Datenschutz-Schwärzer',
    redactorDesc: 'Machen Sie Gesichter, Nummernschilder oder vertrauliche Texte in Bildern vor dem Teilen dauerhaft unkenntlich.',
    stripperTitle: 'EXIF-Bereiniger',
    stripperDesc: 'Entfernen Sie private EXIF-Metadaten (GPS-Koordinaten, Kameramodell, Objektiv) aus Ihren Fotos.',
    sec4Title: 'Richtlinien und rechtliche Hinweise',
    privacyTitle: 'Datenschutzrichtlinie',
    privacyDesc: 'Erfahren Sie mehr über unsere Richtlinie zur lokalen Datenverarbeitung. Wir laden Ihre Dokumente niemals hoch.',
    termsTitle: 'Nutzungsbedingungen',
    termsDesc: 'Bedingungen, Konditionen, Lizenzdetails und Haftung für die Nutzung unserer Software.',
    refundTitle: 'Rückerstattungsrichtlinie',
    refundDesc: 'Informationen zu unserer 10-tägigen Rückerstattungsgarantie für NexData Recovery Pro-Lizenzen.',
    sitemapTitle: 'HTML-Sitemap',
    sitemapDesc: 'Sie sehen derzeit die HTML-Sitemap-Seite in deutscher Sprache.'
  },
  nl: {
    title: 'Sitemap | TheNexTools',
    description: 'Blader door TheNexTools. Volledige index van al onze online PDF-tools, afbeeldingscompressoren, metadatacleaners en offline dataherstel-apps.',
    badge: 'Index',
    h1: 'Sitemap',
    sub: 'Vind directe links naar elk hulpprogramma, tool, documentatiepagina en beleid op TheNexTools.',
    sec1Title: 'Hoofdpagina\'s',
    homeTitle: 'Startpagina',
    homeDesc: 'Welkom bij TheNexTools. Gratis webhulpprogramma\'s en offline dataherstelsoftware.',
    recoveryTitle: 'NexData Herstel',
    recoveryDesc: 'Professionele desktop-applicatie voor offline dataherstel op macOS en Windows.',
    docsTitle: 'Documentatie',
    docsDesc: 'Handleidingen, ondersteuningsbronnen, veelgestelde vragen en integratiedocumenten voor alle hulpprogramma\'s.',
    contactTitle: 'Contact',
    contactDesc: 'Neem contact op met de ondersteuning, stel factureringsvragen of geef algemene feedback.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Alle PDF-tools worden 100% lokaal in uw webbrowser uitgevoerd. Er worden geen bestanden geüpload naar een server.',
    pdfWorkspaceTitle: 'NexPDF Werkruimte',
    pdfWorkspaceDesc: 'Open de complete PDF-bewerkingssuite met bestandsvoorbeeld en drag-and-drop werkruimte.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage Dashboard',
    imageWorkspaceDesc: 'Toegang tot onze gelokaliseerde set tools voor batchverwerking en compressie van afbeeldingen.',
    compressorTitle: 'Afbeeldingscompressor',
    compressorDesc: 'Verklein JPG-, PNG- en WebP-bestanden lokaal met real-time compressieverhoudingvoorbeelden.',
    converterTitle: 'Afbeeldingsconverter',
    converterDesc: 'Converteer afbeeldingen lokaal tussen formaten waaronder JPEG, PNG en WebP.',
    redactorTitle: 'Privacy-Anonimiser',
    redactorDesc: 'Vervag gezichten, kentekenplaten of gevoelige tekst permanent voordat u deze deelt.',
    stripperTitle: 'EXIF-Cleaner',
    stripperDesc: 'Verwijder privé EXIF-metadata (GPS-coördinaten, cameramodel, lens) uit uw foto\'s.',
    sec4Title: 'Beleid en Juridische Kennisgevingen',
    privacyTitle: 'Privacybeleid',
    privacyDesc: 'Lees meer over ons beleid voor lokale gegevensverwerking. We uploaden uw documenten nooit.',
    termsTitle: 'Algemene Voorwaarden',
    termsDesc: 'Algemene voorwaarden, licentiedetails en aansprakelijkheid voor het gebruik van onze software.',
    refundTitle: 'Terugbetalingsbeleid',
    refundDesc: 'Informatie over onze 10-dagen-niet-goed-geld-terug-garantie voor NexData Recovery Pro-licenties.',
    sitemapTitle: 'HTML Sitemap',
    sitemapDesc: 'U bekijkt momenteel de HTML sitemappagina in het Nederlands.'
  },
  it: {
    title: 'Mappa del Sito | TheNexTools',
    description: 'Naviga in TheNexTools. Indice completo di tutti i nostri strumenti PDF online, compressori di immagini, pulitori di metadati e app di recupero dati offline.',
    badge: 'Indice',
    h1: 'Mappa del Sito',
    sub: 'Trova collegamenti diretti a ogni utility, strumento, pagina di documentazione e informativa su TheNexTools.',
    sec1Title: 'Pagine Principali',
    homeTitle: 'Pagina Iniziale',
    homeDesc: 'Benvenuto in TheNexTools. Utility web gratuite e software di recupero dati offline.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Applicazione desktop professionale per il recupero dati offline su macOS e Windows.',
    docsTitle: 'Documentazione',
    docsDesc: 'Guide, risorse di supporto, FAQ e documenti di integrazione per tutte le utility.',
    contactTitle: 'Contatto',
    contactDesc: 'Mettiti in contatto con il supporto, richiedi informazioni sulla fatturazione o fornisci un feedback generale.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Tutti gli strumenti PDF vengono eseguiti al 100% localmente nel tuo browser. Nessun file viene caricato su alcun server.',
    pdfWorkspaceTitle: 'Area di Lavoro NexPDF',
    pdfWorkspaceDesc: 'Apri la suite completa di modifica PDF con anteprima dei file e area di lavoro drag-and-drop.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Pannello NexImage',
    imageWorkspaceDesc: 'Accedi al nostro set localizzato di strumenti per l\'elaborazione e la compressione batch delle immagini.',
    compressorTitle: 'Compressore Immagini',
    compressorDesc: 'Riduci localmente le dimensioni dei file JPG, PNG e WebP con anteprime del rapporto di compressione in tempo reale.',
    converterTitle: 'Convertitore Immagini',
    converterDesc: 'Converti le immagini localmente tra formati tra cui JPEG, PNG e WebP.',
    redactorTitle: 'Redattore di Privacy',
    redactorDesc: 'Sfoca permanentemente volti, targhe o testo sensibile nelle immagini prima di condividerle.',
    stripperTitle: 'Pulitore EXIF',
    stripperDesc: 'Rimuovi i metadati EXIF privati (coordinate GPS, modello di fotocamera, obiettivo) dalle tue foto.',
    sec4Title: 'Informative e Note Legali',
    privacyTitle: 'Informativa sulla Privacy',
    privacyDesc: 'Scopri la nostra politica di elaborazione locale dei dati. Non carichiamo mai i tuoi documenti.',
    termsTitle: 'Termini di Servizio',
    termsDesc: 'Termini, condizioni, dettagli sulla licenza e responsabilità per l\'uso del nostro software.',
    refundTitle: 'Politica di Rimborso',
    refundDesc: 'Informazioni sulla nostra garanzia di rimborso di 10 giorni per le licenze NexData Recovery Pro.',
    sitemapTitle: 'Mappa del Sito HTML',
    sitemapDesc: 'Attualmente stai visualizzando la pagina della mappa del sito HTML in italiano.'
  },
  ja: {
    title: 'サイトマップ | TheNexTools',
    description: 'TheNexToolsを参照します。すべてのオンラインPDFツール、画像圧縮ツール、メタデータ削除ツール、およびオフラインデータ復元アプリの完全なインデックス。',
    badge: 'インデックス',
    h1: 'サイトマップ',
    sub: 'TheNexTools上のすべてのユーティリティ、ツール、ドキュメントページ、およびポリシーへの直接リンクを表示します。',
    sec1Title: '主要ページ',
    homeTitle: 'ホーム',
    homeDesc: 'TheNexToolsへようこそ。無料のウェブユーティリティとオフラインデータ復元ソフトウェアを提供します。',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'macOSおよびWindows向けのプロフェッショナルなオフラインデータ復元デスクトップアプリケーション。',
    docsTitle: 'ドキュメント',
    docsDesc: 'すべてのユーティリティに関するガイド、サポートリソース、よくある質問、および統合ドキュメント。',
    contactTitle: 'お問い合わせ',
    contactDesc: 'サポートへのお問い合わせ、お支払いに関するご質問、または一般的なフィードバック。',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'すべてのPDFツールはブラウザ内で100%ローカルに実行されます。ファイルがサーバーにアップロードされることはありません。',
    pdfWorkspaceTitle: 'NexPDF ワークスペース',
    pdfWorkspaceDesc: 'ファイルプレビューとドラッグ＆ドロップ対応のワークスペースを備えた、完全なPDF編集スイートを開きます。',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage ダッシュボード',
    imageWorkspaceDesc: '画像の一括処理および圧縮を行うローカルツールセットにアクセスします。',
    compressorTitle: '画像圧縮',
    compressorDesc: '圧縮率をリアルタイムでプレビューしながら、JPG、PNG、WebPファイルをローカルで圧縮します。',
    converterTitle: '画像変換',
    converterDesc: 'JPEG、PNG、WebPなどの間で、画像をローカルで相互変換します。',
    redactorTitle: 'プライバシーぼかし',
    redactorDesc: '写真を共有する前に、顔、ナンバープレート、または機密テキストを永久にぼかします。',
    stripperTitle: 'EXIF削除',
    stripperDesc: '写真からプライベートなEXIFメタデータ（GPS座標、カメラモデル、レンズ情報など）を削除します。',
    sec4Title: 'ポリシーと法的通知',
    privacyTitle: 'プライバシーポリシー',
    privacyDesc: 'ローカルでのデータ処理ポリシーについて説明します。ドキュメントをアップロードすることは一切ありません。',
    termsTitle: '利用規約',
    termsDesc: 'ソフトウェアの使用に関する条件、ライセンスの詳細、および免責事項。',
    refundTitle: '返金ポリシー',
    refundDesc: 'NexData Recovery Proライセンスの10日間返金保証に関する情報。',
    sitemapTitle: 'HTML サイトマップ',
    sitemapDesc: '現在、日本語のHTMLサイトマップページを表示しています。'
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
