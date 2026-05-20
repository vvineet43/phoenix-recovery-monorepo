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
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link href="/data-recovery">NexData Recovery</Link></li>
              <li><Link href="/pdf-toolkit">NexPDF Toolkit</Link></li>
              <li><Link href="/exif-stripper">NexStrip EXIF Stripper</Link></li>
              <li><Link href="/image-compressor">NexCompress Image Tool</Link></li>
            </ul>
          </div>

          <div className="footer-group">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link href="/docs">Documentation</Link></li>
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
          <div className="footer-copy">
            Securely processed on your machine.
          </div>
        </div>
      </div>
    </footer>
  );
}
