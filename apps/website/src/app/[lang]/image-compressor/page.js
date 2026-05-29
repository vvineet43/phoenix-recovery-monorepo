import Link from 'next/link';
import { ImageCompressorPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  en: {
    title: 'Image Compressor — Shrink JPG, PNG, WebP Locally | TheNexTools',
    description: 'Compress images in your browser without uploading them. Adjust quality, compare before and after at full resolution, and download — individually or as a batch ZIP.',
    steps: [
      { title: 'Add Images', desc: 'Select or drag JPG, PNG, or WebP files into the compressor.' },
      { title: 'Tune Compression', desc: 'Adjust the quality slider and preview original vs. compressed side-by-side.' },
      { title: 'Download Output', desc: 'Save your compressed images individually or as a single consolidated ZIP.' }
    ],
    badge: 'NexCompress — Local & Private',
    h1: 'Compress images without uploading them anywhere.',
    p1: 'Every other image compressor sends your files to a server, processes them remotely, and sends them back. That\'s fine until it isn\'t — the file is too large, the queue is slow, or the image is something you\'d rather keep private. NexCompress runs the same compression algorithms directly in your browser. Faster, no size limits, and nothing leaves your machine.',
    schemaTitle: 'NexCompress Image Compressor',
    schemaHome: 'Home',
    schemaToolkit: 'Image Toolkit',
    schemaTool: 'Image Compressor',
    howToTitle: 'How to compress images offline',
    diffTitle: 'What makes this different from TinyPNG',
    diffDesc: 'The things that actually matter when you\'re compressing images on a regular basis — not just one file at a time through a web form.',
    feat1Title: 'Output to JPEG, PNG, or WebP',
    feat1Desc: 'Pick your output format as part of the compression step. PNGs with transparency stay lossless. For JPEG and WebP, drag the quality slider anywhere from 10% to 100% and the estimated file size updates as you move it. You see the trade-off before you commit.',
    feat2Title: 'Side-by-side comparison at full resolution',
    feat2Desc: 'Every compressed image gets a compare view — original on the left, compressed on the right, both at full width. You can actually see the quality difference (or lack of it) before downloading anything.',
    feat3Title: 'Batch processing with running totals',
    feat3Desc: 'Drop an entire folder in at once. NexCompress works through them sequentially and keeps a running tally of total space saved. Download files one at a time or grab the whole batch as a single ZIP.',
    feat4Title: 'No account, no upload, no artificial caps',
    feat4Desc: 'Most web compressors limit you to 5MB per file unless you sign up. Some watermark the output. NexCompress doesn\'t do any of that — the only limit is your browser\'s available memory, which on any modern machine handles hundreds of megabytes easily.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about NexCompress image compression.',
    faqQ1: 'How does local image compression work?',
    faqA1: 'It uses your browser\'s native Canvas API to decode the uploaded image, processes the pixels locally at your chosen quality level, and exports it back as a compressed JPEG, PNG, or WebP. No external servers are contacted.',
    faqQ2: 'Are my images safe with NexCompress?',
    faqA2: 'Yes, completely. Your images are never sent to a server. All processing is executed client-side on your device, ensuring total privacy.',
    faqQ3: 'Is there a file size limit?',
    faqA3: 'No, there are no artificial file size caps. The only physical limit is your device\'s available browser memory, which easily handles hundreds of megabytes.',
    faqQ4: 'Does NexCompress work offline?',
    faqA4: 'Yes. NexCompress is a Progressive Web App (PWA). Once loaded, it works entirely without an internet connection.',
    ctaTitle: 'Ready to shrink your images?',
    ctaDesc: 'Drop your files at the top of the page. Runs in Chrome, Firefox, Safari, and Edge. Nothing to install.',
    ctaButton: 'Back to Tool'
  },
  es: {
    title: 'Compresor de Imágenes — Comprimir JPG, PNG, WebP Localmente | TheNexTools',
    description: 'Comprime imágenes en tu navegador sin subirlas. Ajusta la calidad, compara antes y después a resolución completa y descarga — individual o en ZIP.',
    steps: [
      { title: 'Añadir Imágenes', desc: 'Selecciona o arrastra archivos JPG, PNG o WebP al compresor.' },
      { title: 'Ajustar Compresión', desc: 'Ajusta la barra de calidad y compara el original contra el comprimido lado a lado.' },
      { title: 'Descargar Salida', desc: 'Guarda tus imágenes comprimidas de forma individual o como un archivo ZIP consolidado.' }
    ],
    badge: 'NexCompress — Local y Privado',
    h1: 'Comprime imágenes sin subirlas a ningún sitio.',
    p1: 'La mayoría de compresores envían tus archivos a un servidor, los procesan remotamente y los devuelven. Eso está bien hasta que deja de estarlo: la cola es lenta, el archivo es demasiado grande o la imagen es algo confidencial. NexCompress ejecuta los mismos algoritmos directamente en tu navegador. Más rápido, sin límites y tus archivos no salen de tu máquina.',
    schemaTitle: 'NexCompress Compresor de Imágenes',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Compresor de Imágenes',
    howToTitle: 'Cómo comprimir imágenes sin conexión',
    diffTitle: 'Lo que nos diferencia de TinyPNG',
    diffDesc: 'Las características que realmente importan cuando comprimes imágenes de forma habitual, no de una en una en un formulario web simple.',
    feat1Title: 'Salida a JPEG, PNG o WebP',
    feat1Desc: 'Elige tu formato de salida como parte del paso de compresión. Las imágenes PNG con transparencia se mantienen sin pérdidas. Para JPEG y WebP, arrastra la barra de calidad del 10% al 100% y el tamaño estimado del archivo se actualizará mientras la mueves.',
    feat2Title: 'Comparación lado a lado a resolución completa',
    feat2Desc: 'Cada imagen comprimida obtiene una vista comparativa: original a la izquierda, comprimida a la derecha. Puedes ver la diferencia de calidad real antes de descargar nada.',
    feat3Title: 'Procesamiento por lotes y totales',
    feat3Desc: 'Suelta una carpeta entera a la vez. NexCompress las procesa secuencialmente y mantiene un recuento del espacio total ahorrado. Descarga los archivos de uno en uno o la carpeta completa como un ZIP.',
    feat4Title: 'Sin cuentas, sin cargas, sin límites artificiales',
    feat4Desc: 'La mayoría de los compresores web te limitan a 5MB por archivo a menos que te registres. Algunos añaden marcas de agua. NexCompress no hace nada de eso: el único límite es la memoria del navegador de tu dispositivo.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la compresión local con NexCompress.',
    faqQ1: '¿Cómo funciona la compresión de imágenes local?',
    faqA1: 'Utiliza la API Canvas nativa de tu navegador para decodificar la imagen cargada, procesa los píxeles localmente al nivel de calidad elegido y los vuelve a exportar como un archivo JPEG, PNG o WebP comprimido. No se contacta con ningún servidor externo.',
    faqQ2: '¿Están seguras mis imágenes con NexCompress?',
    faqA2: 'Sí, completamente. Tus imágenes nunca se envían a un servidor. Todo el procesamiento se realiza del lado del cliente en tu dispositivo, garantizando total privacidad.',
    faqQ3: '¿Existe un límite de tamaño de archivo?',
    faqA3: 'No, no hay límites artificiales de tamaño. El único límite físico es la memoria disponible del navegador de tu dispositivo, que maneja fácilmente cientos de megabytes.',
    faqQ4: '¿Funciona NexCompress sin conexión?',
    faqA4: 'Sí. NexCompress es una Aplicación Web Progresiva (PWA). Una vez cargada, funciona completamente sin conexión a Internet.',
    ctaTitle: '¿Listo para reducir el tamaño de tus imágenes?',
    ctaDesc: 'Sueltas tus archivos en la parte superior de la página. Funciona en Chrome, Firefox, Safari y Edge. Nada que instalar.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Compressor de Imagens — Compactar JPG, PNG, WebP Localmente | TheNexTools',
    description: 'Compacte imagens no seu navegador sem fazer upload. Ajuste a qualidade, compare antes e depois em resolução total e faça o download — individualmente ou em ZIP.',
    steps: [
      { title: 'Adicionar Imagens', desc: 'Selecione ou arraste arquivos JPG, PNG ou WebP para o compressor.' },
      { title: 'Ajustar Compactação', desc: 'Ajuste o controle deslizante de qualidade e compare o original com o compactado lado a lado.' },
      { title: 'Baixar Arquivos', desc: 'Salve suas imagens compactadas individualmente ou como um único arquivo ZIP consolidado.' }
    ],
    badge: 'NexCompress — Local e Privado',
    h1: 'Compacte imagens sem enviá-las a lugar nenhum.',
    p1: 'A maioria dos compressores envia seus arquivos para um servidor, processa-os remotamente e os envia de volta. Isso é bom até que não seja — o arquivo é muito grande, a fila é lenta ou a imagem é algo que você prefere manter privado. NexCompress executa os mesmos algoritmos de compactação diretamente no seu navegador. Mais rápido, sem limites de tamanho e nada sai da sua máquina.',
    schemaTitle: 'Compressor de Imagens NexCompress',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Compressor de Imagens',
    howToTitle: 'Como compactar imagens offline',
    diffTitle: 'O que nos diferencia do TinyPNG',
    diffDesc: 'As características que realmente importam quando você compacta imagens regularmente — não apenas um arquivo de cada vez por meio de um formulário da web.',
    feat1Title: 'Saída para JPEG, PNG ou WebP',
    feat1Desc: 'Escolha seu formato de saída como parte da etapa de compactação. PNGs com transparência permanecem sem perdas. Para JPEG e WebP, arraste o controle deslizante de qualidade de 10% a 100% e o tamanho estimado do arquivo é atualizado em tempo real.',
    feat2Title: 'Comparación lado a lado em resolução total',
    feat2Desc: 'Cada imagem compactada obtém uma exibição de comparação — original à esquerda, compactada à direita. Você pode realmente ver a diferença de qualidade antes de baixar qualquer coisa.',
    feat3Title: 'Processamento em lote e totais',
    feat3Desc: 'Solte uma pasta inteira de uma vez. NexCompress trabalha neles sequencialmente e mantém uma contagem contínua do espaço total economizado. Baixe os arquivos um de cada vez ou pegue o lote inteiro como um único ZIP.',
    feat4Title: 'Sem conta, sem upload, sem limites artificiais',
    feat4Desc: 'A maioria dos compressores da web limita os usuários gratuitos a 5 MB por arquivo. NexCompress não faz nada disso — o único limite é a memória disponível do seu navegador.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a compactação local com NexCompress.',
    faqQ1: 'Como funciona a compactação de imagens local?',
    faqA1: 'Ele usa a API Canvas nativa do seu navegador para decodificar a imagem enviada, processa os pixels localmente no nível de qualidade escolhido e a exporta de volta como um JPEG, PNG ou WebP compactado. Nenhum servidor externo é contatado.',
    faqQ2: 'Minhas imagens estão seguras com NexCompress?',
    faqA2: 'Sim, completamente. Suas imagens nunca são enviadas para um servidor. Todo o processamento é executado no lado do cliente no seu dispositivo, garantindo total privacidade.',
    faqQ3: 'Existe um limite de tamanho de arquivo?',
    faqA3: 'Não, não há limites de tamanho artificiais. O único limite físico é a memória disponível do navegador do seu dispositivo, que lida facilmente com centenas de megabytes.',
    faqQ4: 'O NexCompress funciona offline?',
    faqA4: 'Sim. NexCompress é um Progressive Web App (PWA). Uma vez carregado, funciona inteiramente sem conexão com a internet.',
    ctaTitle: 'Pronto para reduzir o tamanho de suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Funciona no Chrome, Firefox, Safari e Edge. Nada para instalar.',
    ctaButton: 'Voltar à Ferramenta'
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return {
    title: t.title,
    description: t.description,
    manifest: '/image-manifest.json',
    alternates: {
      canonical: `/${lang}/image-compressor`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-compressor' : `/${l}/image-compressor`;
          return acc;
        }, {}),
        'x-default': '/image-compressor',
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

export default async function ImageCompressorLanding({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": t.faqQ1,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA1
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ2,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA2
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ3,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA3
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ4,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA4
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": t.schemaTitle,
              "url": `https://thenextools.com/${lang}/image-compressor`,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": t.description,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": t.schemaHome,
                  "item": `https://thenextools.com/${lang}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t.schemaToolkit,
                  "item": `https://thenextools.com/${lang}/image-toolkit`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": t.schemaTool,
                  "item": `https://thenextools.com/${lang}/image-compressor`
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">{t.badge}</div>
        <h1>{t.h1}</h1>
        <p style={{ marginBottom: '3rem' }}>{t.p1}</p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageCompressorPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{t.howToTitle}</h2>
          <div className="premium-steps-grid">
            {t.steps.map((step, index) => (
              <div key={index} className="premium-step-card">
                <div className="premium-step-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="premium-step-badge">
                  {index + 1}
                </div>
                <h4 className="premium-step-title">{step.title}</h4>
                <p className="premium-step-text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.diffTitle}</h2>
            <p>{t.diffDesc}</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>{t.feat1Title}</h3>
              <p>{t.feat1Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat2Title}</h3>
              <p>{t.feat2Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat3Title}</h3>
              <p>{t.feat3Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat4Title}</h3>
              <p>{t.feat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>{t.faqTitle}</h2>
            <p>{t.faqSubtitle}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ1}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA1}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ2}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA2}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ3}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA3}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ4}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA4}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <a href="#" className="btn btn-primary">{t.ctaButton}</a>
        </div>
      </section>
    </>
  );
}
