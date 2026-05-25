import Link from 'next/link';
import { ImageConverterPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const TRANSLATIONS = {
  es: {
    title: 'Convertidor de Formatos de Imagen — JPG a WebP, PNG a JPG, Localmente | TheNexTools',
    description: 'Convierte imágenes entre JPG, PNG y WebP sin subirlas. Convierte carpetas enteras por lotes, conserva la transparencia y descarga en ZIP.',
    steps: [
      { title: 'Seleccionar Archivos', desc: 'Selecciona o arrastra imágenes sin procesar de cualquier formato al espacio de trabajo.' },
      { title: 'Elegir Formato', desc: 'Elige el formato de salida (JPG, PNG, WebP) y define las opciones de calidad.' },
      { title: 'Exportar en Lote', desc: 'Haz clic en convertir y descarga los archivos convertidos como un paquete ZIP limpio.' }
    ],
    badge: 'NexConvert — Local y Privado',
    h1: 'Deja de subir imágenes solo para cambiar el formato.',
    p1: 'Tienes una carpeta de imágenes PNG que deben ser WebP para tu web. O un lote de WebP que un cliente necesita en JPEG. Todos los convertidores online te piden que las subas de una en una, esperes y descargues. NexConvert maneja toda la carpeta a la vez — localmente, en tu navegador, sin colas ni límites de tamaño.',
    schemaTitle: 'NexConvert Convertidor de Formatos',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Convertir Formato',
    howToTitle: 'Cómo convertir imágenes sin conexión',
    diffTitle: 'Cómo funciona',
    diffDesc: 'Tu navegador ya sabe cómo decodificar y volver a codificar imágenes a través de la API Canvas. NexConvert simplemente te ofrece una interfaz adecuada para ello.',
    feat1Title: 'Cualquier combinación de formatos',
    feat1Desc: 'JPG a WebP, PNG a JPG, WebP a PNG... en cualquier dirección. Suelta una carpeta con varios formatos y conviértelos a un único formato de destino. Ajusta la calidad de salida para JPG y WebP.',
    feat2Title: 'Transparencia manejada correctamente',
    feat2Desc: '¿Vas a convertir a PNG? Los canales alfa se conservan exactamente. No tendrás un rectángulo blanco donde solía estar tu logotipo transparente. ¿De PNG a JPG? El fondo se rellena limpiamente de blanco.',
    feat3Title: 'Sin cargas, sin registros, sin límites diarios',
    feat3Desc: 'La mayoría de convertidores gratuitos limitan a 5MB o 20 archivos por día. NexConvert no tiene límites porque no hay servidor implicado: es solo tu CPU haciendo el trabajo.',
    feat4Title: 'Funciona sin conexión tras la primera visita',
    feat4Desc: 'NexConvert es una Aplicación Web Progresiva (PWA). Cárgala una vez y funcionará sin conexión a Internet en el futuro. Agrégala a tu dock o pantalla de inicio.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la conversión local con NexConvert.',
    faqQ1: '¿Cómo funciona la conversión de imágenes en el navegador?',
    faqA1: 'Utiliza la API Canvas de HTML5 en tu navegador para decodificar el formato de imagen cargado (como PNG, JPG o WebP) y volver a codificarlo directamente al formato de destino. El proceso se ejecuta localmente en tu CPU.',
    faqQ2: '¿Se conservará la transparencia de la imagen durante la conversión?',
    faqA2: 'Sí. Al convertir a PNG o WebP, la transparencia se conserva por completo. Al convertir a JPEG (que no admite transparencia), el fondo transparente se rellena con color blanco.',
    faqQ3: '¿Cuántos archivos puedo convertir a la vez?',
    faqA3: 'Puedes seleccionar y convertir docenas o cientos de archivos simultáneamente. Como el procesamiento ocurre localmente en tu máquina, no hay colas ni límites de uso.',
    faqQ4: '¿Están seguros mis archivos durante la conversión?',
    faqA4: 'Totalmente. Como la utilidad se ejecuta puramente dentro de tu navegador cliente sin cargas al servidor, tus fotos nunca salen de tu dispositivo.',
    ctaTitle: '¿Listo para convertir tus imágenes?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Funciona en cualquier navegador moderno sin conexión.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Conversor de Formatos de Imagem — JPG para WebP, PNG para JPG, Localmente | TheNexTools',
    description: 'Converta imagens entre JPG, PNG e WebP sem fazer upload. Converta pastas inteiras em lote, preserve a transparência e baixe como ZIP — tudo no seu navegador.',
    steps: [
      { title: 'Selecionar Arquivos', desc: 'Selecione ou arraste imagens brutas de qualquer formato para o espaço de trabalho.' },
      { title: 'Selecionar Formato', desc: 'Escolha o formato de saída (JPG, PNG, WebP) e defina as opções de qualidade.' },
      { title: 'Exportar em Lote', desc: 'Clique em converter e baixe os arquivos convertidos como um pacote ZIP limpo.' }
    ],
    badge: 'NexConvert — Local e Privado',
    h1: 'Pare de enviar imagens apenas para alterar o formato.',
    p1: 'Você tem uma pasta de PNGs que precisam ser WebP para o seu site. Ou um lote de WebPs que um cliente precisa como JPEGs. Cada conversor online quer que você os envie um de cada vez, espere, baixe, repita. NexConvert lida com a pasta inteira de uma vez — localmente, em seu navegador, sem fila e sem limite de tamanho de arquivo.',
    schemaTitle: 'Conversor de Imagem NexConvert',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Converter Formato',
    howToTitle: 'Como converter imagens offline',
    diffTitle: 'Como funciona',
    diffDesc: 'Seu navegador já sabe decodificar e recodificar imagens por meio da API Canvas. NexConvert apenas fornece uma interface adequada para isso.',
    feat1Title: 'Todas as combinações de formatos',
    feat1Desc: 'JPG para WebP, PNG para JPG, WebP para PNG — qualquer direção. Solte uma pasta mista e converta tudo para um formato de destino em uma única operação. Ajuste a qualidade para saída JPG e WebP com um controle deslizante.',
    feat2Title: 'Transparência tratada corretamente',
    feat2Desc: 'Convertendo para PNG? Os canais alfa são preservados exatamente. Você não terminará com um retângulo branco onde costumava ficar seu logotipo transparente. Convertendo de PNG para JPG? O fundo é preenchido de forma limpa com branco.',
    feat3Title: 'Sem upload, sem registro, sem limite diário',
    feat3Desc: 'A maioria dos conversores gratuitos limita você a 5 MB ou 20 arquivos por dia. NexConvert não tem limites porque não há servidor envolvido — é apenas a sua CPU fazendo o trabalho.',
    feat4Title: 'Funciona offline após a primeira visita',
    feat4Desc: 'NexConvert é um Progressive Web App (PWA). Carregue-o uma vez e ele funcionará sem conexão com a internet de agora em diante. Adicione-o ao seu dock ou tela inicial.',
    faqTitle: 'Perguntas Frecuentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a conversão local com o NexConvert.',
    faqQ1: 'Como funciona a conversão de imagem baseada em navegador?',
    faqA1: 'Ele usa a API HTML5 Canvas no seu navegador para decodificar o formato de imagem enviado (como PNG, JPG ou WebP) e codificá-lo novamente direto para o formato de destino desejado. O processo é executado localmente na sua CPU.',
    faqQ2: 'A transparência da imagem será preservada durante a conversão?',
    faqA2: 'Sim. Se estiver convertendo para PNG ou WebP, a transparência é totalmente preservada. Ao converter imagens transparentes para JPEG (que não suporta canais alfa), a transparência é preenchida de forma limpa com um fundo branco sólido.',
    faqQ3: 'Quantos arquivos posso converter de uma vez?',
    faqA3: 'Você pode selecionar e converter dezenas ou centenas de arquivos simultaneamente. Como o processamento ocorre localmente na sua máquina, não há atrasos em filas na nuvem ou limites diários.',
    faqQ4: 'Meus arquivos estão seguros durante a conversão do formato?',
    faqA4: 'Totalmente. Como o utilitário roda puramente dentro do seu navegador cliente sem uploads no servidor, suas fotos nunca saem do seu dispositivo.',
    ctaTitle: 'Pronto para converter suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Funciona em qualquer navegador moderno offline.',
    ctaButton: 'Voltar à Ferramenta'
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return {
    title: t.title,
    description: t.description,
    manifest: '/image-manifest.json',
    alternates: {
      canonical: `/${lang}/image-converter`,
      languages: {
        'en': '/image-converter',
        'es': '/es/image-converter',
        'pt': '/pt/image-converter',
        'x-default': '/image-converter',
      }
    },
  };
}

export default async function ImageConverterLanding({ params }) {
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
              "url": `https://thenextools.com/${lang}/image-converter`,
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
                  "item": `https://thenextools.com/${lang}/image-converter`
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
          <ImageConverterPageWrapper hideHeader={true} />
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
