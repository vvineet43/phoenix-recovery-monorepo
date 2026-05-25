import Link from 'next/link';
import { ImageConverterPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const CONVERTER_STEPS = [
  { title: 'Seleccionar Archivos', desc: 'Selecciona o arrastra imágenes de cualquier formato al espacio de trabajo.' },
  { title: 'Elegir Formato', desc: 'Elige el formato de salida (JPG, PNG, WebP) y define las opciones de calidad.' },
  { title: 'Exportar en Lote', desc: 'Haz clic en convertir y descarga los archivos convertidos como un archivo ZIP limpio.' }
];

export const metadata = {
  title: 'Convertidor de Formatos de Imagen — JPG a WebP, PNG a JPG Localmente | TheNexTools',
  description: 'Convierte imágenes entre JPG, PNG y WebP sin subirlas. Convierte carpetas enteras por lotes, conserva la transparencia y descarga en ZIP — todo en tu navegador.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/es/image-converter',
    languages: {
      'en': '/image-converter',
      'es': '/es/image-converter',
      'x-default': '/image-converter',
    }
  },
};

export default function ImageConverterLanding() {
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
                  "name": "¿Cómo funciona la conversión de imágenes basada en el navegador?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utiliza la API HTML5 Canvas de tu navegador para decodificar el formato de la imagen cargada (como PNG, JPG o WebP) y volver a codificarla directamente en el formato de destino deseado. El proceso se ejecuta localmente en tu CPU."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Se conservará la transparencia de la imagen durante la conversión?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Al convertir a PNG o WebP, la transparencia se conserva por completo. Al convertir imágenes transparentes a JPEG (que no admite canales alfa), la transparencia se rellena limpiamente con un fondo blanco sólido."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuántos archivos puedo convertir a la vez?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Puedes seleccionar y convertir docenas o cientos de archivos simultáneamente. Dado que el procesamiento se realiza localmente en tu máquina, no hay retrasos en las colas de la nube ni límites diarios."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Están seguros mis archivos durante la conversión de formato?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Completamente. Debido a que la utilidad se ejecuta puramente dentro de tu navegador web sin cargas del lado del servidor, tus fotos nunca salen de tu dispositivo."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexConvert Convertidor de Formato de Imagen",
              "url": "https://thenextools.com/es/image-converter",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Convierte imágenes JPEG, PNG y WebP localmente en tu navegador. Conserva la transparencia y descarga en ZIP sin subir tus archivos.",
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
                  "name": "Convertidor de Imágenes",
                  "item": "https://thenextools.com/es/image-converter"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexConvert — Local y Privado</div>
        <h1>Convierte formatos de imágenes al instante, sin subirlas.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Cambiar un formato de imagen no debería implicar enviar tus fotos a servidores de terceros. NexConvert convierte entre JPG, PNG y WebP de forma 100% local en tu navegador. Suelta carpetas completas, mantén la transparencia al convertir a PNG o WebP, y descárgalo todo en un ZIP sin esperas ni límites.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageConverterPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Cómo convertir formatos de imagen sin conexión</h2>
          <div className="premium-steps-grid">
            {CONVERTER_STEPS.map((step, index) => (
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
            <h2>Por qué realizar la conversión localmente</h2>
            <p>Es más seguro, más rápido y no tiene restricciones.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Conserva la transparencia</h3>
              <p>Al convertir a PNG o WebP, el canal alfa (transparencia) se mantiene intacto. Si conviertes de un formato transparente a JPEG, rellenamos el fondo automáticamente con un color blanco sólido.</p>
            </div>
            <div className="feature-card">
              <h3>Conversiones en lote ultrarrápidas</h3>
              <p>Puedes convertir docenas de archivos simultáneamente. Como no tienes que subirlos a un servidor, la conversión es instantánea y se realiza tan rápido como tu procesador lo permita.</p>
            </div>
            <div className="feature-card">
              <h3>Sin límites de tamaño</h3>
              <p>A diferencia de las herramientas en la nube que limitan el tamaño de archivo para usuarios gratuitos, NexConvert procesa imágenes directamente en la memoria de tu navegador, manejando archivos enormes sin problemas.</p>
            </div>
            <div className="feature-card">
              <h3>Privacidad absoluta</h3>
              <p>Tus fotos nunca salen de tu ordenador. Esta es la única forma garantizada de asegurar que las capturas de pantalla de trabajo o las fotos personales se mantengan totalmente privadas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Preguntas habituales sobre el convertidor local de imágenes.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Cómo funciona la conversión de imágenes basada en el navegador?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Utiliza la API HTML5 Canvas de tu navegador para decodificar el formato de la imagen cargada (como PNG, JPG o WebP) y volver a codificarla directamente en el formato de destino deseado. El proceso se ejecuta localmente en tu CPU.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Se conservará la transparencia de la imagen durante la conversión?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí. Al convertir a PNG o WebP, la transparencia se conserva por completo. Al convertir imágenes transparentes a JPEG (que no admite canales alfa), la transparencia se rellena limpiamente con un fondo blanco sólido.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Cuántos archivos puedo convertir a la vez?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Puedes seleccionar y convertir docenas o cientos de archivos simultáneamente. Dado que el procesamiento se realiza localmente en tu máquina, no hay retrasos en las colas de la nube ni límites diarios.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Están seguros mis archivos durante la conversión de formato?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Completamente. Debido a que la utilidad se ejecuta puramente dentro de tu navegador web sin cargas del lado del servidor, tus fotos nunca salen de tu dispositivo.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para cambiar tus formatos de imagen?</h2>
          <p>Suelta tus archivos en la parte superior de la página para comenzar. Todo el procesamiento es local.</p>
          <a href="#" className="btn btn-primary">Volver a la herramienta</a>
        </div>
      </section>
    </>
  );
}
