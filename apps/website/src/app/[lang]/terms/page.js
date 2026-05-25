import Link from 'next/link';

export const metadata = {
  title: 'Términos de Servicio | TheNexTools',
  description: 'Los términos de uso de la suite de utilidades de TheNexTools.',
  alternates: {
    canonical: '/es/terms',
    languages: {
      'en': '/terms',
      'es': '/es/terms',
      'x-default': '/terms',
    }
  },
};

export default function TermsPage() {
  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>Términos de Servicio</h1>
        <p className="text-muted">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Aceptación de los Términos</h3>
          <p>Al acceder o utilizar TheNexTools (el &quot;Sitio&quot; y el &quot;Software&quot;), aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, no utilices nuestros servicios.</p>
        </div>

        <div>
          <h3>Licencia de Uso</h3>
          <p>Te otorgamos una licencia no exclusiva y no transferible para utilizar nuestras utilidades web con fines personales o comerciales. No debes intentar descompilar, realizar ingeniería inversa o extraer el código fuente de nuestras herramientas sin nuestro permiso expreso por escrito.</p>
        </div>

        <div>
          <h3>Software &quot;Tal Cual&quot;</h3>
          <p>Aunque nos esforzamos por ofrecer la máxima calidad y fiabilidad, todas las herramientas proporcionadas por TheNexTools se ofrecen &quot;tal cual&quot; sin garantía de ningún tipo. No nos hacemos responsables de ninguna pérdida de datos o daño de hardware que pueda ocurrir durante el uso de nuestro software, especialmente en las operaciones de recuperación de datos.</p>
        </div>

        <div>
          <h3>Software de Pago y Licencias</h3>
          <p>Ciertas herramientas, como NexData Recovery, pueden requerir una licencia de pago para su funcionalidad completa. Las licencias suelen estar vinculadas a hardware específico. Los reembolsos se gestionan caso por caso según lo descrito en nuestra documentación.</p>
        </div>

        <div>
          <h3>Modificaciones</h3>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de dichos cambios constituye la aceptación de los nuevos términos.</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <p>¿Preguntas sobre estos términos? Contáctanos en <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.</p>
        </div>
      </section>
    </main>
  );
}
