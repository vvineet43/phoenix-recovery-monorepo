'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Menu, X, 
  Plus, Scissors, Minimize2, Type, 
  ImageIcon, ShieldAlert, ArrowRight, HardDrive, FileImage,
  RefreshCw, EyeOff
} from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navigation.css';
import { locales, defaultLocale, localeNames } from '@/lib/i18n-config';
import enDict from '../dictionaries/en.json';

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Parse active locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const lang = locales.includes(segments[0]) ? segments[0] : defaultLocale;
  
  // Dictionary state (default to statically loaded English)
  const [d, setD] = useState(lang === 'en' ? enDict : null);

  useEffect(() => {
    if (lang === 'en') {
      setD(enDict);
    } else {
      import(`../dictionaries/${lang}.json`)
        .then((m) => setD(m.default))
        .catch((err) => {
          console.error(`Failed to load dictionary for ${lang}`, err);
          setD(enDict);
        });
    }
  }, [lang]);

  // Clean pathname without locale prefix for path checking
  const cleanPath = locales.includes(segments[0]) ? '/' + segments.slice(1).join('/') : pathname;

  const activeDict = d || enDict;
  const t = activeDict.nav;



  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic link prepending helper (English has no prefix)
  const getLink = (path) => {
    if (path.startsWith('http') || path.startsWith('#')) return path;
    if (lang === 'en') return path;
    return `/${lang}${path === '/' ? '' : path}`;
  };

  // Dynamic CTA logic based on current page
  let ctaLink = '/#tools';
  let ctaText = t.ctaExplore;
  if (cleanPath.startsWith('/data-recovery')) {
    ctaLink = '/data-recovery#pricing';
    ctaText = t.ctaGetPro;
  } else if (cleanPath.startsWith('/image-compressor')) {
    ctaLink = '#tool';
    ctaText = t.ctaCompress;
  } else if (cleanPath.startsWith('/image-converter')) {
    ctaLink = '#tool';
    ctaText = t.ctaConvert;
  } else if (cleanPath.startsWith('/image-redactor')) {
    ctaLink = '#tool';
    ctaText = t.ctaRedact;
  } else if (cleanPath.startsWith('/exif-stripper')) {
    ctaLink = '#tool';
    ctaText = t.ctaStrip;
  } else if (cleanPath.startsWith('/image-toolkit')) {
    ctaLink = '/image-compressor';
    ctaText = t.ctaCompress;
  } else if (cleanPath.startsWith('/pdf-toolkit/tools/')) {
    ctaLink = '#tool';
    ctaText = t.ctaPdfTool;
  } else if (cleanPath.startsWith('/pdf-toolkit')) {
    ctaLink = '#tool';
    ctaText = t.ctaPdf;
  }

  return (
    <>
      <nav className="site-nav">
        <div className="container nav-inner">
          <Link href={getLink('/')} className="brand">{t.brand}</Link>
          
          <div className="nav-links nav-desktop">
            <Link href={getLink('/data-recovery')} className="link">{t.dataRecovery}</Link>
            
            {/* PDF Editing dropdown */}
            <div 
              className="dropdown"
              onMouseEnter={() => setOpenDropdown('pdf')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href={getLink('/pdf-toolkit')} className="link" style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
                {t.pdfEditing} <ChevronDown size={14} />
              </Link>
              {openDropdown === 'pdf' && (
                <div className="mega-menu">
                  <div className="mega-grid">
                    <Link href={getLink('/pdf-toolkit/tools/merge-pdf')} className="mega-link">
                      <div className="mega-icon"><Plus size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.mergePdfTitle}</span>
                        <span className="mega-desc">{t.mergePdfDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/pdf-toolkit/tools/split-pdf')} className="mega-link">
                      <div className="mega-icon"><Scissors size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.splitPdfTitle}</span>
                        <span className="mega-desc">{t.splitPdfDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/pdf-toolkit/tools/compress-pdf')} className="mega-link">
                      <div className="mega-icon"><Minimize2 size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.compressPdfTitle}</span>
                        <span className="mega-desc">{t.compressPdfDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/pdf-toolkit/tools/watermark-pdf')} className="mega-link">
                      <div className="mega-icon"><Type size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.watermarkPdfTitle}</span>
                        <span className="mega-desc">{t.watermarkPdfDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/pdf-toolkit/tools/pdf-to-images')} className="mega-link">
                      <div className="mega-icon"><ImageIcon size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.pdfToImagesTitle}</span>
                        <span className="mega-desc">{t.pdfToImagesDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/pdf-toolkit/tools/redact-pdf')} className="mega-link">
                      <div className="mega-icon"><ShieldAlert size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.redactPdfTitle}</span>
                        <span className="mega-desc">{t.redactPdfDesc}</span>
                      </div>
                    </Link>
                  </div>
                  <div className="mega-footer">
                    <Link href={getLink('/pdf-toolkit')} className="view-all-btn">
                      {t.viewAllPdf} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Image Editing dropdown */}
            <div 
              className="dropdown"
              onMouseEnter={() => setOpenDropdown('image')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href={getLink('/image-toolkit')} className="link" style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
                {t.imageEditing} <ChevronDown size={14} />
              </Link>
              {openDropdown === 'image' && (
                <div className="mega-menu mega-menu-medium" style={{ minWidth: '420px' }}>
                  <div className="mega-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '1rem' }}>
                    <Link href={getLink('/image-compressor')} className="mega-link">
                      <div className="mega-icon"><Minimize2 size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.imageCompressTitle}</span>
                        <span className="mega-desc">{t.imageCompressDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/image-converter')} className="mega-link">
                      <div className="mega-icon"><RefreshCw size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.imageConvertTitle}</span>
                        <span className="mega-desc">{t.imageConvertDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/image-redactor')} className="mega-link">
                      <div className="mega-icon"><EyeOff size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.imageRedactTitle}</span>
                        <span className="mega-desc">{t.imageRedactDesc}</span>
                      </div>
                    </Link>
                    <Link href={getLink('/exif-stripper')} className="mega-link">
                      <div className="mega-icon"><FileImage size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">{t.exifStripperTitle}</span>
                        <span className="mega-desc">{t.exifStripperDesc}</span>
                      </div>
                    </Link>
                  </div>
                  <div className="mega-footer">
                    <Link href={getLink('/image-toolkit')} className="view-all-btn">
                      {t.viewAllImage} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href={getLink(ctaLink)} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
              {ctaText}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-scroll">
          <Link href={getLink('/data-recovery')} className="mobile-link">
            <HardDrive size={18}/> {t.dataRecovery}
          </Link>
          
          <div className="mobile-group">
            <div className="mobile-group-title">{t.pdfEditing}</div>
            <Link href={getLink('/pdf-toolkit/tools/merge-pdf')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.mergePdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/split-pdf')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.splitPdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/compress-pdf')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.compressPdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/watermark-pdf')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.watermarkPdfTitle}</Link>
            <Link href={getLink('/pdf-toolkit/tools/pdf-to-images')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.pdfToImagesTitle}</Link>
            <Link href={getLink('/pdf-toolkit')} className="mobile-sublink view-all-mobile" onClick={() => setIsMobileMenuOpen(false)}>{t.viewAllPdf} &rarr;</Link>
          </div>

          <div className="mobile-group">
            <div className="mobile-group-title">{t.imageEditing}</div>
            <Link href={getLink('/image-compressor')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.imageCompressTitle}</Link>
            <Link href={getLink('/image-converter')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.imageConvertTitle}</Link>
            <Link href={getLink('/image-redactor')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.imageRedactTitle}</Link>
            <Link href={getLink('/exif-stripper')} className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>{t.exifStripperTitle}</Link>
            <Link href={getLink('/image-toolkit')} className="mobile-sublink view-all-mobile" onClick={() => setIsMobileMenuOpen(false)}>{t.viewAllImage} &rarr;</Link>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <Link href={getLink(ctaLink)} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => setIsMobileMenuOpen(false)}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
