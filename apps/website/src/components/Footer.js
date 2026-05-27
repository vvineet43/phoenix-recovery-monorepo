'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { locales, defaultLocale, localeNames } from '@/lib/i18n-config';
import enDict from '../dictionaries/en.json';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const hiddenPaths = ['/pdf-tools', '/image-tools', '/exif-tools'];
  
  // Parse active locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const lang = locales.includes(segments[0]) ? segments[0] : defaultLocale;

  // Dictionary state (default to statically loaded English)
  const [dict, setDict] = useState(lang === 'en' ? enDict : null);

  useEffect(() => {
    if (lang === 'en') {
      setDict(enDict);
    } else {
      import(`../dictionaries/${lang}.json`)
        .then((m) => setDict(m.default))
        .catch((err) => {
          console.error(`Failed to load dictionary for ${lang}`, err);
          setDict(enDict);
        });
    }
  }, [lang]);

  const cleanPath = locales.includes(segments[0]) ? '/' + segments.slice(1).join('/') : pathname;
  if (hiddenPaths.includes(cleanPath)) return null;

  const d = dict || enDict;
  const t = d.footer;

  // Dynamic link prepending helper (English has no prefix)
  const getLink = (path) => {
    if (path.startsWith('http') || path.startsWith('#')) return path;
    if (lang === 'en') return path;
    return `/${lang}${path === '/' ? '' : path}`;
  };

  const handleLangChange = (newLang) => {
    if (newLang === 'en') {
      router.push(cleanPath);
    } else {
      router.push(`/${newLang}${cleanPath === '/' ? '' : cleanPath}`);
    }
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={getLink('/')} className="brand">TheNexTools</Link>
            <p>{t.brandDesc}</p>
          </div>
          
          <div className="footer-group">
            <div className="footer-group-title">{t.product}</div>
            <ul className="footer-links">
              <li><Link href={getLink('/data-recovery')}>{d.home.dataRecoveryTitle}</Link></li>
              <li><Link href={getLink('/pdf-toolkit')}>{d.home.pdfToolkitTitle}</Link></li>
              <li><Link href={getLink('/exif-stripper')}>{d.nav.exifStripperTitle}</Link></li>
              <li><Link href={getLink('/image-compressor')}>{d.nav.imageCompressTitle}</Link></li>
            </ul>
          </div>

          <div className="footer-group">
            <div className="footer-group-title">{t.resources}</div>
            <ul className="footer-links">
              <li><Link href={getLink('/docs')}>{t.documentation}</Link></li>
              <li><Link href={getLink('/contact')}>{t.contact}</Link></li>
              <li><Link href={getLink('/refund-policy')}>{t.refund}</Link></li>
              <li><Link href={getLink('/privacy')}>{t.privacy}</Link></li>
              <li><Link href={getLink('/terms')}>{t.terms}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} TheNexTools. All rights reserved.
          </p>
          <div className="footer-socials">
            {/* Language Selector */}
            <select 
              value={lang} 
              onChange={(e) => handleLangChange(e.target.value)}
              className="footer-lang-select"
              aria-label="Select Language"
            >
              {locales.map((l) => (
                <option key={l} value={l}>
                  {localeNames[l]}
                </option>
              ))}
            </select>

            <Link href={getLink('/sitemap')} className="footer-bottom-link">{t.sitemap}</Link>
            <a 
              href="https://x.com/TheNexTool" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link"
              aria-label="Follow us on X (formerly Twitter)"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/TheNexTools/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-link"
              aria-label="Follow us on Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
