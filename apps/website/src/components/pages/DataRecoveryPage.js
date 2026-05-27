import Link from 'next/link';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  return {
    title: d.meta.dataRecovery.title,
    description: d.dataRecovery.heroDesc,
    alternates: {
      canonical: locale === 'en' ? '/data-recovery' : `/${locale}/data-recovery`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/data-recovery' : `/${l}/data-recovery`;
          return acc;
        }, {}),
        'x-default': '/data-recovery',
      }
    },
    openGraph: {
      title: d.meta.dataRecovery.title,
      description: d.dataRecovery.heroDesc,
      type: 'website',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.meta.dataRecovery.title,
      description: d.dataRecovery.heroDesc,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}


export default async function DataRecoveryPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.dataRecovery;

  return (
    <>
      <header className="hero container">
        <div className="badge">{t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary">{t.heroCta}</a>
        </div>
      </header>

      <section id="features" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.howTitle}</h2>
            <p>{t.howSubtitle}</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>{t.howCard1Title}</h3>
              <p>{t.howCard1Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.howCard2Title}</h3>
              <p>{t.howCard2Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.howCard3Title}</h3>
              <p>{t.howCard3Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.howCard4Title}</h3>
              <p>{t.howCard4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="divider" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t.pricingTitle}</h2>
            <p>{t.pricingSubtitle}</p>
          </div>
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '2rem' }}>
            <div className="feature-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem' }}>{t.freeTitle}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0' }}>
                {t.freePrice} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>{t.freeDuration}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.freeFeature1}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.freeFeature2}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.freeFeature3}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.freeFeature4}</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>💡</span> {t.proFeature1}</li>
                <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted)' }}><span>💡</span> {t.proFeature3}</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="/downloads/NexData_Pro_Trial.dmg" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>{t.freeCtaMac}</a>
                <a href="/downloads/NexData_Pro_Trial.exe" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>{t.freeCtaWin}</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>{t.freeInstallNote}</p>
            </div>
            
            <div className="feature-card popular-card">
              <div style={{ position: 'absolute', top: '-14px', right: '20px', background: 'var(--primary)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(var(--primary), 0.3)' }}>{t.popular}</div>
              <h3 style={{ fontSize: '1.4rem' }}>{t.proTitle}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', margin: '1rem 0 1.5rem 0' }}>
                {t.proPrice} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '500' }}>{t.proDuration}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>{t.proFeature1}</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> <strong>{t.proFeature2}</strong></li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.proFeature3}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.proFeature4}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.proFeature5}</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: 'var(--primary)' }}>✓</span> {t.proFeature6}</li>
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href="https://store.thenextools.com/checkout/buy/dc65d7a1-8030-4e2c-9b29-328989852cd5" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>{t.proCta}</a>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>{t.proDeliveryNote}</p>
            </div>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '2.5rem', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>ℹ️</span> {t.installTitle}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {t.installDesc}
            </p>
            
            <div className="grid-2" style={{ gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🍏 macOS</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Drag the app to <strong>Applications</strong>.</li>
                  <li>Open <strong>Terminal</strong>.</li>
                  <li>Paste this and press Enter:
                    <code style={{ background: '#080c14', padding: '0.6rem', borderRadius: '6px', display: 'block', marginTop: '0.5rem', color: '#32d74b', userSelect: 'all', border: '1px solid #333' }}>xattr -cr "/Applications/NexData Recovery.app"</code>
                  </li>
                  <li>Double-click the app to launch it.</li>
                </ol>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🪟 Windows</h4>
                <ol style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li>Run the downloaded <strong>.exe</strong> file.</li>
                  <li>If you see a blue <em>&quot;Windows protected your PC&quot;</em> prompt — that&apos;s normal for unsigned indie software.</li>
                  <li>Click <strong>&quot;More info&quot;</strong>.</li>
                  <li>Click <strong>&quot;Run anyway&quot;</strong>.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.cantTitle}</h2>
            <p>{t.cantSubtitle}</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>{t.cantCard1Title}</h3>
              <p>{t.cantCard1Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.cantCard2Title}</h3>
              <p>{t.cantCard2Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.cantCard3Title}</h3>
              <p>{t.cantCard3Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.cantCard4Title}</h3>
              <p>{t.cantCard4Desc}</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {t.cantNote}
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <a href="#pricing" className="btn btn-primary">{t.ctaButton}</a>
        </div>
      </section>
    </>
  );
}
