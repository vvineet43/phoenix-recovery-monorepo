'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Copy, Check } from 'lucide-react';
import JSZip from 'jszip';

interface IconSizeConfig {
  name: string;
  width: number;
  height: number;
  filename: string;
  blob: Blob | null;
  previewUrl: string | null;
}

export function FaviconGeneratorApp() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [icons, setIcons] = useState<IconSizeConfig[]>([
    { name: 'Favicon 16x16', width: 16, height: 16, filename: 'favicon-16x16.png', blob: null, previewUrl: null },
    { name: 'Favicon 32x32', width: 32, height: 32, filename: 'favicon-32x32.png', blob: null, previewUrl: null },
    { name: 'Apple Touch Icon 180x180', width: 180, height: 180, filename: 'apple-touch-icon.png', blob: null, previewUrl: null },
    { name: 'Android Chrome 192x192', width: 192, height: 192, filename: 'android-chrome-192x192.png', blob: null, previewUrl: null },
    { name: 'Android Chrome 512x512', width: 512, height: 512, filename: 'android-chrome-512x512.png', blob: null, previewUrl: null },
  ]);

  const [icoBlob, setIcoBlob] = useState<Blob | null>(null);
  const [icoPreview, setIcoPreview] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadSource(file);
    }
  }, []);

  const loadSource = (file: File) => {
    setSourceImage(file);
    const url = URL.createObjectURL(file);
    setSourcePreview(url);
    
    // Reset output icons
    setIcons(prev => prev.map(ico => {
      if (ico.previewUrl) URL.revokeObjectURL(ico.previewUrl);
      return { ...ico, blob: null, previewUrl: null };
    }));
    if (icoPreview) URL.revokeObjectURL(icoPreview);
    setIcoBlob(null);
    setIcoPreview(null);
  };

  const resizeImageToBlob = async (imgElement: HTMLImageElement, width: number, height: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas rendering error'));
        return;
      }
      
      // Use high-quality resizing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Draw centered
      ctx.drawImage(imgElement, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Resizing failed'));
      }, 'image/png');
    });
  };

  // Binary encoder for Multi-Resolution ICO files (.ico) containing PNG payloads
  const generateIcoBlob = (pngSizes: { width: number; height: number; buffer: ArrayBuffer }[]): Blob => {
    const HEADER_SIZE = 6;
    const ENTRY_SIZE = 16;
    const count = pngSizes.length;
    
    const directorySize = count * ENTRY_SIZE;
    const totalHeaderSize = HEADER_SIZE + directorySize;
    
    const icoHeaderBuffer = new ArrayBuffer(totalHeaderSize);
    const view = new DataView(icoHeaderBuffer);
    
    // ICO Header structure
    view.setUint16(0, 0, true); // Reserved (always 0)
    view.setUint16(2, 1, true); // Image type (1 = icon, 2 = cursor)
    view.setUint16(4, count, true); // Number of images
    
    let currentOffset = totalHeaderSize;
    const blobsArray: BlobPart[] = [view];
    
    for (let i = 0; i < count; i++) {
      const img = pngSizes[i];
      const sizeBytes = img.buffer.byteLength;
      const entryOffset = HEADER_SIZE + (i * ENTRY_SIZE);
      
      // Write Directory entry block
      view.setUint8(entryOffset + 0, img.width >= 256 ? 0 : img.width);
      view.setUint8(entryOffset + 1, img.height >= 256 ? 0 : img.height);
      view.setUint8(entryOffset + 2, 0); // Palette colors
      view.setUint8(entryOffset + 3, 0); // Reserved
      view.setUint16(entryOffset + 4, 1, true); // Color planes
      view.setUint16(entryOffset + 6, 32, true); // Bits per pixel (usually 32 for RGBA PNG payloads)
      view.setUint32(entryOffset + 8, sizeBytes, true); // Byte size
      view.setUint32(entryOffset + 12, currentOffset, true); // File offset to image data
      
      blobsArray.push(new Uint8Array(img.buffer));
      currentOffset += sizeBytes;
    }
    
    return new Blob(blobsArray, { type: 'image/x-icon' });
  };

  const generateAllIcons = async () => {
    if (!sourcePreview) return;
    setIsGenerating(true);

    const img = new Image();
    img.src = sourcePreview;
    await new Promise((resolve) => { img.onload = resolve; });

    try {
      // 1. Generate standard PNG formats
      const updatedIcons = [...icons];
      for (let i = 0; i < updatedIcons.length; i++) {
        const conf = updatedIcons[i];
        const blob = await resizeImageToBlob(img, conf.width, conf.height);
        updatedIcons[i] = {
          ...conf,
          blob,
          previewUrl: URL.createObjectURL(blob)
        };
      }
      setIcons(updatedIcons);

      // 2. Generate ICO payload formats (contains 16x16, 32x32, 48x48)
      const icoResolutions = [16, 32, 48];
      const icoParts: { width: number; height: number; buffer: ArrayBuffer }[] = [];
      
      for (const res of icoResolutions) {
        const blob = await resizeImageToBlob(img, res, res);
        const buffer = await blob.arrayBuffer();
        icoParts.push({ width: res, height: res, buffer });
      }

      const generatedIco = generateIcoBlob(icoParts);
      setIcoBlob(generatedIco);
      setIcoPreview(URL.createObjectURL(generatedIco));
    } catch (err) {
      console.error('Error generating favicons', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    
    // Add standard PNGs
    icons.forEach(ico => {
      if (ico.blob) zip.file(ico.filename, ico.blob);
    });

    // Add ICO
    if (icoBlob) zip.file('favicon.ico', icoBlob);

    // Add webmanifest file
    const manifestContent = `{
  "name": "TheNexTools Generated Project",
  "short_name": "NexToolsProject",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;
    zip.file('site.webmanifest', manifestContent);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Favicon_Kit_TheNexTools.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    if (sourcePreview) URL.revokeObjectURL(sourcePreview);
    icons.forEach(ico => {
      if (ico.previewUrl) URL.revokeObjectURL(ico.previewUrl);
    });
    if (icoPreview) URL.revokeObjectURL(icoPreview);
    
    setSourceImage(null);
    setSourcePreview(null);
    setIcoBlob(null);
    setIcoPreview(null);
    setIcons(prev => prev.map(ico => ({ ...ico, blob: null, previewUrl: null })));
  };

  const manifestHtmlCode = `<!-- Link elements for favicon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`;

  const copyCode = () => {
    navigator.clipboard.writeText(manifestHtmlCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="tool-wrapper">
      <div className="tool-container">
        <header className="tool-header">
          <div className="tool-badge">NexIcon — Dev Utilities</div>
          <h1>Favicon &amp; App Icon Generator</h1>
          <p>Instantly generate standard favicons and mobile app launch icons locally inside your browser.</p>
        </header>

        {!sourcePreview ? (
          <div
            className={`dropzone ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={40} className="upload-icon" />
            <h3>Drag &amp; drop a square logo/source image</h3>
            <p>PNG or JPG (recommend at least 512x512px) processed locally</p>
            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Choose Image</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => { if (e.target.files?.[0]) loadSource(e.target.files[0]); }}
            />
          </div>
        ) : (
          <div className="workspace-layout flex-col">
            <div className="redact-toolbar">
              <div className="tool-select-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={sourcePreview} alt="Source" style={{ width: '40px', height: '40px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                <div>
                  <span className="file-name" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{sourceImage?.name}</span>
                  <span className="file-meta" style={{ fontSize: '0.8rem', color: '#64748b' }}>Original Source</span>
                </div>
              </div>

              <div className="action-buttons-group">
                {!icoBlob ? (
                  <button className="btn btn-primary" onClick={generateAllIcons} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate Favicon Kit'}
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={downloadZip}>
                    <Download size={16} /> Download ZIP Bundle
                  </button>
                )}
                <button className="btn btn-outline btn-danger" onClick={resetAll}>
                  Reset Generator
                </button>
              </div>
            </div>

            {icoBlob && (
              <div className="favicon-workspace-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem', marginTop: '1.5rem', width: '100%' }}>
                
                {/* Visual outputs cards listing */}
                <div className="icon-previews-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h3>Generated Assets</h3>
                  
                  {/* ICO Row */}
                  <div className="file-card-item" style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'var(--bg-3)', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>ICO</span>
                    </div>
                    <div className="file-details">
                      <span className="file-name">favicon.ico</span>
                      <span className="file-meta">Legacy Browser Icon (contains 16x16, 32x32, 48x48 resolutions)</span>
                    </div>
                  </div>

                  {/* PNG rows */}
                  {icons.map((ico) => (
                    <div key={ico.name} className="file-card-item" style={{ padding: '0.75rem 1rem' }}>
                      {ico.previewUrl ? (
                        <img src={ico.previewUrl} alt={ico.name} style={{ width: '48px', height: '48px', objectFit: 'contain', background: 'var(--bg-3)', padding: '4px', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: 'var(--bg-3)', borderRadius: '4px' }} />
                      )}
                      <div className="file-details">
                        <span className="file-name">{ico.filename}</span>
                        <span className="file-meta">{ico.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* HTML tags helper card block */}
                <div className="html-helpers-panel" style={{ background: 'var(--bg-2)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '1.25rem', height: 'fit-content' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>Include in your HTML &lt;head&gt;</h3>
                    <button className="icon-btn" onClick={copyCode} title="Copy code snippet">
                      {isCopied ? <Check size={16} className="success-text" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre style={{
                    background: 'var(--bg-3)',
                    color: '#e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    border: '1px solid var(--border-color)',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {manifestHtmlCode}
                  </pre>
                  
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-3)', borderLeft: '3px solid var(--primary-color)', borderRadius: '0 4px 4px 0', fontSize: '0.85rem' }}>
                    💡 Put the generated files directly into your project&apos;s public directory or root folder so they match these paths.
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
