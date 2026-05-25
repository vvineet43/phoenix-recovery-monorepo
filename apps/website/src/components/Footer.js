'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const hiddenPaths = ['/pdf-tools', '/image-tools', '/exif-tools'];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">TheNexTools</Link>
            <p>High-performance, private desktop utilities that run entirely on your device. No uploads, no accounts, no nonsense.</p>
          </div>
          
          <div className="footer-group">
            <div className="footer-group-title">Product</div>
            <ul className="footer-links">
              <li><Link href="/data-recovery">NexData Recovery</Link></li>
              <li><Link href="/pdf-toolkit">NexPDF Toolkit</Link></li>
              <li><Link href="/exif-stripper">NexStrip EXIF Stripper</Link></li>
              <li><Link href="/image-compressor">NexCompress Image Tool</Link></li>
            </ul>
          </div>

          <div className="footer-group">
            <div className="footer-group-title">Resources</div>
            <ul className="footer-links">
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} TheNexTools. All rights reserved.
          </p>
          <div className="footer-socials">
            <Link href="/sitemap" className="footer-bottom-link">Sitemap</Link>
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
