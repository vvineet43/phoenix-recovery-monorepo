import Link from 'next/link';
import { TOOLS_METADATA } from '../../../../lib/pdf-tools-metadata';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, Lock, Zap, ChevronLeft, ArrowRight,
  Minimize2, Scissors, Type, ShieldAlert, FileSearch, Download, Plus, ImageIcon, FileCode, FileText, Camera,
  RefreshCw, Layers, Save
} from 'lucide-react';
import { LaunchSection } from './LaunchSection';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

const ICON_MAP = {
  'compress': Minimize2,
  'split': Scissors,
  'watermark': Type,
  'protect': Lock,
  'ocr': FileSearch,
  'redact': ShieldAlert,
  'merge': Plus,
  'images': ImageIcon,
  'html': FileCode,
  'text': FileText,
  'scan': Camera,
  'batch-upload': ImageIcon,
  'rotate': RefreshCw,
  'rearrange': Layers,
  'sign': Save,
  'page-numbers': FileText
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams || {};
  const locale = lang || 'en';
  
  const d = await getDictionary(locale);
  const tool = d.pdfTools?.tools?.[slug];
  
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: locale === 'en' ? `/pdf-toolkit/tools/${slug}` : `/${locale}/pdf-toolkit/tools/${slug}`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? `/pdf-toolkit/tools/${slug}` : `/${l}/pdf-toolkit/tools/${slug}`;
          return acc;
        }, {}),
        'x-default': `/pdf-toolkit/tools/${slug}`,
      }
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/pdf-toolkit/tools/${slug}`,
      type: 'website',
    },
    twitter: {
      title: tool.title,
      description: tool.description,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(TOOLS_METADATA).map((slug) => ({
    slug,
  }));
}

export default async function ToolSeoPage({ params }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams || {};
  const locale = lang || 'en';
  
  const d = await getDictionary(locale);
  const tool = d.pdfTools?.tools?.[slug];
  const s = d.pdfTools?.seoPage;

  if (!tool || !s) {
    notFound();
  }

  const originalTool = TOOLS_METADATA[slug];
  if (!originalTool) {
    notFound();
  }

  const ToolIcon = ICON_MAP[originalTool.toolParam] || FileText;
  const localizedLabel = tool.h1.toLowerCase().replace('.', '');

  // Helper to replace templates like {tool} and {steps}
  const t = (str, replacements = {}) => {
    let res = str;
    for (const key in replacements) {
      res = res.replace(`{${key}}`, replacements[key]);
    }
    return res;
  };

  const stepsDescStr = tool.steps ? tool.steps.map(step => `${step.title}: ${step.desc}`).join(' ') : '';

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
                  "name": t(s.faqQ1, { tool: localizedLabel }),
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t(s.faqA1, { steps: stepsDescStr })
                  }
                },
                {
                  "@type": "Question",
                  "name": s.faqQ2,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": s.faqA2
                  }
                },
                {
                  "@type": "Question",
                  "name": t(s.faqQ3, { tool: localizedLabel }),
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": s.faqA3
                  }
                },
                {
                  "@type": "Question",
                  "name": s.faqQ4,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": s.faqA4
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": `NexPDF ${tool.h1.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('.', '')}`,
              "url": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/pdf-toolkit/tools/${slug}`,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 and modern JS support",
              "description": tool.description,
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
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": tool.h1.replace('.', ''),
                  "item": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/pdf-toolkit/tools/${slug}`
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ textAlign: 'left', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', paddingBottom: '3.5rem' }}>
        <div className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
          <ToolIcon size={14} /> NexPDF Toolkit
        </div>
        <h1 style={{ margin: '0 0 1.5rem 0' }}>{tool.h1}</h1>
        <p style={{ margin: '0 0 3rem 0', maxWidth: '700px', textAlign: 'left' }}>{tool.p}</p>
        
        <div id="tool" style={{ width: '100%', textAlign: 'left' }}>
          <LaunchSection 
            toolParam={originalTool.toolParam} 
            label={localizedLabel} 
            translations={{
              uploadSelect: s.uploadSelect,
              uploadDrop: s.uploadDrop,
              uploadLoading: s.uploadLoading
            }}
            locale={locale}
          />
        </div>
      </header>

      <section className="divider" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid-2">
            <div className="feature-card">
              <h3 style={{ marginBottom: '1.5rem' }}>{s.keyBenefits}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tool.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--primary)', marginTop: '0.2rem' }}><Zap size={18} /></div>
                    <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-card" style={{ background: 'var(--bg-2)' }}>
              <h3>{s.localPrivate}</h3>
              <p>
                {t(s.localPrivateDesc, { tool: localizedLabel })}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div className="badge"><ShieldCheck size={14} /> {s.privateBadge}</div>
                <div className="badge"><Lock size={14} /> {s.secureBadge}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {tool.steps && (
        <section className="divider" style={{ background: 'var(--bg-2)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{tool.howToTitle || (s.howToPrefix + localizedLabel)}</h2>
            <div className="premium-steps-grid">
              {tool.steps.map((step, index) => (
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
      )}

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>{s.faqTitle}</h2>
            <p>{t(s.faqSubtitle, { tool: localizedLabel })}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t(s.faqQ1, { tool: localizedLabel })}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t(s.faqA1, { steps: stepsDescStr })}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {s.faqQ2}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {s.faqA2}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t(s.faqQ3, { tool: localizedLabel })}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {s.faqA3}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {s.faqQ4}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {s.faqA4}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{s.readyTitle}</h2>
          <p>{s.readyDesc}</p>
          <a href="#tool" className="btn btn-primary">{s.backToTool}</a>
        </div>
      </section>
    </>
  );
}
