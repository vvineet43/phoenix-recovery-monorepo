import Link from 'next/link';

const TRANSLATIONS = {
  es: {
    title: 'Términos de Servicio | TheNexTools',
    description: 'Los términos de uso de la suite de utilidades de TheNexTools.',
    h1: 'Términos de Servicio',
    lastUpdated: 'Última actualización:',
    localeString: 'es-ES',
    sec1Title: 'Aceptación de los Términos',
    sec1Desc: 'Al acceder o utilizar TheNexTools (el &quot;Sitio&quot; y el &quot;Software&quot;), aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, no utilices nuestros servicios.',
    sec2Title: 'Licencia de Uso',
    sec2Desc: 'Te otorgamos una licencia no exclusiva y no transferible para utilizar nuestras utilidades web con fines personales o comerciales. No debes intentar descompilar, realizar ingeniería inversa o extraer el código fuente de nuestras herramientas sin nuestro permiso expreso por escrito.',
    sec3Title: 'Software &quot;Tal Cual&quot;',
    sec3Desc: 'Aunque nos esforzamos por ofrecer la máxima calidad y fiabilidad, todas las herramientas proporcionadas por TheNexTools se ofrecen &quot;tal cual&quot; sin garantía de ningún tipo. No nos hacemos responsables de ninguna pérdida de datos o daño de hardware que pueda ocurrir durante el uso de nuestro software, especialmente en las operaciones de recuperación de datos.',
    sec4Title: 'Software de Pago y Licencias',
    sec4Desc: 'Ciertas herramientas, como NexData Recovery, pueden requerir una licencia de pago para su funcionalidad completa. Las licencias suelen estar vinculadas a hardware específico. Los reembolsos se gestionan caso por caso según lo descrito en nuestra documentación.',
    sec5Title: 'Modificaciones',
    sec5Desc: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de dichos cambios constituye la aceptación de los nuevos términos.',
    sec6Title: 'Contacto',
    sec6Desc: '¿Preguntas sobre estos términos? Contáctanos en '
  },
  pt: {
    title: 'Termos de Serviço | TheNexTools',
    description: 'Os termos de uso da suíte de utilidades de TheNexTools.',
    h1: 'Termos de Serviço',
    lastUpdated: 'Última atualização:',
    localeString: 'pt-PT',
    sec1Title: 'Aceitação dos Termos',
    sec1Desc: 'Ao acessar ou utilizar TheNexTools (o &quot;Site&quot; e o &quot;Software&quot;), você concorda em estar sujeito a estes Termos de Serviço. Se você não concorda com estes termos, por favor não use nossos serviços.',
    sec2Title: 'Licença de Uso',
    sec2Desc: 'Concedemos a você uma licença não exclusiva e não transferível para usar nossos utilitários web para fins pessoais ou comerciais. Você não deve tentar decompilar, fazer engenharia reversa ou extrair o código-fonte de nossas ferramentas sem nossa permissão expressa por escrito.',
    sec3Title: 'Software &quot;Como Está&quot;',
    sec3Desc: 'Embora nos esforcemos para oferecer a máxima qualidade e confiabilidade, todas as ferramentas fornecidas por TheNexTools são oferecidas &quot;como estão&quot; sem garantia de qualquer tipo. Não nos responsabilizamos por qualquer perda de dados ou dano de hardware que possa ocorrer durante o uso de nosso software, especialmente nas operações de recuperação de dados.',
    sec4Title: 'Software Pago e Licenciamento',
    sec4Desc: 'Certas ferramentas, como o NexData Recovery, podem exigir uma licença paga para funcionalidade completa. As licenças geralmente são vinculadas a hardware específico. Os reembolsos são gerenciados caso a caso, conforme descrito em nossa documentação.',
    sec5Title: 'Modificações',
    sec5Desc: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso contínuo do site após tais alterações constitui aceitação dos novos termos.',
    sec6Title: 'Contato',
    sec6Desc: 'Dúvidas sobre estes termos? Fale conosco em '
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
      canonical: `/${lang}/terms`,
      languages: {
        'en': '/terms',
        'es': '/es/terms',
        'pt': '/pt/terms',
        'x-default': '/terms',
      }
    },
  };
}

export default async function TermsPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.lastUpdated} {new Date().toLocaleDateString(t.localeString)}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec1Desc }} />
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
        </div>

        <div>
          <h3>{t.sec3Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec3Desc }} />
        </div>

        <div>
          <h3>{t.sec4Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec4Desc }} />
        </div>

        <div>
          <h3>{t.sec5Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec5Desc }} />
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
