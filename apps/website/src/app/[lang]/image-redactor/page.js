import Link from 'next/link';
import { ImageBlurPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const REDACTOR_STEPS = [
  { title: 'Cargar Imagen', desc: 'Suelta la imagen que deseas difuminar en el área de trabajo.' },
  { title: 'Dibujar Áreas', desc: 'Arrastra el ratón sobre cualquier rostro, texto o número para crear una zona difuminada.' },
  { title: 'Aplanar y Guardar', desc: 'Descarga la imagen procesada con el difuminado aplicado de forma destructiva y permanente.' }
];

export const metadata = {
  title: 'Difuminador de Imágenes — Ocultar Rostros y Datos Sensibles Localmente | TheNexTools',
  description: 'Dibuja zonas de difuminado sobre caras, matrículas o datos privados en tus imágenes. El resultado es plano y permanente — procesado al 100% localmente.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/es/image-redactor',
    languages: {
      'en': '/image-redactor',
      'es': '/es/image-redactor',
      'x-default': '/image-redactor',
    }
  },
};

export default function ImageRedactorLanding() {
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
                  "name": "¿Se puede revertir el difuminado?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. A diferencia de las herramientas que simplemente colocan una capa o una forma encima, NexRedact rasteriza y aplana los píxeles de desenfoque directamente en la imagen de salida. El contenido original de los píxeles se destruye permanentemente y es irreversible."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué datos procesa el servidor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ninguno. El proceso de edición y pixelado se realiza por completo del lado del cliente utilizando JavaScript y APIs de dibujo locales. Tus archivos nunca viajan por Internet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Puedo difuminar varias áreas a la vez?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Puedes crear tantas áreas de desenfoque individuales como necesites en la misma foto y ajustar la intensidad de forma independiente para cada una de ellas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Funciona con capturas de pantalla de trabajo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Es ideal para ocultar nombres, correos o datos financieros en capturas de pantalla antes de compartirlas en Slack, Jira o redes sociales."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexRedact Difuminador de Imágenes",
              "url": "https://thenextools.com/es/image-redactor",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Difumina caras, matrículas o datos confidenciales en tus imágenes de forma irreversible y local en tu navegador. Tus fotos nunca se cargan.",
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
                  "name": "Inicio",
                  "item": "https://thenextools.com/es"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "NexImage Toolkit",
                  "item": "https://thenextools.com/es/image-toolkit"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Difuminador de Imágenes",
                  "item": "https://thenextools.com/es/image-redactor"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexRedact — Local y Privado</div>
        <h1>Difumina información privada de tus fotos de forma segura.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Ocultar datos confidenciales en una imagen (como un DNI, tarjeta de crédito o matrícula) requiere un difuminado destructivo y permanente. Muchos servicios web suben tus imágenes para procesarlas, lo cual rompe la privacidad. NexRedact difumina de forma 100% local en tu navegador. El resultado se aplana y se vuelve irreversible antes de descargarlo.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageBlurPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Cómo difuminar áreas sensibles en tus imágenes</h2>
          <div className="premium-steps-grid">
            {REDACTOR_STEPS.map((step, index) => (
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
            <h2>Por qué usar el difuminador local</h2>
            <p>Asegúrate de que tus zonas censuradas no se puedan revertir y de que tus imágenes permanezcan privadas.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Difuminado irreversible</h3>
              <p>Aplanamos la imagen final combinando los píxeles de desenfoque con la imagen base. Esto significa que nadie podrá eliminar la capa de difuminado o recuperar el texto original examinando el archivo.</p>
            </div>
            <div className="feature-card">
              <h3>Intensidad de desenfoque ajustable</h3>
              <p>Controla el nivel de desenfoque en cada zona de forma independiente. Desde un difuminado suave para un fondo hasta una censura gruesa para un número de cuenta.</p>
            </div>
            <div className="feature-card">
              <h3>Múltiples zonas a la vez</h3>
              <p>Crea tantas cajas de difuminado como quieras en la misma foto. Ideal para censurar conversaciones de chat, listados de facturas o varias caras en una foto de grupo.</p>
            </div>
            <div className="feature-card">
              <h3>Privacidad total del cliente</h3>
              <p>Si manejas capturas de pantalla de clientes, contratos o documentos de identidad para tu trabajo, no deberías subirlos a internet. NexRedact realiza toda la censura de forma segura sin salir de tu navegador.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Preguntas habituales sobre nuestro difuminador local de imágenes.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Se puede revertir el difuminado?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No. A diferencia de las herramientas que simplemente colocan una capa o una forma encima, NexRedact rasteriza y aplana los píxeles de desenfoque directamente en la imagen de salida. El contenido original de los píxeles se destruye permanentemente y es irreversible.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Qué datos procesa el servidor?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Ninguno. El proceso de edición y pixelado se realiza por completo del lado del cliente utilizando JavaScript y APIs de dibujo locales. Tus archivos nunca viajan por Internet.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Puedo difuminar varias áreas a la vez?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí. Puedes crear tantas áreas de desenfoque individuales como necesites en la misma foto y ajustar la intensidad de forma independiente para cada una de ellas.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Funciona con capturas de pantalla de trabajo?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí. Es ideal para ocultar nombres, correos o datos financieros en capturas de pantalla antes de compartirlas en Slack, Jira o redes sociales.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para proteger tu información visual?</h2>
          <p>Suelta tus imágenes en la parte superior del espacio de trabajo. Todo el procesamiento se realiza localmente.</p>
          <a href="#" className="btn btn-primary">Volver a la herramienta</a>
        </div>
      </section>
    </>
  );
}
