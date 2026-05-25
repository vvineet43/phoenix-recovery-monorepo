import Link from 'next/link';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  return {
    title: d.meta.imageToolkit.title,
    description: d.imageToolkit.heroDesc,
    manifest: '/image-manifest.json',
    alternates: {
      canonical: locale === 'en' ? '/image-toolkit' : `/${locale}/image-toolkit`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-toolkit' : `/${l}/image-toolkit`;
          return acc;
        }, {}),
        'x-default': '/image-toolkit',
      }
    },
    openGraph: {
      title: d.meta.imageToolkit.title,
      description: d.imageToolkit.heroDesc,
      url: `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/image-toolkit`,
      type: 'website',
    },
  };
}


export default async function ImageToolkitPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.imageToolkit;

  return (
    <>
      <header className="hero container">
        <div className="badge">{t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <div className="hero-actions">
          <Link href="/image-compressor" className="btn btn-primary">{t.heroCta}</Link>
        </div>
      </header>

      <section id="tools" style={{ background: 'var(--bg-2)' }} className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.includedTitle}</h2>
            <p>{t.includedSubtitle}</p>
          </div>
          <div className="grid-tools">

            <div className="tool-card">
              <h3>{t.compressorTitle}</h3>
              <p>{t.compressorDesc}</p>
              <ul>
                <li>{t.compressorFeature1}</li>
                <li>{t.compressorFeature2}</li>
                <li>{t.compressorFeature3}</li>
              </ul>
              <Link href="/image-compressor" className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.compressorCta}
              </Link>
            </div>

            <div className="tool-card">
              <h3>{t.converterTitle}</h3>
              <p>{t.converterDesc}</p>
              <ul>
                <li>{t.converterFeature1}</li>
                <li>{t.converterFeature2}</li>
                <li>{t.converterFeature3}</li>
              </ul>
              <Link href="/image-converter" className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.converterCta}
              </Link>
            </div>

            <div className="tool-card">
              <h3>{t.redactorTitle}</h3>
              <p>{t.redactorDesc}</p>
              <ul>
                <li>{t.redactorFeature1}</li>
                <li>{t.redactorFeature2}</li>
                <li>{t.redactorFeature3}</li>
              </ul>
              <Link href="/image-redactor" className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.redactorCta}
              </Link>
            </div>

            <div className="tool-card">
              <h3>{t.stripperTitle}</h3>
              <p>{t.stripperDesc}</p>
              <ul>
                <li>{t.stripperFeature1}</li>
                <li>{t.stripperFeature2}</li>
                <li>{t.stripperFeature3}</li>
              </ul>
              <Link href="/exif-stripper" className="btn btn-outline" style={{ width: 'fit-content' }}>
                {t.stripperCta}
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section id="privacy" className="divider">
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

      <section className="cta-section">
        <div className="container">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaSubtitle}</p>
          <Link href="/image-compressor" className="btn btn-primary">{t.heroCta}</Link>
        </div>
      </section>
    </>
  );
}
