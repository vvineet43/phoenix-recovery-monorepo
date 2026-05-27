import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Política de Reembolso | TheNexTools',
    description: 'Nuestra política de reembolso para NexData Recovery Pro y otros softwares de pago. Conoce cómo solicitar un reembolso y qué está cubierto.',
    h1: 'Política de Reembolso',
    lastUpdated: 'Última actualización: 20 de mayo de 2026',
    sec1Title: 'Descripción General',
    sec1Desc: 'Si NexData Recovery Pro no funciona correctamente en tu sistema, puedes solicitar un reembolso completo. Solo te pedimos que cumplas con las condiciones detalladas a continuación.',
    sec2Title: 'Elegibilidad para Reembolsos',
    sec2Desc: 'Para ser elegible para un reembolso, se deben cumplir <strong>todas</strong> las siguientes condiciones:',
    sec2Li1: 'La solicitud de reembolso se envía <strong>dentro de los 10 días</strong> posteriores a la fecha de compra original.',
    sec2Li2: 'Proporcionas pruebas claras de que el software no funciona correctamente, como una <strong>captura de pantalla o grabación de pantalla</strong> que muestre el error o fallo.',
    sec2Li3: 'El problema es un defecto real del software, no una limitación inherente de la tecnología de recuperación de datos (consulta las exclusiones a continuación).',
    sec3Title: 'Lo que NO es elegible para un reembolso',
    sec3Desc: 'La recuperación depende del estado físico de tu unidad. Estas situaciones <strong>no</strong> son fallos del software y <strong>no</strong> están cubiertas por nuestra política de reembolso:',
    sec3Li1: '<strong>Datos sobrescritos:</strong> Cuando se han escrito nuevos datos en los mismos sectores del disco después de la eliminación, los archivos originales se destruyen permanentemente. Ningún software puede recuperar datos sobrescritos.',
    sec3Li2: '<strong>Unidades dañadas físicamente:</strong> Si el dispositivo de almacenamiento tiene daños físicos (por ejemplo, cabezal dañado, daño por agua, circuitos quemados), la recuperación basada en software no puede acceder al medio. Esto requiere servicios profesionales de laboratorio.',
    sec3Li3: '<strong>Archivos muy fragmentados:</strong> Los archivos grandes (especialmente los videos) que se almacenaron en sectores no contiguos del disco pueden recuperarse parcialmente pero no reproducirse por completo. Esta es una limitación fundamental de la reconstrucción de archivos, no un fallo del software.',
    sec3Li4: '<strong>Volúmenes cifrados sin la clave:</strong> Si se pierde la contraseña de cifrado original o la clave de recuperación, ninguna herramienta podrá descifrar los datos.',
    sec3Li5: '<strong>Datos eliminados por TRIM en SSD:</strong> Los SSD modernos con TRIM habilitado borran permanentemente los bloques eliminados a nivel de hardware. Una vez que TRIM se ha ejecutado, los datos desaparecen físicamente.',
    sec3Li6: '<strong>Formatos de archivo no compatibles:</strong> NexData recupera archivos haciendo coincidir firmas binarias conocidas. Es posible que no se admitan formatos propietarios o extremadamente raros.',
    sec3Li7: '<strong>Resultados de recuperación parciales o dañados:</strong> Los archivos recuperados no siempre están 100% intactos. La recuperación parcial de algunos archivos de un disco dañado o sobrescrito es el comportamiento esperado, no un defecto.',
    sec4Title: 'Cómo solicitar un reembolso',
    sec4Li1: 'Envía un correo electrónico a <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> con el asunto: <strong>&quot;Solicitud de Reembolso — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Incluye tu <strong>correo de confirmación de pedido</strong> o <strong>clave de licencia</strong> para verificación.',
    sec4Li3: 'Adjunta una <strong>captura de pantalla o grabación de pantalla</strong> que muestre claramente el problema que estás experimentando.',
    sec4Li4: 'Describe brevemente el problema y los pasos que realizaste antes de encontrarlo.',
    sec5Title: 'Tiempo de procesamiento',
    sec5Desc: 'Nuestro objetivo es revisar todas las solicitudes de reembolso en un plazo de <strong>3 días hábiles</strong>. Si se aprueba, el reembolso se procesará a tu método de pago original en un plazo de 5 a 10 días hábiles, según tu banco o proveedor de pago.',
    sec6Title: 'Notas importantes',
    sec6Li1: 'No se aceptarán solicitudes de reembolso enviadas <strong>después de 10 días</strong> desde la fecha de compra.',
    sec6Li2: 'Te recomendamos encarecidamente utilizar primero la <strong>Versión Gratuita</strong>: permite un escaneo ilimitado y vistas previas completas de los archivos para que puedas verificar que tus datos son recuperables <em>antes</em> de comprar una licencia Pro.',
    sec6Li3: 'Una vez aprobado el reembolso, tu clave de licencia será desactivada.',
    sec7Title: 'Contacto',
    sec7Desc: 'Para cualquier pregunta sobre esta política, escríbenos a '
  },
  pt: {
    title: 'Política de Reembolso | TheNexTools',
    description: 'Nossa política de reembolso para o NexData Recovery Pro e outros softwares pagos. Saiba como solicitar um reembolso e o que está coberto.',
    h1: 'Política de Reembolso',
    lastUpdated: 'Última atualização: 20 de maio de 2026',
    sec1Title: 'Visão Geral',
    sec1Desc: 'Se o NexData Recovery Pro não funcionar corretamente em seu sistema, você poderá solicitar um reembolso total. Apenas pedimos que você atenda às condições detalhadas abaixo.',
    sec2Title: 'Elegibilidade para Reembolso',
    sec2Desc: 'Para ser elegível para um reembolso, <strong>todas</strong> as seguintes condições devem ser atendidas:',
    sec2Li1: 'A solicitação de reembolso deve ser enviada <strong>dentro de 10 dias</strong> a partir da data de compra original.',
    sec2Li2: 'Você deve fornecer evidências claras de que o software está com defeito, como uma <strong>captura de tela ou gravação de tela</strong> mostrando o erro ou falha.',
    sec2Li3: 'O problema deve ser um defeito genuíno do software — não uma limitação inerente da tecnologia de recuperação de dados (veja as exclusões abaixo).',
    sec3Title: 'O que NÃO é elegível para reembolso',
    sec3Desc: 'A recuperação depende da condição física da sua unidade. Estas situações <strong>não</strong> são bugs de software e <strong>não</strong> são cobertas pela nossa política de reembolso:',
    sec3Li1: '<strong>Dados substituídos:</strong> Quando novos dados são gravados nos mesmos setores do disco após a exclusão, os arquivos originais são destruídos permanentemente. Nenhum software pode recuperar dados substituídos.',
    sec3Li2: '<strong>Unidades danificadas fisicamente:</strong> Se o dispositivo de armazenamento tiver danos físicos (por exemplo, falha mecânica de cabeçote, danos causados por água, circuitos queimados), a recuperação baseada em software não poderá acessar a mídia. Isso requer serviços profissionais de laboratório.',
    sec3Li3: '<strong>Arquivos muito fragmentados:</strong> Arquivos grandes (especialmente vídeos) que foram armazenados em setores de disco não contíguos podem ser parcialmente recuperados, mas não totalmente reproduzíveis. Esta é uma limitação fundamental da reconstrução de arquivos, não um bug do software.',
    sec3Li4: '<strong>Volumes criptografados sem a chave:</strong> Se a senha de criptografia original ou a chave de recuperação for perdida, os dados não poderão ser descriptografados por nenhuma ferramenta.',
    sec3Li5: '<strong>Dados apagados por TRIM em SSD:</strong> SSDs modernos com TRIM ativado apagam permanentemente os blocos excluídos no nível de hardware. Assim que o TRIM for executado, os dados desaparecerão fisicamente.',
    sec3Li6: '<strong>Formatos de arquivo não suportados:</strong> NexData recupera arquivos correspondendo a assinaturas binárias conhecidas. Formatos proprietários ou extremamente raros podem não ser suportados.',
    sec3Li7: '<strong>Resultados de recuperação parciais ou corrompidos:</strong> Os arquivos recuperados podem nem sempre estar 100% intactos. A recuperação parcial de alguns arquivos de um disco danificado ou substituído é o comportamento esperado, não um defeito.',
    sec4Title: 'Como solicitar um reembolso',
    sec4Li1: 'Envie um e-mail para <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> com o assunto: <strong>&quot;Solicitação de Reembolso — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Inclua o seu <strong>e-mail de confirmação do pedido</strong> ou <strong>chave de licença</strong> para verificação.',
    sec4Li3: 'Anexe uma <strong>captura de tela ou gravação de tela</strong> mostrando claramente o problema que você está enfrentando.',
    sec4Li4: 'Descreva brevemente o problema e as etapas que você seguiu antes de encontrá-lo.',
    sec5Title: 'Tempo de Processamento',
    sec5Desc: 'Nosso objetivo é analisar todas as solicitações de reembolso em até <strong>3 dias úteis</strong>. Se aprovado, o reembolso será processado para o seu método de pagamento original dentro de 5 a 10 dias úteis, dependendo do seu banco ou provedor de pagamento.',
    sec6Title: 'Notas importantes',
    sec6Li1: 'Solicitações de reembolso enviadas <strong>após 10 dias</strong> a partir da data de compra não serão aceitas.',
    sec6Li2: 'Recomendamos fortemente que você use a <strong>Versão Gratuita</strong> primeiro — ela permite varredura ilimitada e pré-visualizações completas dos arquivos para que você possa verificar se seus dados são recuperáveis <em>antes</em> de comprar uma licença Pro.',
    sec6Li3: 'Após a aprovação do reembolso, sua chave de licença será desativada.',
    sec7Title: 'Contato',
    sec7Desc: 'Para qualquer dúvida sobre esta política, entre em contato conosco pelo e-mail '
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
      canonical: `/${lang}/refund-policy`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/refund-policy' : `/${l}/refund-policy`;
          return acc;
        }, {}),
        'x-default': '/refund-policy',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
    },
    twitter: {
      title: t.title,
      description: t.description,
    }
  };
}

export default async function RefundPolicyPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.lastUpdated}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p>{t.sec1Desc}</p>
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li3 }} />
          </ol>
        </div>

        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚠️</span> {t.sec3Title}
          </h3>
          <p style={{ marginBottom: '1rem' }}>{t.sec3Desc}</p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li3 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li4 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li5 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li6 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li7 }} />
          </ul>
        </div>

        <div>
          <h3>{t.sec4Title}</h3>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li3 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li4 }} />
          </ol>
        </div>

        <div>
          <h3>{t.sec5Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec5Desc }} />
        </div>

        <div>
          <h3>{t.sec6Title}</h3>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li3 }} />
          </ul>
        </div>

        <div>
          <h3>{t.sec7Title}</h3>
          <p>
            {t.sec7Desc}
            <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
