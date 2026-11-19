import Link from 'next/link';
import { getDictionary } from '@/dictionaries';
import { locales } from '@/lib/i18n-config';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);

  const desc = d.meta.imageToolkit.description || d.imageToolkit.heroDesc;

  return {
    title: d.meta.imageToolkit.title,
    description: desc,
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
      description: desc,
      type: 'website',
      siteName: 'TheNexTools',
      locale: d.meta.layout.ogLocale,
      url: locale === 'en' ? 'https://thenextools.com/image-toolkit' : `https://thenextools.com/${locale}/image-toolkit`,
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
      title: d.meta.imageToolkit.title,
      description: desc,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}


export default async function ImageToolkitPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const locale = lang || 'en';
  const d = await getDictionary(locale);
  const t = d.imageToolkit;

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
              "@type": "WebApplication",
              "name": "NexImage Toolkit",
              "url": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/image-toolkit`,
              "inLanguage": locale,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 and modern JS support",
              "description": d.meta.imageToolkit.description || t.heroDesc,
              "publisher": {
                "@type": "Organization",
                "name": "TheNexTools",
                "url": "https://thenextools.com/"
              },
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
                  "item": locale === 'en' ? "https://thenextools.com/" : `https://thenextools.com/${locale}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t.heroBadge,
                  "item": `https://thenextools.com${locale === 'en' ? '' : `/${locale}`}/image-toolkit`
                }
              ]
            }
          ])
        }}
      />
      <header className="hero container">
        <div className="badge">{t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>
        <div className="hero-actions">
          <Link href={getLink('/image-compressor')} className="btn btn-primary">{t.heroCta}</Link>
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
              <Link href={getLink('/image-compressor')} className="btn btn-outline" style={{ width: 'fit-content' }}>
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
              <Link href={getLink('/image-converter')} className="btn btn-outline" style={{ width: 'fit-content' }}>
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
              <Link href={getLink('/image-redactor')} className="btn btn-outline" style={{ width: 'fit-content' }}>
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
              <Link href={getLink('/exif-stripper')} className="btn btn-outline" style={{ width: 'fit-content' }}>
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
          <Link href={getLink('/image-compressor')} className="btn btn-primary">{t.heroCta}</Link>
        </div>
      </section>
    </main>
  );
}
