'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Menu, X, 
  Plus, Scissors, Minimize2, Type, 
  ImageIcon, ShieldAlert, ArrowRight, HardDrive, FileImage
} from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Dynamic CTA logic based on current page
  let ctaLink = '/#tools';
  let ctaText = 'Explore All Tools';
  if (pathname.startsWith('/data-recovery')) {
    ctaLink = '/data-recovery#download';
    ctaText = 'Get NexData Pro';
  } else if (pathname.startsWith('/image-compressor')) {
    ctaLink = '/image-tools';
    ctaText = 'Open Compressor';
  } else if (pathname.startsWith('/exif-stripper')) {
    ctaLink = '/exif-tools';
    ctaText = 'Open EXIF Tool';
  } else if (pathname.startsWith('/pdf-toolkit')) {
    ctaLink = '/pdf-tools';
    ctaText = 'Open PDF Editor';
  }

  // Hide navigation on actual tool app pages
  const hiddenPaths = ['/pdf-tools', '/image-tools', '/exif-tools'];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <>
      <nav className="site-nav">
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          
          <div className="nav-links nav-desktop">
            <Link href="/data-recovery" className="link">Data Recovery</Link>
            
            <div 
              className="dropdown"
              onMouseEnter={() => setOpenDropdown('pdf')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href="/pdf-toolkit" className="link" style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
                PDF Editing <ChevronDown size={14} />
              </Link>
              {openDropdown === 'pdf' && (
                <div className="mega-menu">
                  <div className="mega-grid">
                    <Link href="/pdf-toolkit/tools/merge-pdf" className="mega-link">
                      <div className="mega-icon"><Plus size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Merge PDF</span>
                        <span className="mega-desc">Combine multiple files</span>
                      </div>
                    </Link>
                    <Link href="/pdf-toolkit/tools/split-pdf" className="mega-link">
                      <div className="mega-icon"><Scissors size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Split PDF</span>
                        <span className="mega-desc">Extract specific pages</span>
                      </div>
                    </Link>
                    <Link href="/pdf-toolkit/tools/compress-pdf" className="mega-link">
                      <div className="mega-icon"><Minimize2 size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Compress PDF</span>
                        <span className="mega-desc">Reduce file size offline</span>
                      </div>
                    </Link>
                    <Link href="/pdf-toolkit/tools/watermark-pdf" className="mega-link">
                      <div className="mega-icon"><Type size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Watermark PDF</span>
                        <span className="mega-desc">Add text stamps</span>
                      </div>
                    </Link>
                    <Link href="/pdf-toolkit/tools/pdf-to-images" className="mega-link">
                      <div className="mega-icon"><ImageIcon size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">PDF to Images</span>
                        <span className="mega-desc">Convert to JPG/PNG</span>
                      </div>
                    </Link>
                    <Link href="/pdf-toolkit/tools/redact-pdf" className="mega-link">
                      <div className="mega-icon"><ShieldAlert size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Redact PDF</span>
                        <span className="mega-desc">Hide sensitive text</span>
                      </div>
                    </Link>
                  </div>
                  <div className="mega-footer">
                    <Link href="/pdf-toolkit" className="view-all-btn">
                      View All 17 Tools <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div 
              className="dropdown"
              onMouseEnter={() => setOpenDropdown('image')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className="link" style={{display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer'}}>
                Image Editing <ChevronDown size={14} />
              </span>
              {openDropdown === 'image' && (
                <div className="mega-menu mega-menu-small">
                  <Link href="/image-compressor" className="mega-link">
                    <div className="mega-icon"><Minimize2 size={18} /></div>
                    <div className="mega-content">
                      <span className="mega-title">Image Compressor</span>
                      <span className="mega-desc">Shrink WebP, PNG, JPG</span>
                    </div>
                  </Link>
                  <Link href="/exif-stripper" className="mega-link">
                    <div className="mega-icon"><FileImage size={18} /></div>
                    <div className="mega-content">
                      <span className="mega-title">EXIF Stripper</span>
                      <span className="mega-desc">Remove photo metadata</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href={ctaLink} className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
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

      {/* Mobile Dropdown Menu (Moved outside nav to fix CSS backdrop-filter stacking context) */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-scroll">
          <Link href="/data-recovery" className="mobile-link">
            <HardDrive size={18}/> Data Recovery
          </Link>
          
          <div className="mobile-group">
            <div className="mobile-group-title">PDF Editing</div>
            <Link href="/pdf-toolkit/tools/merge-pdf" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Merge PDF</Link>
            <Link href="/pdf-toolkit/tools/split-pdf" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Split PDF</Link>
            <Link href="/pdf-toolkit/tools/compress-pdf" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Compress PDF</Link>
            <Link href="/pdf-toolkit/tools/watermark-pdf" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Watermark PDF</Link>
            <Link href="/pdf-toolkit/tools/pdf-to-images" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>PDF to Images</Link>
            <Link href="/pdf-toolkit" className="mobile-sublink view-all-mobile" onClick={() => setIsMobileMenuOpen(false)}>View All 17 Tools &rarr;</Link>
          </div>

          <div className="mobile-group">
            <div className="mobile-group-title">Image Editing</div>
            <Link href="/image-compressor" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Image Compressor</Link>
            <Link href="/exif-stripper" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>EXIF Stripper</Link>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <Link href={ctaLink} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => setIsMobileMenuOpen(false)}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div style={{ height: 'var(--nav-h)' }}></div>
    </>
  );
}
