import Link from 'next/link';
import { TOOLS_METADATA } from '@/lib/pdf-tools-metadata';
import { 
  FileText, Image, AlertTriangle, ArrowRight, ShieldCheck, 
  HelpCircle, Mail, Home, Database, FileMinus
} from 'lucide-react';

export const metadata = {
  title: 'Mapa del Sitio | TheNexTools',
  description: 'Navega por TheNexTools. Índice completo de todas nuestras herramientas de PDF en línea, compresores de imágenes, limpiadores de metadatos y aplicaciones de recuperación de datos sin conexión.',
  alternates: {
    canonical: '/es/sitemap',
    languages: {
      'en': '/sitemap',
      'es': '/es/sitemap',
      'x-default': '/sitemap',
    }
  },
};

export default function SitemapPage() {
  const pdfTools = Object.entries(TOOLS_METADATA).map(([slug, meta]) => ({
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    desc: meta.description.split('.')[0] + '.',
  }));

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>Índice</div>
        <h1 style={{ marginBottom: '1rem' }}>Mapa del Sitio</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          Encuentra enlaces directos a cada utilidad, herramienta, página de documentación y políticas en TheNexTools.
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Main Sections */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Home size={20} /></span>
              Páginas Principales
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/es" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Página de Inicio</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Bienvenido a TheNexTools. Utilidades web gratuitas y software de recuperación de datos sin conexión.</p>
              </Link>
              <Link href="/es/data-recovery" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>NexData Recovery</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Aplicación de escritorio profesional para la recuperación de datos sin conexión en macOS y Windows.</p>
              </Link>
              <Link href="/es/docs" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Documentación</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Guías, recursos de soporte, preguntas frecuentes y documentación de integración para todas las utilidades.</p>
              </Link>
              <Link href="/es/contact" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Contacto</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Ponte en contacto con soporte, consultas de facturación o comentarios generales.</p>
              </Link>
            </div>
          </div>

          {/* PDF Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><FileText size={20} /></span>
              NexPDF Toolkit
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Todas las herramientas PDF se ejecutan al 100% localmente en tu navegador. Ningún archivo se carga a ningún servidor.
            </p>
            <div className="dashboard-grid">
              <Link href="/es/pdf-toolkit" className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>Espacio de Trabajo NexPDF</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Abre la suite de edición de PDF completa con vista previa de archivos y área de trabajo de arrastrar y soltar.</p>
              </Link>
              {pdfTools.map((t) => (
                <Link key={t.slug} href={`/es/pdf-toolkit/tools/${t.slug}`} className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3>{t.title === 'Merge Pdf' ? 'Combinar PDF' : t.title === 'Split Pdf' ? 'Dividir PDF' : t.title === 'Compress Pdf' ? 'Comprimir PDF' : t.title === 'Watermark Pdf' ? 'Marca de Agua PDF' : t.title === 'Protect Pdf' ? 'Proteger PDF' : t.title === 'Unlock Pdf' ? 'Desbloquear PDF' : t.title === 'Sign Pdf' ? 'Firmar PDF' : t.title}</h3>
                    <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                  </div>
                  <p>{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Image Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Image size={20} /></span>
              NexImage Toolkit
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/es/image-toolkit" className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>Panel NexImage</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Accede a nuestro conjunto localizado de herramientas para procesamiento y compresión de imágenes por lotes.</p>
              </Link>
              <Link href="/es/image-compressor" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Compresor de Imágenes</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Reduce el peso de archivos JPG, PNG y WebP de forma local con vistas previas de relación de compresión en tiempo real.</p>
              </Link>
              <Link href="/es/image-converter" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Convertidor de Imágenes</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Convierte formatos de imágenes localmente entre formatos que incluyen JPEG, PNG y WebP.</p>
              </Link>
              <Link href="/es/image-redactor" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Difuminador de Privacidad</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Difumina de forma permanente rostros, matrículas o texto confidencial en las imágenes antes de compartirlas.</p>
              </Link>
              <Link href="/es/exif-stripper" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Limpiador EXIF</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Elimina los metadatos EXIF privados (coordenadas GPS, modelo de cámara, lente) de tus fotografías.</p>
              </Link>
            </div>
          </div>

          {/* Legal / Policy Pages */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><ShieldCheck size={20} /></span>
              Políticas y Avisos Legales
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href="/es/privacy" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Política de Privacidad</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Conoce nuestra política de procesamiento de datos local. Nunca cargamos tus documentos.</p>
              </Link>
              <Link href="/es/terms" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Términos de Servicio</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Términos, condiciones, detalles de licencia y responsabilidad por el uso de nuestro software.</p>
              </Link>
              <Link href="/es/refund-policy" className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>Política de Reembolso</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Información sobre nuestra garantía de reembolso de 10 días para las licencias de NexData Recovery Pro.</p>
              </Link>
              <Link href="/es/sitemap" className="dashboard-card" style={{ borderStyle: 'dashed' }}>
                <div className="dashboard-card-header">
                  <h3>Mapa del Sitio HTML</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>Actualmente estás viendo la página del mapa del sitio HTML en español.</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
