import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | TheNexTools',
  description: 'Nuestra política de privacidad es sencilla: no queremos tus datos. Todas las herramientas se ejecutan localmente en tu dispositivo.',
  alternates: {
    canonical: '/es/privacy',
    languages: {
      'en': '/privacy',
      'es': '/es/privacy',
      'x-default': '/privacy',
    }
  },
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>Política de Privacidad</h1>
        <p className="text-muted">Fecha de vigencia: {new Date().toLocaleDateString('es-ES')}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>El Principio Fundamental</h3>
          <p>Vendemos software, no datos. Nuestras herramientas procesan todo en tu dispositivo y no tenemos ningún interés en ver, almacenar o monetizar el contenido con el que trabajas.</p>
        </div>

        <div>
          <h3>Sin Carga de Archivos</h3>
          <p>Cada herramienta web de nuestra suite (NexPDF, NexStrip, NexCompress) utiliza las API nativas del navegador para procesar tus archivos <strong>localmente</strong> en tu pestaña. Tus archivos nunca pasan por nuestros servidores. No podemos verlos y, por supuesto, no los almacenamos.</p>
        </div>

        <div>
          <h3>Sin Cuentas ni Seguimiento</h3>
          <p>No requerimos cuentas para usar nuestras utilidades gratuitas. No utilizamos píxeles de seguimiento invasivos ni cookies de terceros para publicidad. Podemos recopilar registros mínimos y anonimizados del servidor (como vistas de páginas) únicamente para supervisar el rendimiento y evitar el abuso de nuestra infraestructura.</p>
        </div>

        <div>
          <h3>Almacenamiento Local</h3>
          <p>Algunas herramientas pueden usar el almacenamiento local de tu navegador o IndexedDB para guardar tus preferencias o archivos de trabajo temporales (como un PDF que se está editando). Estos datos se quedan en tu dispositivo y nunca los sincronizamos con ningún servicio en la nube.</p>
        </div>

        <div>
          <h3>Aplicación de Escritorio NexData</h3>
          <p>Nuestra aplicación de escritorio, NexData Recovery, está diseñada para funcionar completamente sin conexión. No requiere conexión a internet para escanear o recuperar archivos. La verificación de la licencia se realiza a través de un mecanismo seguro y local.</p>
        </div>

        <div>
          <h3>Contacto</h3>
          <p>¿Preguntas sobre esta política de privacidad? Escríbenos a <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.</p>
        </div>
      </section>
    </main>
  );
}
