import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, degrees, rgb, StandardFonts, PDFName, PDFString } from 'pdf-lib';

// Set up the worker for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

export interface PdfPageInfo {
  id: string; // Unique ID for React key
  fileId: string;
  pageIndex: number;
  rotation: number; // 0, 90, 180, 270
  thumbnailUrl: string;
  annotations?: Annotation[];
}

export interface Annotation {
  id: string;
  type: 'text' | 'date' | 'signature' | 'watermark' | 'link';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  fontSize?: number;
  pctX?: number;
  pctY?: number;
  pctW?: number;
  pctH?: number;
  opacity?: number;
  rotation?: number;
  watermarkPosition?: 'center' | 'diagonal' | 'top-left' | 'bottom-right';
  url?: string;
}

export interface PdfFileInfo {
  id: string;
  name: string;
  originalFile: File;
  doc: any; // pdfjs document
  pdfBytes: ArrayBuffer;
}

/**
 * Loads a PDF file and extracts its pages as thumbnails.
 */
export async function loadPdfFile(file: File, fileId: string): Promise<{ fileInfo: PdfFileInfo, pages: PdfPageInfo[] }> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load with pdfjs to generate thumbnails
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
  const doc = await loadingTask.promise;
  
  const pages: PdfPageInfo[] = [];
  
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    // Get viewport for thumbnail (scale down for performance)
    const viewport = page.getViewport({ scale: 0.5 });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Render
    if (context) {
      await page.render({
        canvasContext: context,
        viewport: viewport
      } as any).promise;
    }
    
    // Convert to data URL
    const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
    
    pages.push({
      id: `${fileId}-page-${i}-${Date.now()}`,
      fileId,
      pageIndex: i - 1, // 0-based for pdf-lib
      rotation: 0,
      thumbnailUrl
    });
  }
  
  return {
    fileInfo: {
      id: fileId,
      name: file.name,
      originalFile: file,
      doc,
      pdfBytes: arrayBuffer
    },
    pages
  };
}

/**
 * Generates the final compiled PDF based on the pages order and rotations.
 * Also performs lossless compression by discarding unused objects via PDFDocument.save()
 */
