import Link from 'next/link';

export const metadata = {
  title: 'Política de Reembolso | TheNexTools',
  description: 'Nuestra política de reembolso para NexData Recovery Pro y otros softwares de pago. Conoce cómo solicitar un reembolso y qué está cubierto.',
  alternates: {
    canonical: '/es/refund-policy',
    languages: {
      'en': '/refund-policy',
      'es': '/es/refund-policy',
      'x-default': '/refund-policy',
    }
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>Política de Reembolso</h1>
        <p className="text-muted">Última actualización: 20 de mayo de 2026</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <div>
          <h3>Descripción General</h3>
          <p>Si NexData Recovery Pro no funciona correctamente en tu sistema, puedes solicitar un reembolso completo. Solo te pedimos que cumplas con las condiciones detalladas a continuación.</p>
        </div>

        <div>
          <h3>Elegibilidad para Reembolsos</h3>
          <p>Para ser elegible para un reembolso, se deben cumplir <strong>todas</strong> las siguientes condiciones:</p>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li>La solicitud de reembolso se envía <strong>dentro de los 10 días</strong> posteriores a la fecha de compra original.</li>
            <li>Proporcionas pruebas claras de que el software no funciona correctamente, como una <strong>captura de pantalla o grabación de pantalla</strong> que muestre el error o fallo.</li>
            <li>El problema es un defecto real del software, no una limitación inherente de la tecnología de recuperación de datos (consulta las exclusiones a continuación).</li>
          </ol>
        </div>

        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚠️</span> Lo que NO es elegible para un reembolso
          </h3>
          <p style={{ marginBottom: '1rem' }}>La recuperación depende del estado físico de tu unidad. Estas situaciones <strong>no</strong> son fallos del software y <strong>no</strong> están cubiertas por nuestra política de reembolso:</p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><strong>Datos sobrescritos:</strong> Cuando se han escrito nuevos datos en los mismos sectores del disco después de la eliminación, los archivos originales se destruyen permanentemente. Ningún software puede recuperar datos sobrescritos.</li>
            <li><strong>Unidades dañadas físicamente:</strong> Si el dispositivo de almacenamiento tiene daños físicos (por ejemplo, cabezal dañado, daño por agua, circuitos quemados), la recuperación basada en software no puede acceder al medio. Esto requiere servicios profesionales de laboratorio.</li>
            <li><strong>Archivos muy fragmentados:</strong> Los archivos grandes (especialmente los videos) que se almacenaron en sectores no contiguos del disco pueden recuperarse parcialmente pero no reproducirse por completo. Esta es una limitación fundamental de la reconstrucción de archivos, no un fallo del software.</li>
            <li><strong>Volúmenes cifrados sin la clave:</strong> Si se pierde la contraseña de cifrado original o la clave de recuperación, ninguna herramienta podrá descifrar los datos.</li>
            <li><strong>Datos eliminados por TRIM en SSD:</strong> Los SSD modernos con TRIM habilitado borran permanentemente los bloques eliminados a nivel de hardware. Una vez que TRIM se ha ejecutado, los datos desaparecen físicamente.</li>
            <li><strong>Formatos de archivo no compatibles:</strong> NexData recupera archivos haciendo coincidir firmas binarias conocidas. Es posible que no se admitan formatos propietarios o extremadamente raros.</li>
            <li><strong>Resultados de recuperación parciales o dañados:</strong> Los archivos recuperados no siempre están 100% intactos. La recuperación parcial de algunos archivos de un disco dañado o sobrescrito es el comportamiento esperado, no un defecto.</li>
          </ul>
        </div>

        <div>
          <h3>Cómo solicitar un reembolso</h3>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li>Envía un correo electrónico a <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a> con el asunto: <strong>&quot;Solicitud de Reembolso — NexData Recovery Pro&quot;</strong></li>
            <li>Incluye tu <strong>correo de confirmación de pedido</strong> o <strong>clave de licencia</strong> para verificación.</li>
            <li>Adjunta una <strong>captura de pantalla o grabación de pantalla</strong> que muestre claramente el problema que estás experimentando.</li>
            <li>Describe brevemente el problema y los pasos que realizaste antes de encontrarlo.</li>
          </ol>
        </div>

        <div>
          <h3>Tiempo de procesamiento</h3>
          <p>Nuestro objetivo es revisar todas las solicitudes de reembolso en un plazo de <strong>3 días hábiles</strong>. Si se aprueba, el reembolso se procesará a tu método de pago original en un plazo de 5 a 10 días hábiles, según tu banco o proveedor de pago.</p>
        </div>

        <div>
          <h3>Notas importantes</h3>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li>No se aceptarán solicitudes de reembolso enviadas <strong>después de 10 días</strong> desde la fecha de compra.</li>
            <li>Te recomendamos encarecidamente utilizar primero la <strong>Versión Gratuita</strong>: permite un escaneo ilimitado y vistas previas completas de los archivos para que puedas verificar que tus datos son recuperables <em>antes</em> de comprar una licencia Pro.</li>
            <li>Una vez aprobado el reembolso, tu clave de licencia será desactivada.</li>
          </ul>
        </div>

        <div>
          <h3>Contacto</h3>
          <p>Para cualquier pregunta sobre esta política, escríbenos a <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.</p>
        </div>

      </section>
    </main>
  );
}
