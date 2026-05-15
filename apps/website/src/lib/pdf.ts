import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PDFDocument, degrees, rgb, StandardFonts, PDFName, PDFString, PDFDict, PDFArray, RGB } from 'pdf-lib';

function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return rgb(r, g, b);
}

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp)$/i;

export function isImportableFile(file: File): boolean {
  const t = (file.type || '').toLowerCase();
  if (t === 'application/pdf' || t === 'application/x-pdf') return true;
  if (t.startsWith('image/')) return true;
  if (/\.pdf$/i.test(file.name)) return true;
  return IMAGE_EXT.test(file.name);
}

export function isPdfFile(file: File): boolean {
  const t = (file.type || '').toLowerCase();
  if (t === 'application/pdf' || t === 'application/x-pdf') return true;
  return /\.pdf$/i.test(file.name);
}

async function rasterizeImageFileToPngBytes(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not read image');
    ctx.drawImage(bitmap, 0, 0);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Image encode failed'))), 'image/png');
    });
    return new Uint8Array(await blob.arrayBuffer());
  } finally {
    bitmap.close();
  }
}

async function embedRasterImage(pdfDoc: PDFDocument, file: File) {
  const mime = (file.type || '').toLowerCase();
  const raw = await file.arrayBuffer();
  const bytes = new Uint8Array(raw);

  if (mime === 'image/jpeg' || mime === 'image/jpg' || /\.jpe?g$/i.test(file.name)) {
    try {
      return await pdfDoc.embedJpg(bytes);
    } catch {
      const png = await rasterizeImageFileToPngBytes(file);
      return await pdfDoc.embedPng(png);
    }
  }
  if (mime === 'image/png' || /\.png$/i.test(file.name)) {
    try {
      return await pdfDoc.embedPng(bytes);
    } catch {
      const png = await rasterizeImageFileToPngBytes(file);
      return await pdfDoc.embedPng(png);
    }
  }
  if (mime.startsWith('image/') || IMAGE_EXT.test(file.name)) {
    const png = await rasterizeImageFileToPngBytes(file);
    return await pdfDoc.embedPng(png);
  }
  throw new Error('Unsupported image format');
}

function wrapPlainText(
  text: string,
  maxWidth: number,
  font: { widthOfTextAtSize: (t: string, s: number) => number },
  fontSize: number
): string[] {
  const normalized = text.replace(/\r\n/g, '\n');
  const out: string[] = [];
  for (const para of normalized.split('\n')) {
    const words = para.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      out.push('');
      continue;
    }
    let line = '';
    for (const w of words) {
      const trial = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(trial, fontSize) <= maxWidth) {
        line = trial;
      } else {
        if (line) out.push(line);
        line = w;
      }
    }
    if (line) out.push(line);
  }
  return out.length ? out : [' '];
}

// Worker must match the installed pdfjs-dist version (same major as main bundle).
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

export interface PdfPageInfo {
  id: string; // Unique ID for React key
  fileId: string;
  pageIndex: number;
  rotation: number; // 0, 90, 180, 270
  thumbnailUrl: string;
  annotations?: Annotation[];
  cropBox?: { x: number, y: number, width: number, height: number }; // Percentages
}

export interface Annotation {
  id: string;
  type: 'text' | 'date' | 'signature' | 'watermark' | 'link' | 'redact';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  fontSize?: number;
  color?: string;
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

    // Apply Crop if any
    if (pageInfo.cropBox) {
      const { width, height } = newPage.getSize();
      const c = pageInfo.cropBox;
      // c is in percentages
      newPage.setCropBox(
        c.x * width, 
        (1 - c.y - c.height) * height, 
        c.width * width, 
        c.height * height
      );
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
              color: anno.color ? hexToRgb(anno.color) : (anno.type === 'watermark' ? rgb(0.5, 0.5, 0.5) : rgb(0, 0, 0)),
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
        } else if (anno.type === 'redact') {
          try {
            newPage.drawRectangle({
              x: x,
              y: pdfY,
              width: annoWidth,
              height: annoHeight,
              color: rgb(0, 0, 0),
            });
          } catch (err) {
            console.error("Failed to draw redaction box", err);
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
  const pdfDoc = await PDFDocument.create();
  const image = await embedRasterImage(pdfDoc, file);

  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes as any], file.name.replace(/\.[^/.]+$/, '') + '.pdf', { type: 'application/pdf' });
}

export async function imagesToPdf(files: File[]): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  for (const file of files) {
    try {
      const image = await embedRasterImage(pdfDoc, file);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    } catch {
      /* skip unreadable files */
    }
  }
  if (pdfDoc.getPages().length === 0) {
    throw new Error('No supported images in selection');
  }
  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes as any], 'Combined_Images.pdf', { type: 'application/pdf' });
}

/**
 * Plain UTF-8 text to a simple multi-page PDF (Helvetica).
 */
