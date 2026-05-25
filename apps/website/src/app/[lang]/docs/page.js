import Link from 'next/link';

export const metadata = {
  title: 'Documentación | TheNexTools',
  description: 'Aprende cómo usar la suite de utilidades de TheNexTools con prioridad en la privacidad.',
  alternates: {
    canonical: '/es/docs',
    languages: {
      'en': '/docs',
      'es': '/es/docs',
      'x-default': '/docs',
    }
  },
};

export default function DocsPage() {
  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1>Documentación</h1>
        <p className="text-muted">Guías y consejos de inicio rápido para TheNexTools.</p>
      </header>

      <section className="docs-grid" style={{ display: 'grid', gap: '3rem' }}>
        <div>
          <h3>NexData Recovery</h3>
          <p className="mt-sm">NexData funciona escaneando sectores físicos del disco. Para obtener mejores resultados:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Conecta la unidad de destino mediante una conexión USB o SATA estable.</li>
            <li>Asegúrate de tener suficiente espacio libre en un disco **diferente** para guardar los archivos recuperados.</li>
            <li>Evita escribir cualquier dato nuevo en la unidad que estás escaneando.</li>
          </ul>
        </div>

        <div>
          <h3>NexPDF Toolkit</h3>
          <p className="mt-sm">Todas las operaciones de PDF se realizan en tu navegador utilizando la CPU local. Las características compatibles incluyen:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Combinar:</strong> Combina múltiples archivos en cualquier orden.</li>
            <li><strong>Firmar:</strong> Coloca firmas como elementos vectoriales aplanados.</li>
            <li><strong>Comprimir:</strong> Reduce el tamaño del archivo con preajustes de calidad en tiempo real.</li>
          </ul>
        </div>

        <div>
          <h3>Solución de Problemas de PWA</h3>
          <p className="mt-sm">Para instalar nuestras herramientas como aplicaciones independientes:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Chrome:</strong> Busca el icono de &quot;Instalar&quot; en el lado derecho de la barra de direcciones.</li>
            <li><strong>iOS Safari:</strong> Toca Compartir &rarr; Añadir a la pantalla de inicio.</li>
            <li><strong>Android:</strong> Toca el banner de &quot;Añadir a la pantalla de inicio&quot; o el menú del navegador.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
