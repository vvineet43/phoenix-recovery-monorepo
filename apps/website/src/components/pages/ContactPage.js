import Link from 'next/link';
import { getDictionary } from '@/dictionaries';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  return {
    title: d.meta.contact.title,
    description: d.contact.heroDesc,
    alternates: {
      canonical: locale === 'en' ? '/contact' : `/${locale}/contact`,
      languages: {
        'en': '/contact',
        'es': '/es/contact',
        'x-default': '/contact',
      }
    },
  };
}

export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.contact;

  const topics = [
    {
      icon: '🛠️',
      title: t.supportTitle,
      desc: t.supportDesc,
      email: 'support@thenextools.com',
      subject: d.meta.contact.subjectSupport,
    },
    {
      icon: '💳',
      title: t.billingTitle,
      desc: t.billingDesc,
      email: 'support@thenextools.com',
      subject: d.meta.contact.subjectBilling,
    },
    {
      icon: '📬',
      title: t.generalTitle,
      desc: t.generalDesc,
      email: 'contact@thenextools.com',
      subject: d.meta.contact.subjectGeneral,
    },
    {
      icon: '🔐',
      title: t.securityTitle,
      desc: t.securityDesc,
      email: 'contact@thenextools.com',
      subject: d.meta.contact.subjectSecurity,
    },
  ];


  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>

      {/* Hero */}
      <div className="container" style={{ maxWidth: '720px', textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>{t.heroBadge}</div>
        <h1 style={{ marginBottom: '1rem' }}>{t.heroTitle}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          {t.heroDesc}
        </p>
      </div>

      {/* Topic cards */}
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '4rem' }}>
          {topics.map((item) => (
            <a
              key={item.title}
              href={`mailto:${item.email}?subject=${encodeURIComponent(item.subject)}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card" style={{ height: '100%', cursor: 'pointer' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>{item.icon}</div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{item.title}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.65', flex: 1 }}>{item.desc}</p>
                <div style={{
                  marginTop: '1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  {item.email}
                  <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Direct email addresses */}
        <div style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '3rem',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>{t.directAddresses}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>{t.directSupportLabel}</div>
              <div>
                <a
                  href="mailto:support@thenextools.com"
                  style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem' }}
                >
                  support@thenextools.com
                </a>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  {t.directSupportDesc}
                </p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{
                background: 'var(--bg-3)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>{t.directGeneralLabel}</div>
              <div>
                <a
                  href="mailto:contact@thenextools.com"
                  style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem' }}
                >
                  contact@thenextools.com
                </a>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  {t.directGeneralDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Response time + refund note */}
        <div className="grid-2" style={{ gap: '1.5rem' }}>
          <div style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⏱</div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t.responseTimeTitle}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
              {t.responseTimeDesc}
            </p>
          </div>
          <div style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>💸</div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{t.refundRequestsTitle}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
              {t.refundRequestsDesc}
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
