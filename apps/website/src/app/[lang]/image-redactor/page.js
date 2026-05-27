import Link from 'next/link';
import { ImageBlurPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Redactor de Privacidad — Difuminar Rostros, Matrículas y Datos Sensibles | TheNexTools',
    description: 'Dibuja zonas de difuminado sobre rostros, matrículas, direcciones y datos confidenciales en tus fotos de forma permanente e irreversible. Se ejecuta en tu navegador.',
    steps: [
      { title: 'Añadir Imagen', desc: 'Selecciona o arrastra tu imagen a la ventana del editor seguro.' },
      { title: 'Censurar Campos', desc: 'Dibuja áreas de difuminado sobre rostros, nombres, matrículas o detalles privados.' },
      { title: 'Exportar Plano', desc: 'Descarga un archivo plano y limpio donde los datos originales se destruyen permanentemente.' }
    ],
    badge: 'NexRedact — Privado por Defecto',
    h1: 'Algunas cosas en una foto no están hechas para compartirse.',
    p1: 'Vas a vender un coche y necesitas difuminar las matrículas. Compartes una captura de pantalla de un recibo pero el número de tarjeta es visible. Tomaste una gran foto pero un niño desconocido sale al fondo. NexRedact te permite aplicar zonas de difuminado permanente sobre cualquier elemento sensible y guardar una imagen plana.',
    schemaTitle: 'NexRedact Redactor de Privacidad',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Redactar y Difuminar',
    howToTitle: 'Cómo redactar imágenes sin conexión',
    diffTitle: 'Redacción simple que realmente funciona',
    diffDesc: 'Sin capas, sin Photoshop, sin subir imágenes sensibles a servidores de terceros. Simplemente dibuja, difumina y descarga.',
    feat1Title: 'Dibuja zonas de desenfoque con tu ratón',
    feat1Desc: 'Haz clic y arrastra para seleccionar un área rectangular. Ajusta la intensidad del desenfoque: desde un gaussiano sutil hasta una pixelación pesada que hace el texto completamente ilegible.',
    feat2Title: 'Redacción permanente e irreversible',
    feat2Desc: 'La imagen descargada está aplanada. Los píxeles difuminados están integrados en el archivo: no hay capas ocultas debajo que alguien pueda extraer. Esto es vital para contextos legales.',
    feat3Title: 'Casos de uso comunes',
    feat3Desc: 'Difuminar matrículas en listados de coches. Ocultar números de cuentas en facturas. Ocultar rostros en fotos multitudinarias para uso periodístico. Eliminar tu dirección física de capturas de pantalla.',
    feat4Title: 'Nada se sube a internet',
    feat4Desc: 'La imagen permanece en tu navegador todo el tiempo. NexRedact utiliza la API Canvas para aplicar filtros localmente: sin servidores, sin cuentas, sin límites de tamaño. Descarga en JPG o PNG.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre el difuminador NexRedact.',
    faqQ1: '¿Es el difuminado permanente en las imágenes redactadas?',
    faqA1: 'Sí, completamente. Las zonas de desenfoque y censura se dibujan de forma destructiva y se rasterizan en el lienzo de la imagen antes de la descarga. No quedan capas ni máscaras que se puedan deshacer.',
    faqQ2: '¿Puede alguien extraer la imagen sin difuminar?',
    faqA2: 'No. A diferencia de los editores de PDF que a veces solo ocultan texto bajo una caja negra, NexRedact realiza una edición destructiva de píxeles. Los píxeles originales en las zonas difuminadas se destruyen por completo.',
    faqQ3: '¿Qué formatos de imagen son compatibles?',
    faqA3: 'NexRedact es compatible con JPG, PNG, WebP y otros formatos de imagen estándar admitidos por los navegadores modernos.',
    faqQ4: '¿Se suben mis capturas de pantalla sensibles a un servidor?',
    faqA4: 'No, nunca tocan ningún servidor. La redacción se realiza completamente dentro de tu navegador local para garantizar la máxima privacidad de tus datos financieros o personales.',
    ctaTitle: '¿Listo para redactar tus imágenes?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Todo el procesamiento se realiza de forma local.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Redator de Privacidade — Desfocar Rostos, Placas e Áreas Sensíveis | TheNexTools',
    description: 'Desenhe zonas de desfoque sobre rostos, placas de veículos, endereços e dados confidenciais em suas fotos. O desfoque é permanente e irreversível. Executado localmente em seu navegador.',
    steps: [
      { title: 'Adicionar Imagem', desc: 'Selecione ou arraste sua imagem para a janela do editor seguro.' },
      { title: 'Censurar Campos', desc: 'Desenhe áreas de desfoque sobre rostos, nomes, placas ou detalhes privados.' },
      { title: 'Exportar Achatado', desc: 'Baixe um arquivo limpo e achatado onde os dados originais são destruídos permanentemente.' }
    ],
    badge: 'NexRedact — Privado por Padrão',
    h1: 'Algumas coisas em uma foto não devem ser compartilhadas.',
    p1: 'Você está vendendo um carro e precisa desfocar as placas. Você está compartilhando uma captura de tela de um recibo, mas o número do cartão está visível. Você tirou uma ótima foto de um evento, mas o filho de um estranho está no enquadramento. NexRedact permite que você desenhe zonas de desfoque sobre qualquer coisa sensível e salve uma imagem achatada.',
    schemaTitle: 'Redator de Imagem NexRedact',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Redigir e Desfocar',
    howToTitle: 'Como redigir imagens offline',
    diffTitle: 'Redação simples que realmente funciona',
    diffDesc: 'Sem camadas, sem Photoshop, sem fazer upload de imagens confidenciais para servidores de terceiros. Basta desenhar, desfocar e baixar.',
    feat1Title: 'Desenhe zonas de desfoque com o mouse',
    feat1Desc: 'Clique e arraste para selecionar uma área retangular. Ajuste a intensidade do desfoque — de um gaussiano sutil a uma pixelização pesada que torna o texto completamente ilegível.',
    feat2Title: 'Redação permanente e irreversível',
    feat2Desc: 'A imagem baixada é achatada. Os pixels desfocados são gravados no arquivo — não há nenhuma camada oculta por baixo que alguém possa extrair. Isso importa para trabalhos jurídicos e médicos.',
    feat3Title: 'Casos de uso comuns',
    feat3Desc: 'Desfocar placas de veículos em anúncios. Ocultar números de contas em capturas de faturas. Ocultar rostos de transeuntes em fotos de multidões para fins jornalísticos. Remover seu endereço de fotos.',
    feat4Title: 'Nada é carregado',
    feat4Desc: 'A imagem permanece no seu navegador o tempo todo. NexRedact usa a API Canvas para aplicar o filtro de desfoque localmente — sem servidor, sem conta, sem limite de tamanho de arquivo. Baixe como JPG ou PNG.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre o redator de privacidade NexRedact.',
    faqQ1: 'O desfoque é permanente nas minhas imagens redigidas?',
    faqA1: 'Sim, completamente. O desfoque e as zonas de blackout são permanentemente desenhados e rasterizados na tela da imagem antes do download. Não há camadas, máscaras ou tags de metadados deixadas para trás.',
    faqQ2: 'Alguém pode extrair a imagem sem desfoque?',
    faqA2: 'Não. Ao contrário dos editores de PDF que às vezes ocultam o texto original sob uma caixa preta, o NexRedact realiza uma edição destrutiva de pixels. Os pixels originais nas zonas desfocadas são totalmente substituídos e destruídos.',
    faqQ3: 'Quais formatos de imagem são suportados?',
    faqA3: 'NexRedact suporta JPG, PNG, WebP e outros formatos de imagem padrão compatíveis com navegadores.',
    faqQ4: 'Minhas capturas de tela confidenciais são enviadas para um servidor?',
    faqA4: 'Não, elas nunca tocam em nenhum servidor. A redação é feita inteiramente dentro do seu navegador local para garantir a máxima privacidade para dados financeiros, jurídicos ou pessoais.',
    ctaTitle: 'Pronto para redigir suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Todo o processamento é feito localmente.',
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
      canonical: `/${lang}/image-redactor`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-redactor' : `/${l}/image-redactor`;
          return acc;
        }, {}),
        'x-default': '/image-redactor',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://thenextools.com/${lang}/image-redactor`,
      type: 'website',
    },
    twitter: {
      title: t.title,
      description: t.description,
    }
  };
}

export default async function ImageRedactorLanding({ params }) {
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
              "url": `https://thenextools.com/${lang}/image-redactor`,
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
                  "item": `https://thenextools.com/${lang}/image-redactor`
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
          <ImageBlurPageWrapper hideHeader={true} />
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
