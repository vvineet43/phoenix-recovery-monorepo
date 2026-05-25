import Link from 'next/link';
import { PdfUploadLandingWrapper } from '@/components/pdf-tools/PdfEditorWrapper';
import { getDictionary } from '@/dictionaries';
import { 
  Plus, Scissors, Minimize2, Type, ImageIcon, ShieldAlert, Lock, Unlock, EyeOff, 
  RotateCw, RefreshCw, Layers, Save, Camera, FileSearch, FileCode, FileText, ArrowRight, BookOpen, Layers2
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  return {
    title: d.meta.pdfToolkit.title,
    description: d.pdfToolkit.heroDesc,
    manifest: '/pdf-manifest.json',
    alternates: {
      canonical: locale === 'en' ? '/pdf-toolkit' : `/${locale}/pdf-toolkit`,
      languages: {
        'en': '/pdf-toolkit',
        'es': '/es/pdf-toolkit',
        'pt': '/pt/pdf-toolkit',
        'x-default': '/pdf-toolkit',
      }
    },
  };
}

export default async function PdfToolkitPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.pdfToolkit;

  const getLink = (path) => {
    if (locale === 'en') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

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
                  "name": t.faqQ1,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA1
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ2,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA2
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ3,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA3
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ4,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA4
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NexPDF Toolkit",
              "url": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/pdf-toolkit`,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 and modern JS support",
              "description": t.heroDesc,
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
                  "name": d.meta.pdfToolkit.breadcrumbHome,
                  "item": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "PDF Toolkit",
                  "item": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/pdf-toolkit`
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">{t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p style={{ marginBottom: '3rem' }}>{t.heroDesc}</p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <PdfUploadLandingWrapper />
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.includedTitle}</h2>
            <p>{t.includedSubtitle}</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>{t.signTitle}</h3>
              <p>{t.signDesc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.assembleTitle}</h3>
              <p>{t.assembleDesc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.compressTitle}</h3>
              <p>{t.compressDesc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.offlineTitle}</h3>
              <p>{t.offlineDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <h2>{t.utilitiesTitle}</h2>
            <p>{t.utilitiesSubtitle}</p>
          </div>

          {/* Category 1: Assembly */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Layers size={20} /></span>
              {t.assemblyCategory}
            </h3>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit/tools/merge-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Plus size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.assembly1Title}</h3>
                <p>{t.assembly1Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/split-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Scissors size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.assembly2Title}</h3>
                <p>{t.assembly2Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/rearrange-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Layers size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.assembly3Title}</h3>
                <p>{t.assembly3Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/rotate-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><RotateCw size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.assembly4Title}</h3>
                <p>{t.assembly4Desc}</p>
              </Link>
            </div>
          </div>

          {/* Category 2: Conversion */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><RefreshCw size={20} /></span>
              {t.conversionCategory}
            </h3>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit/tools/compress-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Minimize2 size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.conversion1Title}</h3>
                <p>{t.conversion1Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/pdf-to-images')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><ImageIcon size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.conversion2Title}</h3>
                <p>{t.conversion2Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/images-to-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Layers2 size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.conversion3Title}</h3>
                <p>{t.conversion3Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/html-to-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileCode size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.conversion4Title}</h3>
                <p>{t.conversion4Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/text-to-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileText size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.conversion5Title}</h3>
                <p>{t.conversion5Desc}</p>
              </Link>
            </div>
          </div>

          {/* Category 3: Security & Privacy */}
          <div className="dashboard-category-block">
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Lock size={20} /></span>
              {t.securityCategory}
            </h3>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit/tools/protect-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Lock size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.security1Title}</h3>
                <p>{t.security1Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/unlock-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Unlock size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.security2Title}</h3>
                <p>{t.security2Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/redact-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><EyeOff size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.security3Title}</h3>
                <p>{t.security3Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/watermark-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Type size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.security4Title}</h3>
                <p>{t.security4Desc}</p>
              </Link>
            </div>
          </div>

          {/* Category 4: Sign & OCR */}
          <div className="dashboard-category-block" style={{ marginBottom: 0 }}>
            <h3 className="dashboard-category-title">
              <span className="dashboard-category-icon"><Save size={20} /></span>
              {t.signatureCategory}
            </h3>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit/tools/sign-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Save size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.signature1Title}</h3>
                <p>{t.signature1Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/scan-to-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><Camera size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.signature2Title}</h3>
                <p>{t.signature2Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/ocr-pdf')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><FileSearch size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.signature3Title}</h3>
                <p>{t.signature3Desc}</p>
              </Link>
              <Link href={getLink('/pdf-toolkit/tools/add-page-numbers')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <div className="dashboard-card-icon-wrapper"><BookOpen size={18} /></div>
                  <div className="dashboard-card-arrow"><ArrowRight size={16} /></div>
                </div>
                <h3>{t.signature4Title}</h3>
                <p>{t.signature4Desc}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>{t.faqTitle}</h2>
            <p>{t.faqSubtitle}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ1}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA1}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ2}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA2}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ3}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA3}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ4}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA4}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <a href="#tool" className="btn btn-primary">{t.ctaButton}</a>
        </div>
      </section>
    </>
  );
}
