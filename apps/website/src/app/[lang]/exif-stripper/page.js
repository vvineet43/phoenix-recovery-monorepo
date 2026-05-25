import Link from 'next/link';
import { ExifStripperPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const STRIPPER_STEPS = [
  { title: 'Arrastrar Fotos', desc: 'Selecciona o arrastra tus fotos al área del analizador EXIF.' },
  { title: 'Inspeccionar Metadatos', desc: 'Visualiza todas las coordenadas GPS incrustadas, modelos de cámara y marcas de tiempo.' },
  { title: 'Limpiar y Descargar', desc: 'Haz clic en limpiar EXIF para generar archivos de imagen desinfectados sin ningún campo oculto.' }
];

export const metadata = {
  title: 'Limpiador de Metadatos EXIF — Eliminar GPS y Datos de la Cámara de Fotos | TheNexTools',
  description: 'Mira los datos ocultos incrustados en tus fotos — ubicación GPS, modelo del dispositivo, marcas de tiempo — y elimina todo antes de compartir. Funciona localmente en tu navegador.',
  manifest: '/exif-manifest.json',
  alternates: {
    canonical: '/es/exif-stripper',
    languages: {
      'en': '/exif-stripper',
      'es': '/es/exif-stripper',
      'x-default': '/exif-stripper',
    }
  },
};

export default function ExifStripperLanding() {
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
                  "name": "¿Qué son los metadatos EXIF?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "EXIF (Exchangeable Image File Format) son datos que se incrustan directamente en los archivos de imagen cuando se toman las fotos. Contiene detalles como el modelo de la cámara, la marca de tiempo, los ajustes de exposición y, a veces, las coordenadas GPS exactas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cómo elimina NexStrip estos datos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Carga la foto en tu navegador local, extrae los datos de píxeles sin procesar del lienzo de la imagen y los vuelve a exportar como una imagen limpia sin copiar los encabezados de metadatos. Esto destruye permanentemente los datos EXIF."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Está garantizada mi privacidad?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. NexStrip funciona completamente del lado del cliente. El análisis y la eliminación de metadatos se realizan en tu propio navegador. Ningún archivo ni coordenada de ubicación se carga en ningún servidor."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué formatos de imagen son compatibles con el Limpiador EXIF?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NexStrip admite archivos de imagen JPEG, JPG y PNG, que son los formatos más habituales que incrustan metadatos de cámara."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexStrip Limpiador de Metadatos EXIF",
              "url": "https://thenextools.com/es/exif-stripper",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Visualiza y elimina metadatos EXIF de la cámara y coordenadas GPS de tus fotos localmente en tu navegador. No requiere cargas en el servidor.",
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
                  "name": "Limpiador EXIF",
                  "item": "https://thenextools.com/es/exif-stripper"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexStrip — Gratis y Privado</div>
        <h1>Tus fotos saben dónde vives. En serio.</h1>
        <p style={{ marginBottom: '3rem' }}>
          Cada foto de tu teléfono tiene coordenadas GPS grabadas en el archivo, con precisión de unos pocos metros. También tiene el modelo de tu dispositivo, la hora exacta en que tomaste la foto y, a veces, tu nombre. NexStrip te muestra todo lo que hay oculto en tu foto y lo elimina antes de que la compartas.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ExifStripperPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Cómo limpiar los datos EXIF sin conexión</h2>
          <div className="premium-steps-grid">
            {STRIPPER_STEPS.map((step, index) => (
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
            <h2>Lo que realmente se esconde en tus fotos</h2>
            <p>Los metadatos EXIF fueron diseñados para fabricantes de cámaras, no para redes sociales. Esto es lo que se incluye por defecto.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Coordenadas GPS</h3>
              <p>Si los servicios de ubicación estaban activados al tomar la foto (como ocurre en la mayoría de teléfonos por defecto), el archivo incluye latitud y longitud exactas. ¿Publicas una foto de tu salón? Acabas de publicar tu dirección física a cualquiera que sepa descargar el archivo.</p>
            </div>
            <div className="feature-card">
              <h3>Huella digital de tu dispositivo</h3>
              <p>Marca, modelo, número de serie de la cámara, versión de software, datos del objetivo... todo se almacena en el archivo de imagen. En contextos de investigación, esto puede vincular directamente una foto a un dispositivo concreto.</p>
            </div>
            <div className="feature-card">
              <h3>Marcas de tiempo y ajustes de captura</h3>
              <p>La hora original de captura, marcas de edición, ISO, velocidad de obturación, apertura... todo está ahí. Si prefieres no difundir cuándo y cómo tomaste cada foto, limpiar esto es higiene digital básica.</p>
            </div>
            <div className="feature-card">
              <h3>Procesamiento local completo</h3>
              <p>NexStrip lee y elimina los metadatos completamente dentro de tu navegador. Sin servidores. Procesa carpetas enteras por lotes y descarga las copias limpias de forma individual o en un ZIP. Incluso funciona sin conexión.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Todo lo que necesitas saber sobre la eliminación de metadatos con NexStrip.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Qué son los metadatos EXIF?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                EXIF (Exchangeable Image File Format) son datos que se incrustan directamente en los archivos de imagen cuando se toman las fotos. Contiene detalles como el modelo de la cámara, la marca de tiempo, los ajustes de exposición y, a veces, las coordenadas GPS exactas.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Cómo elimina NexStrip estos datos?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Carga la foto en tu navegador local, extrae los datos de píxeles sin procesar del lienzo de la imagen y los vuelve a exportar como una imagen limpia sin copiar los encabezados de metadatos. Esto destruye permanentemente los datos EXIF.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Está garantizada mi privacidad?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí. NexStrip funciona completamente del lado del cliente. El análisis y la eliminación de metadatos se realizan en tu propio navegador. Ningún archivo ni coordenada de ubicación se carga en ningún servidor.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Qué formatos de imagen son compatibles con el Limpiador EXIF?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                NexStrip admite archivos de imagen JPEG, JPG y PNG, que son los formatos más habituales que incrustan metadatos de cámara.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para limpiar tus fotos?</h2>
          <p>Suelta tus archivos en la parte superior de la página para comenzar. Todas las imágenes se limpian en tu navegador.</p>
          <a href="#" className="btn btn-primary">Volver a la herramienta</a>
        </div>
      </section>
    </>
  );
}
