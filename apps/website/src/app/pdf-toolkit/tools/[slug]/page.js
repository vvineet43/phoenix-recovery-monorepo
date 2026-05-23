import Link from 'next/link';
import { TOOLS_METADATA } from '../../../../lib/pdf-tools-metadata';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, Lock, Zap, ChevronLeft, ArrowRight,
  Minimize2, Scissors, Type, ShieldAlert, FileSearch, Download, Plus, ImageIcon, FileCode, FileText, Camera,
  RefreshCw, Layers, Save
} from 'lucide-react';
import { LaunchSection } from './LaunchSection';

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
  const { slug } = await params;
  const tool = TOOLS_METADATA[slug];
  
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: `/pdf-toolkit/tools/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(TOOLS_METADATA).map((slug) => ({
    slug,
  }));
}

export default async function ToolSeoPage({ params }) {
  const { slug } = await params;
  const tool = TOOLS_METADATA[slug];

  if (!tool) {
    notFound();
  }

  const ToolIcon = ICON_MAP[tool.toolParam] || FileText;

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
                  "name": `How do I ${tool.h1.toLowerCase().replace('.', '')} locally?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${tool.steps.map(s => `${s.title}: ${s.desc}`).join(' ')} All of this is done on your machine.`
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are my PDF files safe during this process?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Because NexPDF runs entirely client-side using WebAssembly, the document is never uploaded to any external server. Your sensitive data is kept 100% private."
                  }
                },
                {
                  "@type": "Question",
                  "name": `Is there a file size limit for ${tool.h1.toLowerCase().replace('.', '')}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, there are no artificial file size caps. The only physical limit is your device's available browser memory, which easily handles large documents."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does it work offline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, NexPDF is cached inside your browser after the first load. You can disconnect your internet and continue to use the tool completely offline."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": `NexPDF ${tool.h1.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('.', '')}`,
              "url": `https://thenextools.com/pdf-toolkit/tools/${slug}`,
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
                  "name": "Home",
                  "item": "https://thenextools.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "PDF Toolkit",
                  "item": "https://thenextools.com/pdf-toolkit"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": tool.h1.replace('.', ''),
                  "item": `https://thenextools.com/pdf-toolkit/tools/${slug}`
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
          <LaunchSection toolParam={tool.toolParam} label={tool.h1.toLowerCase().replace('.', '')} />
        </div>
      </header>

      <section className="divider" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid-2">
            <div className="feature-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Key Benefits</h3>
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
              <h3>Local & Private</h3>
              <p>
                This tool processes your files directly in your browser — nothing gets uploaded to a server. When you're working with <strong>{tool.h1.toLowerCase().replace('.', '')}</strong>, the document stays on your machine from start to finish.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div className="badge"><ShieldCheck size={14} /> Private</div>
                <div className="badge"><Lock size={14} /> Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {tool.steps && (
        <section className="divider" style={{ background: 'var(--bg-2)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{tool.howToTitle || `How to ${tool.h1.toLowerCase().replace('.', '')}`}</h2>
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
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about {tool.h1.toLowerCase().replace('.', '')}.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                How do I {tool.h1.toLowerCase().replace('.', '')} locally?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {tool.steps.map(s => `${s.title}: ${s.desc}`).join(' ')} All of this is done on your machine.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Are my PDF files safe during this process?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Absolutely. Because NexPDF runs entirely client-side using WebAssembly, the document is never uploaded to any external server. Your sensitive data is kept 100% private.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Is there a file size limit for {tool.h1.toLowerCase().replace('.', '')}?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                No, there are no artificial file size caps. The only physical limit is your device&apos;s available browser memory, which easily handles large documents.
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                Does it work offline?
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Yes, NexPDF is cached inside your browser after the first load. You can disconnect your internet and continue to use the tool completely offline.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Drop your file in the workspace at the top of the page. No registration required.</p>
          <a href="#" className="btn btn-primary">Back to Tool</a>
        </div>
      </section>
    </>
  );
}
