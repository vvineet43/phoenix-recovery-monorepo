import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | TheNexTools',
  description: 'Get in touch with the TheNexTools team. We\'re here to help with support questions, refunds, licensing, and general enquiries.',
  alternates: { canonical: '/contact' },
};

const topics = [
  {
    icon: '🛠️',
    title: 'Technical Support',
    desc: 'Tool not working as expected? Bug reports, unexpected behavior, or questions about how a specific tool works.',
    email: 'support@thenextools.com',
    subject: 'Technical Support Request',
  },
  {
    icon: '💳',
    title: 'Billing & Refunds',
    desc: 'Questions about your NexData Pro license, refund requests, or order issues. Have your order number ready if possible.',
    email: 'support@thenextools.com',
    subject: 'Billing / Refund Request',
  },
  {
    icon: '📬',
    title: 'General Enquiries',
    desc: 'Feedback, feature requests, partnership ideas, or anything else that doesn\'t fit the other categories.',
    email: 'contact@thenextools.com',
    subject: 'General Enquiry',
  },
  {
    icon: '🔐',
    title: 'Security & Privacy',
    desc: 'Found a security vulnerability or have a concern about privacy? Please reach out directly — we take these seriously.',
    email: 'contact@thenextools.com',
    subject: 'Security / Privacy Concern',
  },
];

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>

      {/* Hero */}
      <div className="container" style={{ maxWidth: '720px', textAlign: 'center', marginBottom: '4rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>Get in Touch</div>
        <h1 style={{ marginBottom: '1rem' }}>We read every message.</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          TheNexTools is a small team, so you&apos;ll hear back from a real person — not a bot. Pick the right address below and we&apos;ll get back to you as quickly as we can.
        </p>
      </div>

      {/* Topic cards */}
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '4rem' }}>
          {topics.map((t) => (
            <a
              key={t.title}
              href={`mailto:${t.email}?subject=${encodeURIComponent(t.subject)}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card" style={{ height: '100%', cursor: 'pointer' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem', lineHeight: 1 }}>{t.icon}</div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem' }}>{t.title}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.65', flex: 1 }}>{t.desc}</p>
                <div style={{
                  marginTop: '1.25rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  {t.email}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Direct addresses</h2>
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
              }}>Support</div>
              <div>
                <a
                  href="mailto:support@thenextools.com"
                  style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem' }}
                >
                  support@thenextools.com
                </a>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Technical issues, bugs, billing &amp; refunds, licensing questions.
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
              }}>General</div>
              <div>
                <a
                  href="mailto:contact@thenextools.com"
                  style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem' }}
                >
                  contact@thenextools.com
                </a>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Feedback, feature requests, partnerships, press, or anything else.
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
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Response time</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
              We typically respond within <strong>1–2 business days</strong>. We&apos;re a small team, so during busy periods it may take a little longer — but we will reply.
            </p>
          </div>
          <div style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>💸</div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Refund requests</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
              NexData Pro comes with a <strong>10-day refund guarantee</strong>. Email support with your order number and we&apos;ll process it promptly. See our{' '}
              <Link href="/refund-policy" style={{ color: 'var(--primary)' }}>refund policy</Link> for details.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
