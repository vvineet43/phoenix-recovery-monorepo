import Link from 'next/link';

const TRANSLATIONS = {
  es: {
    title: 'Política de Privacidad | TheNexTools',
    description: 'Nuestra política de privacidad es sencilla: no queremos tus datos. Todas las herramientas se ejecutan localmente en tu dispositivo.',
    h1: 'Política de Privacidad',
    effectiveDate: 'Fecha de vigencia:',
    localeString: 'es-ES',
    sec1Title: 'El Principio Fundamental',
    sec1Desc: 'Vendemos software, no datos. Nuestras herramientas procesan todo en tu dispositivo y no tenemos ningún interés en ver, almacenar o monetizar el contenido con el que trabajas.',
    sec2Title: 'Sin Carga de Archivos',
    sec2Desc: 'Cada herramienta web de nuestra suite (NexPDF, NexStrip, NexCompress) utiliza las API nativas del navegador para procesar tus archivos <strong>localmente</strong> en tu pestaña. Tus archivos nunca pasan por nuestros servidores. No podemos verlos y, por supuesto, no los almacenamos.',
    sec3Title: 'Sin Cuentas ni Seguimiento',
    sec3Desc: 'No requerimos cuentas para usar nuestras utilidades gratuitas. No utilizamos píxeles de seguimiento invasivos ni cookies de terceros para publicidad. Podemos recopilar registros mínimos y anonimizados del servidor (como vistas de páginas) únicamente para supervisar el rendimiento y evitar el abuso de nuestra infraestructura.',
    sec4Title: 'Almacenamiento Local',
    sec4Desc: 'Algunas herramientas pueden usar el almacenamiento local de tu navegador o IndexedDB para guardar tus preferencias o archivos de trabajo temporales (como un PDF que se está editando). Estos datos se quedan en tu dispositivo y nunca los sincronizamos con ningún servicio en la nube.',
    sec5Title: 'Aplicación de Escritorio NexData',
    sec5Desc: 'Nuestra aplicación de escritorio, NexData Recovery, está diseñada para funcionar completamente sin conexión. No requiere conexión a internet para escanear o recuperar archivos. La verificación de la licencia se realiza a través de un mecanismo seguro y local.',
    sec6Title: 'Contacto',
    sec6Desc: '¿Preguntas sobre esta política de privacidad? Escríbenos a '
  },
  pt: {
    title: 'Política de Privacidade | TheNexTools',
    description: 'Nossa política de privacidade é simples: não queremos seus dados. Todas as ferramentas são executadas localmente em seu dispositivo.',
    h1: 'Política de Privacidade',
    effectiveDate: 'Data de vigência:',
    localeString: 'pt-PT',
    sec1Title: 'O Princípio Fundamental',
    sec1Desc: 'Vendemos software, não dados. Nossas ferramentas processam tudo no seu dispositivo, e não temos interesse em ver, armazenar ou monetizar aquilo em que você trabalha.',
    sec2Title: 'Sem Envio de Arquivos',
    sec2Desc: 'Cada ferramenta web em nossa suíte (NexPDF, NexStrip, NexCompress) usa APIs de navegador modernas para processar seus arquivos <strong>localmente</strong> na aba do seu navegador. Seus arquivos nunca transitam por nossos servidores. Não podemos vê-los e, certamente, não os armazenamos.',
    sec3Title: 'Sem Contas ou Rastreamento',
    sec3Desc: 'Não exigimos contas para usar nossos utilitários gratuitos. Não usamos pixels de rastreamento invasivos ou cookies de terceiros para publicidade. Podemos coletar registros de servidor mínimos e anonimizados (como visualizações de página) puramente para monitoramento de desempenho e para evitar abusos em nossa infraestrutura.',
    sec4Title: 'Armazenamento Local',
    sec4Desc: 'Algumas ferramentas podem usar o armazenamento local do seu navegador ou IndexedDB para salvar suas preferências ou arquivos de trabalho temporários (como um PDF sendo editado). Esses dados permanecem no seu dispositivo e nunca são sincronizados com qualquer serviço de nuvem por nós.',
    sec5Title: 'Aplicativo Desktop NexData',
    sec5Desc: 'Nosso aplicativo desktop, NexData Recovery, foi projetado para rodar inteiramente offline. Ele não requer uma conexão com a internet para escanear ou recuperar arquivos. A verificação da licença acontece por meio de um mecanismo seguro e local-first.',
    sec6Title: 'Contato',
    sec6Desc: 'Dúvidas sobre esta política de privacidade? Envie um e-mail para '
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
      canonical: `/${lang}/privacy`,
      languages: {
        'en': '/privacy',
        'es': '/es/privacy',
        'pt': '/pt/privacy',
        'x-default': '/privacy',
      }
    },
  };
}

export default async function PrivacyPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.effectiveDate} {new Date().toLocaleDateString(t.localeString)}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p>{t.sec1Desc}</p>
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
        </div>

        <div>
          <h3>{t.sec3Title}</h3>
          <p>{t.sec3Desc}</p>
        </div>

        <div>
          <h3>{t.sec4Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec4Desc }} />
        </div>

        <div>
          <h3>{t.sec5Title}</h3>
          <p>{t.sec5Desc}</p>
        </div>

        <div>
          <h3>{t.sec6Title}</h3>
          <p>
            {t.sec6Desc}
            <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