export async function generatePdf(
  files: Record<string, PdfFileInfo>,
  pages: PdfPageInfo[],
  options: { addPageNumbers?: boolean } = {}
): Promise<Uint8Array> {
  // Create a new empty document
  const mergedPdf = await PDFDocument.create();
  
  // Cache for loaded pdf-lib documents so we don't parse the same file multiple times
  const loadedDocs: Record<string, PDFDocument> = {};
  
  for (const fileId of Object.keys(files)) {
    loadedDocs[fileId] = await PDFDocument.load(files[fileId].pdfBytes.slice(0));
  }

  // Iterate through our arranged pages
  const helvetica = await mergedPdf.embedFont(StandardFonts.Helvetica);
  
  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    const sourceDoc = loadedDocs[pageInfo.fileId];
    
    // Copy the page
    const [copiedPage] = await mergedPdf.copyPages(sourceDoc, [pageInfo.pageIndex]);
    
    // Add to merged document first
    const newPage = mergedPdf.addPage(copiedPage);

    // Apply rotation if any
    if (pageInfo.rotation !== 0) {
      const currentRotation = newPage.getRotation().angle;
      newPage.setRotation(degrees(currentRotation + pageInfo.rotation));
    }
    
    // Apply annotations
    if (pageInfo.annotations && pageInfo.annotations.length > 0) {
      const { width, height } = newPage.getSize();
      
      for (const anno of pageInfo.annotations) {
        // pdf-lib origin is bottom-left, DOM origin is top-left
        const x = (anno.pctX || 0) * width;
        const domY = (anno.pctY || 0) * height;
        const annoWidth = (anno.pctW || 0) * width;
        const annoHeight = (anno.pctH || 0) * height;
        const pdfY = height - domY - annoHeight;
        
        if (anno.type === 'link') {
          if (!anno.url) continue;
          try {
            const linkAnnotation = mergedPdf.context.obj({
              Type: 'Annot',
              Subtype: 'Link',
              Rect: [x, pdfY, x + annoWidth, pdfY + annoHeight],
              Border: [0, 0, 0],
              A: {
                Type: 'Action',
                S: 'URI',
                URI: PDFString.of(anno.url),
              },
            });
            let annots = newPage.node.Annots();
            if (!annots) {
              newPage.node.set(PDFName.of('Annots'), mergedPdf.context.obj([]));
              annots = newPage.node.Annots();
            }
            if (annots) {
              annots.push(linkAnnotation);
            }
          } catch (e) {
            console.error("Failed to add link annotation", e);
          }
          continue;
        }
        
        if (anno.type === 'text' || anno.type === 'date' || anno.type === 'watermark') {
          if (!anno.content) continue;
          try {
            let finalX = x;
            let finalY = pdfY + annoHeight - (anno.fontSize || 16);
            let rotate = anno.rotation ? degrees(anno.rotation) : undefined;
            let opacity = anno.opacity !== undefined ? anno.opacity : 1;
            
            if (anno.type === 'watermark') {
              const fSize = anno.fontSize || 64;
              const textWidth = helvetica.widthOfTextAtSize(anno.content, fSize);
              if (anno.watermarkPosition === 'center') {
                finalX = (width / 2) - (textWidth / 2);
                finalY = (height / 2);
              } else if (anno.watermarkPosition === 'diagonal') {
                finalX = (width / 2) - (textWidth / 2 * 0.707);
                finalY = (height / 2) - (textWidth / 2 * 0.707);
                rotate = degrees(45);
              } else if (anno.watermarkPosition === 'top-left') {
                finalX = 40;
                finalY = height - 60;
              } else if (anno.watermarkPosition === 'bottom-right') {
                finalX = width - textWidth - 40;
                finalY = 60;
              }
            }
            
            newPage.drawText(anno.content, {
              x: finalX,
              y: finalY,
              size: anno.fontSize || 16,
              font: helvetica,
              color: anno.type === 'watermark' ? rgb(0.5, 0.5, 0.5) : rgb(0, 0, 0),
              opacity: opacity,
              rotate: rotate
            });
          } catch (err) {
            console.error("Failed to draw text", err);
          }
        } else if (anno.type === 'signature') {
          // It's a data URL image
          try {
            let image;
            if (anno.content.includes('image/png')) {
              image = await mergedPdf.embedPng(anno.content);
            } else if (anno.content.includes('image/jpeg')) {
              image = await mergedPdf.embedJpg(anno.content);
            }
            if (image) {
              newPage.drawImage(image, {
                x: x,
                y: pdfY,
                width: annoWidth,
                height: annoHeight,
              });
            }
          } catch (err) {
            console.error("Failed to embed signature image", err);
          }
        }
      }
    }
    
    // Add page numbers if requested
    if (options.addPageNumbers) {
      const { width, height } = newPage.getSize();
      const text = `Page ${i + 1} of ${pages.length}`;
      const textWidth = helvetica.widthOfTextAtSize(text, 12);
      newPage.drawText(text, {
        x: (width / 2) - (textWidth / 2),
        y: 20,
        size: 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
  }
  
  // Save document (pdf-lib by default does some cleanup of unused objects,
  // achieving a form of non-degrading compression)
  return await mergedPdf.save();
}

/**
 * Generates a compressed PDF by rasterizing pages to JPEG images at a given quality percentage.
 */
export async function compressPdf(
  files: Record<string, PdfFileInfo>,
  pages: PdfPageInfo[],
  qualityPercent: number,
  options: { addPageNumbers?: boolean } = {}
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  const quality = Math.max(0.1, Math.min(1.0, qualityPercent / 100));
  const helvetica = await mergedPdf.embedFont(StandardFonts.Helvetica);
  
  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    const fileInfo = files[pageInfo.fileId];
    const doc = fileInfo.doc;
    
    // pdfjs pages are 1-indexed
    const page = await doc.getPage(pageInfo.pageIndex + 1);
    
    // scale 1.5 gives a good baseline resolution before compression
    const viewport = page.getViewport({ scale: 1.5 }); 
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    if (context) {
      // Fill white background (since JPEGs don't have transparency)
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    }
    
    // Compress to JPEG
    const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
    
    // Embed in new PDF
    const pdfImage = await mergedPdf.embedJpg(imgDataUrl);
    
    const { width, height } = viewport;
    const newPage = mergedPdf.addPage([width, height]);
    
    newPage.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
    
    // Apply user rotation
    if (pageInfo.rotation !== 0) {
      newPage.setRotation(degrees(pageInfo.rotation));
    }

    // Apply annotations
    if (pageInfo.annotations && pageInfo.annotations.length > 0) {
      for (const anno of pageInfo.annotations) {
        const x = (anno.pctX || 0) * width;
        const domY = (anno.pctY || 0) * height;
        const annoWidth = (anno.pctW || 0) * width;
        const annoHeight = (anno.pctH || 0) * height;
        const pdfY = height - domY - annoHeight;
        
        if (anno.type === 'text' || anno.type === 'date' || anno.type === 'watermark') {
          if (!anno.content) continue;
          try {
            let finalX = x;
            let finalY = pdfY + annoHeight - (anno.fontSize || 16);
            let rotate = anno.rotation ? degrees(anno.rotation) : undefined;
            let opacity = anno.opacity !== undefined ? anno.opacity : 1;
            
            if (anno.type === 'watermark') {
              const fSize = anno.fontSize || 64;
              const textWidth = helvetica.widthOfTextAtSize(anno.content, fSize);
              if (anno.watermarkPosition === 'center') {
                finalX = (width / 2) - (textWidth / 2);
                finalY = (height / 2);
              } else if (anno.watermarkPosition === 'diagonal') {
                finalX = (width / 2) - (textWidth / 2 * 0.707);
                finalY = (height / 2) - (textWidth / 2 * 0.707);
                rotate = degrees(45);
              } else if (anno.watermarkPosition === 'top-left') {
                finalX = 40;
                finalY = height - 60;
              } else if (anno.watermarkPosition === 'bottom-right') {
                finalX = width - textWidth - 40;
                finalY = 60;
              }
            }
            
            newPage.drawText(anno.content, {
              x: finalX,
              y: finalY, 
              size: anno.fontSize || 16,
              font: helvetica,
              color: anno.type === 'watermark' ? rgb(0.5, 0.5, 0.5) : rgb(0, 0, 0),
              opacity: opacity,
              rotate: rotate
            });
          } catch (err) {
            console.error("Failed to draw text", err);
          }
        } else if (anno.type === 'signature') {
          try {
            let image;
            if (anno.content.includes('image/png')) {
              image = await mergedPdf.embedPng(anno.content);
            } else if (anno.content.includes('image/jpeg')) {
              image = await mergedPdf.embedJpg(anno.content);
            }
            if (image) {
              newPage.drawImage(image, {
                x: x,
                y: pdfY,
                width: annoWidth,
                height: annoHeight,
              });
            }
          } catch (err) {
            console.error("Failed to embed signature image", err);
          }
        }
      }
    }
    
    // Add page numbers if requested
    if (options.addPageNumbers) {
      const { width, height } = newPage.getSize();
      const text = `Page ${i + 1} of ${pages.length}`;
      const textWidth = helvetica.widthOfTextAtSize(text, 12);
      newPage.drawText(text, {
        x: (width / 2) - (textWidth / 2),
        y: 20,
        size: 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
  }
  
  return await mergedPdf.save();
}

export async function imageToPdf(file: File): Promise<File> {
  const imgBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.create();
  let image;
  if (file.type === 'image/jpeg') {
    image = await pdfDoc.embedJpg(imgBytes);
  } else if (file.type === 'image/png') {
    image = await pdfDoc.embedPng(imgBytes);
  } else {
    throw new Error('Unsupported image format');
  }
  
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });
  
  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes as any], file.name.replace(/\.[^/.]+$/, "") + ".pdf", { type: 'application/pdf' });
}
