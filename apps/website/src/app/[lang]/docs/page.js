import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Documentación | TheNexTools',
    description: 'Aprende cómo usar la suite de utilidades de TheNexTools con prioridad en la privacidad.',
    h1: 'Documentación',
    textMuted: 'Guías y consejos de inicio rápido para TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData funciona escaneando sectores físicos del disco. Para obtener mejores resultados:',
    sec1Li1: 'Conecta la unidad de destino mediante una conexión USB o SATA estable.',
    sec1Li2: 'Asegúrate de tener suficiente espacio libre en un disco **diferente** para guardar los archivos recuperados.',
    sec1Li3: 'Evita escribir cualquier dato nuevo en la unidad que estás escaneando.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Todas las operaciones de PDF se realizan en tu navegador utilizando la CPU local. Las características compatibles incluyen:',
    sec2Li1: '<strong>Combinar:</strong> Combina múltiples archivos en cualquier orden.',
    sec2Li2: '<strong>Firmar:</strong> Coloca firmas como elementos vectoriales aplanados.',
    sec2Li3: '<strong>Comprimir:</strong> Reduce el tamaño del archivo con preajustes de calidad en tiempo real.',
    sec3Title: 'Solución de Problemas de PWA',
    sec3Desc: 'Para instalar nuestras herramientas como aplicaciones independientes:',
    sec3Li1: '<strong>Chrome:</strong> Busca el icono de &quot;Instalar&quot; en el lado derecho de la barra de direcciones.',
    sec3Li2: '<strong>iOS Safari:</strong> Toca Compartir &rarr; Añadir a la pantalla de inicio.',
    sec3Li3: '<strong>Android:</strong> Toca el banner de &quot;Añadir a la pantalla de inicio&quot; o el menú del navegador.'
  },
  pt: {
    title: 'Documentação | TheNexTools',
    description: 'Aprenda como usar a suíte de utilidades de TheNexTools com prioridade na privacidade.',
    h1: 'Documentação',
    textMuted: 'Guias e dicas de início rápido para TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData funciona escaneando setores físicos do disco. Para obter melhores resultados:',
    sec1Li1: 'Conecte a unidade de destino usando uma conexão USB ou SATA estável.',
    sec1Li2: 'Certifique-se de ter espaço livre suficiente em um disco **diferente** para salvar os arquivos recuperados.',
    sec1Li3: 'Evite gravar qualquer dado novo na unidade que você está escaneando.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Todas as operações de PDF ocorrem no seu navegador usando a CPU local. Os recursos suportados incluem:',
    sec2Li1: '<strong>Mesclar:</strong> Combine vários arquivos em qualquer ordem.',
    sec2Li2: '<strong>Assinar:</strong> Coloque assinaturas como elementos vetoriais achatados.',
    sec2Li3: '<strong>Compactar:</strong> Reduza o tamanho do arquivo com predefinições de qualidade em tempo real.',
    sec3Title: 'Solução de problemas de PWA',
    sec3Desc: 'Para instalar nossas ferramentas como aplicativos independentes:',
    sec3Li1: '<strong>Chrome:</strong> Procure o ícone &quot;Instalar&quot; no lado direito da barra de endereços.',
    sec3Li2: '<strong>iOS Safari:</strong> Toque em Compartilhar &rarr; Adicionar à tela inicial.',
    sec3Li3: '<strong>Android:</strong> Toque no banner &quot;Adicionar à tela inicial&quot; ou no menu do navegador.'
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
      canonical: `/${lang}/docs`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/docs' : `/${l}/docs`;
          return acc;
        }, {}),
        'x-default': '/docs',
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

export default async function DocsPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.textMuted}</p>
      </header>

      <section className="docs-grid" style={{ display: 'grid', gap: '3rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p className="mt-sm">{t.sec1Desc}</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>{t.sec1Li1}</li>
            <li>{t.sec1Li2}</li>
            <li>{t.sec1Li3}</li>
          </ul>
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p className="mt-sm">{t.sec2Desc}</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li3 }} />
          </ul>
        </div>

        <div>
          <h3>{t.sec3Title}</h3>
          <p className="mt-sm">{t.sec3Desc}</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li3 }} />
          </ul>
        </div>
      </section>
    </main>
  );
}