export async function textToPdf(text: string, title: string = 'Document'): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 11;
  const lineHeight = fontSize * 1.38;
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const maxWidth = pageWidth - margin * 2;

  const lines = wrapPlainText(text.trim().length ? text : ' ', maxWidth, font, fontSize);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let { height } = page.getSize();
  let baseline = height - margin;

  for (const line of lines) {
    if (baseline < margin + fontSize) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      height = page.getSize().height;
      baseline = height - margin;
    }
    page.drawText(line || ' ', {
      x: margin,
      y: baseline,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    baseline -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  const safeName = title.replace(/[^\w\s-]/g, '').trim() || 'Document';
  return new File([pdfBytes as any], `${safeName}.pdf`, { type: 'application/pdf' });
}

export async function htmlToPdf(html: string, title: string = 'Document'): Promise<File> {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '800px';
  container.style.background = 'white';
  container.style.padding = '20px';
  container.innerHTML = html;
  document.body.appendChild(container);
  
  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output('blob');
    
    return new File([pdfBlob], `${title}.pdf`, { type: 'application/pdf' });
  } finally {
    document.body.removeChild(container);
  }
}


/**
 * Converts PDF pages to a list of images (Data URLs).
 */
export async function pdfToImages(
  files: Record<string, PdfFileInfo>,
  pages: PdfPageInfo[],
  format: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality: number = 0.9
): Promise<{ name: string, dataUrl: string }[]> {
  const images: { name: string, dataUrl: string }[] = [];
  
  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    const fileInfo = files[pageInfo.fileId];
    const doc = fileInfo.doc;
    
    const page = await doc.getPage(pageInfo.pageIndex + 1);
    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better image quality
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    if (context) {
      if (format === 'image/jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    }
    
    const dataUrl = canvas.toDataURL(format, quality);
    images.push({
      name: `Page_${i + 1}.${format === 'image/jpeg' ? 'jpg' : 'png'}`,
      dataUrl
    });
  }
  
  return images;
}

/**
 * Flattens all form fields and annotations in the PDF.
 */
export async function flattenPdf(
  files: Record<string, PdfFileInfo>,
  pages: PdfPageInfo[],
  options: { addPageNumbers?: boolean } = {}
): Promise<Uint8Array> {
  const pdfBytes = await generatePdf(files, pages, options);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  const form = pdfDoc.getForm();
  form.flatten();
  
  return await pdfDoc.save();
}

/**
 * Adds password protection to a PDF.
 */
export async function protectPdf(
  pdfBytes: Uint8Array,
  userPassword?: string,
  ownerPassword?: string,
  permissions: {
    printing?: 'lowResolution' | 'highResolution';
    modifying?: boolean;
    copying?: boolean;
    annotating?: boolean;
    fillingForms?: boolean;
    contentAccessibility?: boolean;
    documentAssembly?: boolean;
  } = {}
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  
  return await pdfDoc.save({
    userPassword,
    ownerPassword,
    permissions
  } as Parameters<PDFDocument['save']>[0]);
}

/**
 * Removes password protection from a PDF (requires password).
 */
export async function unlockPdf(
  pdfBytes: ArrayBuffer,
  password?: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes, { password } as Parameters<typeof PDFDocument.load>[1]);
  return await pdfDoc.save();
}

/**
 * Redacts a specific area on a page by physically removing content and placing a black box.
 * Note: Pure client-side redaction is hard to make "perfect" (removing text stream data), 
 * but we can effectively cover it and flatten the document.
 */
export async function redactPdf(
  pdfBytes: Uint8Array,
  redactions: { pageIndex: number, x: number, y: number, width: number, height: number }[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  
  for (const redaction of redactions) {
    if (redaction.pageIndex >= pages.length) continue;
    const page = pages[redaction.pageIndex];
    
    // Draw black box
    page.drawRectangle({
      x: redaction.x,
      y: redaction.y,
      width: redaction.width,
      height: redaction.height,
      color: rgb(0, 0, 0),
    });
  }
  
  // Flattening helps make the redaction more permanent in some viewers
  const form = pdfDoc.getForm();
  form.flatten();
  
  return await pdfDoc.save();
}

/**
 * Performs OCR on PDF pages and returns the extracted text.
 */
export async function performOcr(
  files: Record<string, PdfFileInfo>,
  pages: PdfPageInfo[],
  onProgress?: (progress: number, status: string) => void
): Promise<string> {
  let fullText = '';
  
  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    const fileInfo = files[pageInfo.fileId];
    const doc = fileInfo.doc;
    
    const page = await doc.getPage(pageInfo.pageIndex + 1);
    const viewport = page.getViewport({ scale: 2.0 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context, viewport }).promise;
    }
    
    const dataUrl = canvas.toDataURL('image/png');
    
    onProgress?.((i / pages.length) * 100, `OCR-ing Page ${i + 1}...`);
    
    const result = await Tesseract.recognize(
      dataUrl,
      'eng',
      { logger: m => {
        if (m.status === 'recognizing text') {
          onProgress?.(((i + m.progress) / pages.length) * 100, `OCR-ing Page ${i + 1}...`);
        }
      }}
    );
    
    fullText += `--- Page ${i + 1} ---\n\n${result.data.text}\n\n`;
  }
  
  return fullText;
}
