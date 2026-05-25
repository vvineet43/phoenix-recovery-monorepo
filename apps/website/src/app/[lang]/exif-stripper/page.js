import Link from 'next/link';
import { ExifStripperPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const TRANSLATIONS = {
  es: {
    title: 'Limpiador de Metadatos EXIF — Eliminar Datos de GPS y Cámara de Fotos | TheNexTools',
    description: 'Mira los datos ocultos en tus fotos — ubicación GPS, modelo de dispositivo, marcas de tiempo — y elimínalos antes de compartir. Se ejecuta en tu navegador.',
    steps: [
      { title: 'Soltar Fotos', desc: 'Selecciona o arrastra tus fotos al área del analizador EXIF.' },
      { title: 'Inspeccionar Metadatos', desc: 'Ver todas las coordenadas GPS incrustadas, modelos de cámara y marcas de tiempo.' },
      { title: 'Limpiar y Descargar', desc: 'Haz clic en limpiar EXIF para generar archivos de imagen sanitizados sin campos ocultos.' }
    ],
    badge: 'NexStrip — Gratis y Privado',
    h1: 'Tus fotos saben dónde vives. En serio.',
    p1: 'Cada foto de tu teléfono tiene coordenadas GPS guardadas en el archivo, con precisión de pocos metros. También tiene el modelo de tu dispositivo, la hora exacta de la captura y, a veces, tu nombre. La mayoría de la gente no sabe que estos datos existen. NexStrip te muestra todo y luego lo elimina antes de que compartas la foto.',
    schemaTitle: 'NexStrip Limpiador de Metadatos EXIF',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Limpiar EXIF',
    howToTitle: 'Cómo eliminar datos EXIF sin conexión',
    diffTitle: 'Lo que realmente se esconde en tus fotos',
    diffDesc: 'Los metadatos EXIF fueron diseñados para fabricantes de cámaras, no para redes sociales. Esto es lo que se incrusta por defecto.',
    feat1Title: 'Coordenadas GPS',
    feat1Desc: 'Si los servicios de ubicación estaban activos al tomar la foto, el archivo contiene la latitud y longitud exactas. ¿Publicas una foto de tu salón? Acabas de publicar tu dirección para cualquiera que sepa cómo verificar las propiedades del archivo.',
    feat2Title: 'Huella digital del dispositivo',
    feat2Desc: 'Marca de la cámara, modelo, número de serie, versión de software, datos de la lente... todo se almacena en la imagen. En contextos legales o de investigación, esto puede vincular una foto a un dispositivo específico.',
    feat3Title: 'Marcas de tiempo y ajustes de captura',
    feat3Desc: 'La hora de captura original, las marcas de tiempo de edición, ISO, velocidad de obturación, apertura... todo está allí. Si prefieres no difundir exactamente cuándo y cómo tomaste cada foto, limpiar esto es higiene digital básica.',
    feat4Title: 'Procesamiento 100% local',
    feat4Desc: 'NexStrip lee y elimina metadatos por completo dentro de tu navegador. Sin servidores. Procesa lotes completos de carpetas y descarga copias limpias de forma individual o en un ZIP. Funciona sin conexión.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la limpieza de metadatos con NexStrip.',
    faqQ1: '¿Qué son los metadatos EXIF?',
    faqA1: 'EXIF (Exchangeable Image File Format) son datos incrustados directamente dentro de los archivos de imagen al capturar fotos. Contiene detalles como modelos de cámara, marcas de tiempo, ajustes de exposición y, a veces, coordenadas GPS exactas.',
    faqQ2: '¿Cómo elimina NexStrip estos datos?',
    faqA2: 'Carga la foto en tu navegador local, extrae los datos de píxeles sin procesar y la vuelve a exportar como una imagen limpia sin copiar los encabezados de metadatos. Esto destruye los datos EXIF de forma permanente.',
    faqQ3: '¿Está garantizada mi privacidad?',
    faqA3: 'Sí. NexStrip funciona completamente del lado del cliente. El análisis y la eliminación de metadatos ocurren en tu navegador. Ningún archivo, dato o coordenada se sube a ningún servidor.',
    faqQ4: '¿Qué formatos de imagen son compatibles?',
    faqA4: 'NexStrip es compatible con archivos de imagen JPEG, JPG y PNG, que son los formatos más comunes que incrustan metadatos de cámara.',
    ctaTitle: '¿Listo para limpiar tus fotos?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Todos los metadatos se eliminan en tu navegador.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Removedor de Metadados EXIF — Remover Dados de GPS e Câmera das Fotos | TheNexTools',
    description: 'Veja os dados ocultos em suas fotos — localização GPS, modelo do dispositivo, carimbos de data/hora — e remova tudo antes de compartilhar. Funciona localmente em seu navegador.',
    steps: [
      { title: 'Soltar Fotos', desc: 'Selecione ou arraste suas fotos para a área do analisador EXIF.' },
      { title: 'Inspecionar Metadados', desc: 'Visualizar todas as coordenadas GPS incorporadas, modelos de câmera e carimbos de data/hora.' },
      { title: 'Remover e Baixar', desc: 'Clique em remover EXIF para gerar arquivos de imagem limpos e sem campos ocultos.' }
    ],
    badge: 'NexStrip — Grátis e Privado',
    h1: 'Suas fotos sabem onde você mora. Sério.',
    p1: 'Cada foto do seu telefone tem coordenadas GPS gravadas no arquivo — precisas a poucos metros. Também tem o modelo do seu dispositivo, a hora exata em que tirou a foto e, às vezes, seu nome. A maioria das pessoas não tem ideia de que esses dados estão lá. NexStrip mostra tudo a você e, em seguida, remove antes de você compartilhar a foto.',
    schemaTitle: 'Removedor de Metadados EXIF NexStrip',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Removedor EXIF',
    howToTitle: 'Como remover dados EXIF offline',
    diffTitle: 'O que está realmente escondido em suas fotos',
    diffDesc: 'Os metadatos EXIF foram projetados para fabricantes de câmeras, não para redes sociais. Aqui está o que é incorporado por padrão.',
    feat1Title: 'Coordenadas GPS',
    feat1Desc: 'Se os serviços de localização estavam ativos ao tirar a foto, o arquivo contém a latitude e longitude exatas. Postando uma foto da sua sala? Você acabou de postar seu endereço residencial para quem souber verificar as propriedades do arquivo.',
    feat2Title: 'Impressão digital do dispositivo',
    feat2Desc: 'Marca da câmera, modelo, número de série, versão do software, dados da lente... tudo é armazenado no arquivo de imagem. Em contextos legais ou investigativos, isso pode vincular diretamente uma foto a um dispositivo específico.',
    feat3Title: 'Carimbos de data/hora e configurações de captura',
    feat3Desc: 'A hora de captura original, marcas de tempo de edição, ISO, velocidade do obturador, abertura... está tudo lá. Se você preferir não transmitir exatamente quando e como tirou cada foto, remover isso é higiene digital básica.',
    feat4Title: 'Tudo processado localmente',
    feat4Desc: 'NexStrip lê e remove metadatos inteiramente dentro do seu navegador. Sem servidor envolvido. Processe pastas inteiras em lote e baixe cópias limpas individualmente ou como ZIP. Funciona offline.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a remoção de metadatos com o NexStrip.',
    faqQ1: 'O que são metadatos EXIF?',
    faqA1: 'EXIF (Exchangeable Image File Format) são dados incorporados diretamente nos arquivos de imagem ao capturar fotos. Contém detalhes como modelos de câmera, carimbos de data/hora, configurações de exposição e, às vezes, coordenadas GPS exatas.',
    faqQ2: 'Como o NexStrip remove esses dados?',
    faqA2: 'Ele carrega a foto no seu navegador local, extrai os dados brutos de pixels da imagem e a exporta de volta como uma imagem limpa sem copiar os cabeçalhos de metadados. Isso destrói os dados EXIF permanentemente.',
    faqQ3: 'Minha privacidade está garantida?',
    faqA3: 'Sim. NexStrip opera inteiramente do lado do cliente. A análise e remoção de metadatos acontecem no seu navegador. Nenhum arquivo, dado ou coordenada é enviado para qualquer servidor.',
    faqQ4: 'Quais formatos de imagem são suportados?',
    faqA4: 'NexStrip suporta arquivos de imagem JPEG, JPG e PNG, que são os formatos mais comuns que incorporam metadatos de câmera.',
    ctaTitle: 'Pronto para limpar suas fotos?',
    ctaDesc: 'Solte seus arquivos no topo da página. Todos os metadatos são removidos no seu navegador.',
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
    manifest: '/exif-manifest.json',
    alternates: {
      canonical: `/${lang}/exif-stripper`,
      languages: {
        'en': '/exif-stripper',
        'es': '/es/exif-stripper',
        'pt': '/pt/exif-stripper',
        'x-default': '/exif-stripper',
      }
    },
  };
}

export default async function ExifStripperLanding({ params }) {
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
              "url": `https://thenextools.com/${lang}/exif-stripper`,
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
                  "item": `https://thenextools.com/${lang}/exif-stripper`
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
          <ExifStripperPageWrapper hideHeader={true} />
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
