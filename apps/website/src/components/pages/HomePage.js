import Link from 'next/link';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  const desc = d.meta.home.description || d.home.heroDesc;

  return {
    title: d.meta.home.title,
    description: desc,
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/' : `/${l}`;
          return acc;
        }, {}),
        'x-default': '/',
      }
    },
    openGraph: {
      title: d.meta.home.title,
      description: desc,
      type: 'website',
      siteName: 'TheNexTools',
      locale: d.meta.layout.ogLocale,
      url: locale === 'en' ? 'https://thenextools.com/' : `https://thenextools.com/${locale}`,
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
          alt: 'TheNexTools — Free Offline PDF, Image & Data Recovery Tools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.meta.home.title,
      description: desc,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}


export default async function HomePage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.home;

  const getLink = (path) => {
    if (locale === 'en') return path;
    return `/${locale}${path === '/' ? '' : path}`;
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TheNexTools",
              "url": "https://thenextools.com/",
              "logo": "https://thenextools.com/thenextools-com-icon-512.png",
              "sameAs": [
                "https://x.com/TheNexTool",
                "https://www.facebook.com/TheNexTools/"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TheNexTools",
              "url": locale === 'en' ? "https://thenextools.com/" : `https://thenextools.com/${locale}`,
              "description": t.heroDesc,
              "inLanguage": locale
            }
          ])
        }}
      />
      <header className="hero container">
        <div className="badge">{t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <div className="hero-actions">
          <a href="#tools" className="btn btn-primary">{t.heroCta}</a>
        </div>
      </header>

      {/* Why offline */}
      <section id="why" className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t.whyTitle}</h2>
            <p>{t.whySubtitle}</p>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <h3>{t.whyCard1Title}</h3>
              <p>{t.whyCard1Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.whyCard2Title}</h3>
              <p>{t.whyCard2Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.whyCard3Title}</h3>
              <p>{t.whyCard3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools">
        <div className="container">
          <div className="section-header">
            <h2>{t.lineupTitle}</h2>
            <p>{t.lineupSubtitle}</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card">
              <h3>{t.dataRecoveryTitle}</h3>
              <p>{t.dataRecoveryDesc}</p>
              <ul>
                <li>{t.dataRecoveryFeature1}</li>
                <li>{t.dataRecoveryFeature2}</li>
                <li>{t.dataRecoveryFeature3}</li>
              </ul>
              <Link href={getLink('/data-recovery')} className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.learnMore}
              </Link>
            </div>

            <div className="tool-card">
              <h3>{t.pdfToolkitTitle}</h3>
              <p>{t.pdfToolkitDesc}</p>
              <ul>
                <li>{t.pdfToolkitFeature1}</li>
                <li>{t.pdfToolkitFeature2}</li>
                <li>{t.pdfToolkitFeature3}</li>
              </ul>
              <Link href={getLink('/pdf-toolkit')} className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.learnMore}
              </Link>
            </div>

            <div className="tool-card">
              <h3>{t.imageToolkitTitle}</h3>
              <p>{t.imageToolkitDesc}</p>
              <ul>
                <li>{t.imageToolkitFeature1}</li>
                <li>{t.imageToolkitFeature2}</li>
                <li>{t.imageToolkitFeature3}</li>
              </ul>
              <Link href={getLink('/image-toolkit')} className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.learnMore}
              </Link>
            </div>

          </div>

          {/* Direct quick-links to core tool landing pages for fast discovery & crawl depth */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <Link href={getLink('/pdf-toolkit/tools/merge-pdf')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.mergePdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/compress-pdf')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.compressPdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/split-pdf')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.splitPdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/pdf-to-images')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.pdfToImagesTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/redact-pdf')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.redactPdfTitle}</Link>
            <Link href={getLink('/image-compressor')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageCompressTitle}</Link>
            <Link href={getLink('/image-converter')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageConvertTitle}</Link>
            <Link href={getLink('/image-redactor')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageRedactTitle}</Link>
            <Link href={getLink('/exif-stripper')} className="badge" style={{ textDecoration: 'none' }}>{d.nav.exifStripperTitle}</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t.whyTitle}</h2>
          <p>{t.whySubtitle}</p>
          <a href="#tools" className="btn btn-primary">{t.heroCta}</a>
        </div>
      </section>
    </main>
  );
}
