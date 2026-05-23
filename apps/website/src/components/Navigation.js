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
    ctaLink = '/data-recovery#pricing';
    ctaText = 'Get NexData Pro';
  } else if (pathname.startsWith('/image-compressor')) {
    ctaLink = '#tool';
    ctaText = 'Start Compressing';
  } else if (pathname.startsWith('/image-converter')) {
    ctaLink = '#tool';
    ctaText = 'Start Converting';
  } else if (pathname.startsWith('/image-redactor')) {
    ctaLink = '#tool';
    ctaText = 'Start Redacting';
  } else if (pathname.startsWith('/exif-stripper')) {
    ctaLink = '#tool';
    ctaText = 'Start Stripping';
  } else if (pathname.startsWith('/image-toolkit')) {
    ctaLink = '/image-compressor';
    ctaText = 'Open NexImage';
  } else if (pathname.startsWith('/pdf-toolkit/tools/')) {
    ctaLink = '#tool';
    ctaText = 'Open Workspace';
  } else if (pathname.startsWith('/pdf-toolkit')) {
    ctaLink = '#tool';
    ctaText = 'Start PDF Editing';
  }

  return (
    <>
      <nav className="site-nav">
        <div className="container nav-inner">
          <Link href="/" className="brand">TheNexTools</Link>
          
          <div className="nav-links nav-desktop">
            <Link href="/data-recovery" className="link">Data Recovery</Link>
            
            {/* PDF Editing dropdown */}
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

            {/* Image Editing dropdown — mirrors PDF pattern */}
            <div 
              className="dropdown"
              onMouseEnter={() => setOpenDropdown('image')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href="/image-toolkit" className="link" style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
                Image Editing <ChevronDown size={14} />
              </Link>
              {openDropdown === 'image' && (
                <div className="mega-menu mega-menu-medium" style={{ minWidth: '420px' }}>
                  <div className="mega-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: '1rem' }}>
                    <Link href="/image-compressor" className="mega-link">
                      <div className="mega-icon"><Minimize2 size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Compress</span>
                        <span className="mega-desc">Shrink JPG, PNG, WebP</span>
                      </div>
                    </Link>
                    <Link href="/image-converter" className="mega-link">
                      <div className="mega-icon"><RefreshCw size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Convert Format</span>
                        <span className="mega-desc">JPG · PNG · WebP</span>
                      </div>
                    </Link>
                    <Link href="/image-redactor" className="mega-link">
                      <div className="mega-icon"><EyeOff size={18} /></div>
                      <div className="mega-content">
                        <span className="mega-title">Redact &amp; Blur</span>
                        <span className="mega-desc">Hide sensitive areas</span>
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
                  <div className="mega-footer">
                    <Link href="/image-toolkit" className="view-all-btn">
                      Open NexImage Toolkit <ArrowRight size={14} />
                    </Link>
                  </div>
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

      {/* Mobile Dropdown Menu */}
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
            <Link href="/image-compressor" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Compress Images</Link>
            <Link href="/image-converter" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Convert Format</Link>
            <Link href="/image-redactor" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>Redact &amp; Blur</Link>
            <Link href="/exif-stripper" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>EXIF Stripper</Link>
            <Link href="/image-toolkit" className="mobile-sublink view-all-mobile" onClick={() => setIsMobileMenuOpen(false)}>Open NexImage Toolkit &rarr;</Link>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <Link href={ctaLink} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => setIsMobileMenuOpen(false)}>
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
