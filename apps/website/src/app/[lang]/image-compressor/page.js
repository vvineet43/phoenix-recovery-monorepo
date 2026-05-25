import Link from 'next/link';
import { ImageCompressorPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';

const COMPRESSOR_STEPS = [
  { title: 'Añadir Imágenes', desc: 'Selecciona o arrastra archivos JPG, PNG o WebP al compresor.' },
  { title: 'Ajustar Compresión', desc: 'Ajusta la barra de calidad y compara el original contra el comprimido lado a lado.' },
  { title: 'Descargar Salida', desc: 'Guarda tus imágenes comprimidas de forma individual o como un archivo ZIP consolidado.' }
];

export const metadata = {
  title: 'Compresor de Imágenes — Comprimir JPG, PNG, WebP Localmente | TheNexTools',
  description: 'Comprime imágenes en tu navegador sin subirlas. Ajusta la calidad, compara antes y después a resolución completa y descarga — individual o en ZIP.',
  manifest: '/image-manifest.json',
  alternates: {
    canonical: '/es/image-compressor',
    languages: {
      'en': '/image-compressor',
      'es': '/es/image-compressor',
      'x-default': '/image-compressor',
    }
  },
};

export default function ImageCompressorLanding() {
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
                  "name": "¿Cómo funciona la compresión de imágenes local?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utiliza la API Canvas nativa de tu navegador para decodificar la imagen cargada, procesa los píxeles localmente al nivel de calidad elegido y los vuelve a exportar como un archivo JPEG, PNG o WebP comprimido. No se contacta con ningún servidor externo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Están seguras mis imágenes con NexCompress?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, completamente. Tus imágenes nunca se envían a un servidor. Todo el procesamiento se realiza del lado del cliente en tu dispositivo, garantizando total privacidad."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Existe un límite de tamaño de archivo?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, no hay límites artificiales de tamaño. El único límite físico es la memoria disponible del navegador de tu dispositivo, que maneja fácilmente cientos de megabytes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Funciona NexCompress sin conexión?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. NexCompress es una Aplicación Web Progresiva (PWA). Una vez cargada, funciona completamente sin conexión a Internet."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexCompress Compresor de Imágenes",
              "url": "https://thenextools.com/es/image-compressor",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": "Comprime imágenes JPEG, PNG y WebP localmente en tu navegador. Ajusta la calidad, compara resultados y descarga como ZIP sin subir tus archivos.",
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
                  "name": "Compresor de Imágenes",
                  "item": "https://thenextools.com/es/image-compressor"
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">NexCompress — Local y Privado</div>
        <h1>Comprime imágenes sin subirlas a ningún sitio.</h1>
        <p style={{ marginBottom: '3rem' }}>
          La mayoría de compresores envían tus archivos a un servidor, los procesan remotamente y los devuelven. Eso está bien hasta que deja de estarlo: la cola es lenta, el archivo es demasiado grande o la imagen es algo confidencial. NexCompress ejecuta los mismos algoritmos directamente en tu navegador. Más rápido, sin límites y tus archivos no salen de tu máquina.
        </p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageCompressorPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Cómo comprimir imágenes sin conexión</h2>
          <div className="premium-steps-grid">
            {COMPRESSOR_STEPS.map((step, index) => (
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
            <h2>Lo que nos diferencia de TinyPNG</h2>
            <p>Las características que realmente importan cuando comprimes imágenes de forma habitual, no de una en una en un formulario web simple.</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>Salida a JPEG, PNG o WebP</h3>
              <p>Elige tu formato de salida como parte del paso de compresión. Las imágenes PNG con transparencia se mantienen sin pérdidas. Para JPEG y WebP, arrastra la barra de calidad del 10% al 100% y el tamaño estimado del archivo se actualizará mientras la mueves.</p>
            </div>
            <div className="feature-card">
              <h3>Comparación lado a lado a resolución completa</h3>
              <p>Cada imagen comprimida obtiene una vista comparativa: original a la izquierda, comprimida a la derecha. Puedes ver la diferencia de calidad real antes de descargar nada.</p>
            </div>
            <div className="feature-card">
              <h3>Procesamiento por lotes y totales</h3>
              <p>Suelta una carpeta entera a la vez. NexCompress las procesa secuencialmente y mantiene un recuento del espacio total ahorrado. Descarga los archivos de uno en uno o la carpeta completa como un ZIP.</p>
            </div>
            <div className="feature-card">
              <h3>Sin cuentas, sin cargas, sin límites artificiales</h3>
              <p>La mayoría de los compresores web te limitan a 5MB por archivo a menos que te registres. Algunos añaden marcas de agua. NexCompress no hace nada de eso: el único límite es la memoria del navegador de tu dispositivo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Todo lo que necesitas saber sobre la compresión local con NexCompress.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Cómo funciona la compresión de imágenes local?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Utiliza la API Canvas nativa de tu navegador para decodificar la imagen cargada, procesa los píxeles localmente al nivel de calidad elegido y los vuelve a exportar como un archivo JPEG, PNG o WebP comprimido. No se contacta con ningún servidor externo.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Están seguras mis imágenes con NexCompress?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí, completamente. Tus imágenes nunca se envían a un servidor. Todo el procesamiento se realiza del lado del cliente en tu dispositivo, garantizando total privacidad.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Existe un límite de tamaño de archivo?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No, no hay límites artificiales de tamaño. El único límite físico es la memoria disponible del navegador de tu dispositivo.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                ¿Funciona NexCompress sin conexión?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Sí. NexCompress es una Aplicación Web Progresiva (PWA). Una vez cargada, funciona completamente sin conexión a Internet.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para reducir el tamaño de tus imágenes?</h2>
          <p>Sueltas tus archivos en la parte superior de la página. Funciona en Chrome, Firefox, Safari y Edge. Nada que instalar.</p>
          <a href="#" className="btn btn-primary">Volver a la herramienta</a>
        </div>
      </section>
    </>
  );
}
