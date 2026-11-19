'use client';

function uint8ToBase64DataUrl(bytes: Uint8Array, mime = 'application/pdf'): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([new Uint8Array(bytes)], { type: mime });
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to encode output'));
    reader.readAsDataURL(blob);
  });
}

async function base64ToFile(base64OrDataUrl: string, filename: string, defaultMime = 'application/pdf'): Promise<File> {
  const dataUrl = base64OrDataUrl.startsWith('data:')
    ? base64OrDataUrl
    : `data:${defaultMime};base64,${base64OrDataUrl}`;
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || defaultMime });
}

export function registerPdfWebMcp(activeToolParam?: string): void {
  if (typeof window === 'undefined' || !('modelContext' in navigator)) return;

  try {
    const mc = (navigator as any).modelContext;
    if (!mc || typeof mc.provideContext !== 'function') return;

    const allTools = [
      {
        toolParam: 'merge',
        name: 'merge_pdf',
        description: 'Merges multiple PDF documents (provided as base64 strings) into a single PDF locally in the browser.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfsBase64: { type: 'array', items: { type: 'string' }, description: 'Array of base64-encoded PDF files to merge in order.' },
            addPageNumbers: { type: 'boolean', default: false },
          },
          required: ['pdfsBase64'],
        },
        execute: async ({ pdfsBase64, addPageNumbers = false }: any) => {
          const pdfLib = await import('./pdf');
          const filesMap: Record<string, any> = {};
          const pages: any[] = [];
          for (let i = 0; i < pdfsBase64.length; i++) {
            const file = await base64ToFile(pdfsBase64[i], `input_${i + 1}.pdf`);
            const loaded = await pdfLib.loadPdfFile(file, `mcp-${i}`);
            filesMap[`mcp-${i}`] = loaded.fileInfo;
            pages.push(...loaded.pages);
          }
          const out = await pdfLib.generatePdf(filesMap, pages, { addPageNumbers });
          return { success: true, pageCount: pages.length, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'compress',
        name: 'compress_pdf',
        description: 'Compresses a PDF file locally in the browser using a target quality percentage (10-100).',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string', description: 'Source PDF as base64 string.' },
            quality: { type: 'integer', default: 60, description: 'Compression quality from 10 to 100.' },
          },
          required: ['pdfBase64'],
        },
        execute: async ({ pdfBase64, quality = 60 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-compress');
          const out = await pdfLib.compressPdf({ 'mcp-compress': loaded.fileInfo }, loaded.pages, quality);
          return { success: true, originalSize: file.size, compressedSize: out.length, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'split',
        name: 'split_pdf',
        description: 'Extracts a specific 1-based page range (startPage to endPage inclusive) from a PDF locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            startPage: { type: 'integer', default: 1 },
            endPage: { type: 'integer', default: 1 },
          },
          required: ['pdfBase64', 'startPage', 'endPage'],
        },
        execute: async ({ pdfBase64, startPage = 1, endPage = 1 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-split');
          const slice = loaded.pages.slice(Math.max(0, startPage - 1), Math.min(loaded.pages.length, endPage));
          const out = await pdfLib.generatePdf({ 'mcp-split': loaded.fileInfo }, slice);
          return { success: true, extractedPages: slice.length, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'images',
        name: 'pdf_to_images',
        description: 'Renders PDF pages into JPEG or PNG base64 images locally in the browser.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            format: { type: 'string', enum: ['image/jpeg', 'image/png'], default: 'image/jpeg' },
            quality: { type: 'number', default: 0.9 },
          },
          required: ['pdfBase64'],
        },
        execute: async ({ pdfBase64, format = 'image/jpeg', quality = 0.9 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-img');
          const images = await pdfLib.pdfToImages({ 'mcp-img': loaded.fileInfo }, loaded.pages, format, quality);
          return { success: true, count: images.length, images };
        },
      },
      {
        toolParam: 'batch-upload',
        name: 'images_to_pdf',
        description: 'Compiles an array of base64 images (JPG, PNG, WebP) into a single PDF locally.',
        inputSchema: {
          type: 'object',
          properties: {
            imagesBase64: { type: 'array', items: { type: 'string' } },
          },
          required: ['imagesBase64'],
        },
        execute: async ({ imagesBase64 }: any) => {
          const pdfLib = await import('./pdf');
          const files: File[] = [];
          for (let i = 0; i < imagesBase64.length; i++) {
            files.push(await base64ToFile(imagesBase64[i], `img_${i + 1}.png`, 'image/png'));
          }
          const pdfFile = await pdfLib.imagesToPdf(files);
          const bytes = new Uint8Array(await pdfFile.arrayBuffer());
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(bytes) };
        },
      },
      {
        toolParam: 'text',
        name: 'text_to_pdf',
        description: 'Converts plain text into a formatted multi-page PDF locally in the browser.',
        inputSchema: {
          type: 'object',
          properties: {
            text: { type: 'string' },
            title: { type: 'string', default: 'Document' },
          },
          required: ['text'],
        },
        execute: async ({ text, title = 'Document' }: any) => {
          const pdfLib = await import('./pdf');
          const pdfFile = await pdfLib.textToPdf(text, title);
          const bytes = new Uint8Array(await pdfFile.arrayBuffer());
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(bytes) };
        },
      },
      {
        toolParam: 'html',
        name: 'html_to_pdf',
        description: 'Converts an HTML snippet into a PDF document locally in the browser.',
        inputSchema: {
          type: 'object',
          properties: {
            html: { type: 'string' },
            title: { type: 'string', default: 'Document' },
          },
          required: ['html'],
        },
        execute: async ({ html, title = 'Document' }: any) => {
          const pdfLib = await import('./pdf');
          const pdfFile = await pdfLib.htmlToPdf(html, title);
          const bytes = new Uint8Array(await pdfFile.arrayBuffer());
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(bytes) };
        },
      },
      {
        toolParam: 'ocr',
        name: 'ocr_pdf',
        description: 'Runs client-side OCR (Tesseract.js) on a PDF to extract plain text locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
          },
          required: ['pdfBase64'],
        },
        execute: async ({ pdfBase64 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-ocr');
          const extractedText = await pdfLib.performOcr({ 'mcp-ocr': loaded.fileInfo }, loaded.pages);
          return { success: true, text: extractedText };
        },
      },
      {
        toolParam: 'protect',
        name: 'protect_pdf',
        description: 'Encrypts a PDF with user/owner passwords locally in the browser.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            userPassword: { type: 'string' },
            ownerPassword: { type: 'string' },
          },
          required: ['pdfBase64', 'userPassword'],
        },
        execute: async ({ pdfBase64, userPassword, ownerPassword }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const bytes = new Uint8Array(await file.arrayBuffer());
          const out = await pdfLib.protectPdf(bytes, userPassword, ownerPassword);
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'unlock',
        name: 'unlock_pdf',
        description: 'Unlocks a password-protected PDF using the authorized password locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['pdfBase64', 'password'],
        },
        execute: async ({ pdfBase64, password }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const out = await pdfLib.unlockPdf(await file.arrayBuffer(), password);
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'rotate',
        name: 'rotate_pdf',
        description: 'Rotates all pages of a PDF by 90, 180, or 270 degrees locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            degrees: { type: 'integer', enum: [90, 180, 270], default: 90 },
          },
          required: ['pdfBase64'],
        },
        execute: async ({ pdfBase64, degrees: rot = 90 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-rot');
          const rotated = loaded.pages.map((p) => ({ ...p, rotation: rot }));
          const out = await pdfLib.generatePdf({ 'mcp-rot': loaded.fileInfo }, rotated);
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'watermark',
        name: 'watermark_pdf',
        description: 'Adds a text watermark across all pages of a PDF locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            text: { type: 'string', default: 'CONFIDENTIAL' },
            opacity: { type: 'number', default: 0.5 },
            position: { type: 'string', enum: ['diagonal', 'center', 'top-left', 'bottom-right'], default: 'diagonal' },
          },
          required: ['pdfBase64', 'text'],
        },
        execute: async ({ pdfBase64, text = 'CONFIDENTIAL', opacity = 0.5, position = 'diagonal' }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-wm');
          const watermarked = loaded.pages.map((p) => ({
            ...p,
            annotations: [{
              id: `wm-${Date.now()}`,
              type: 'watermark' as const,
              x: 0, y: 0, width: 0, height: 0,
              content: text,
              fontSize: 64,
              opacity,
              watermarkPosition: position,
            }],
          }));
          const out = await pdfLib.generatePdf({ 'mcp-wm': loaded.fileInfo }, watermarked);
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'page-numbers',
        name: 'add_page_numbers_pdf',
        description: 'Adds sequential page numbers to the footer of every page in a PDF locally.',
        inputSchema: {
          type: 'object',
          properties: { pdfBase64: { type: 'string' } },
          required: ['pdfBase64'],
        },
        execute: async ({ pdfBase64 }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-pn');
          const out = await pdfLib.generatePdf({ 'mcp-pn': loaded.fileInfo }, loaded.pages, { addPageNumbers: true });
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'redact',
        name: 'redact_pdf',
        description: 'Permanently redacts rectangular regions on PDF pages by rasterizing redacted pages locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            redactions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  pageIndex: { type: 'integer' },
                  x: { type: 'number' },
                  y: { type: 'number' },
                  width: { type: 'number' },
                  height: { type: 'number' },
                },
                required: ['pageIndex', 'x', 'y', 'width', 'height'],
              },
            },
          },
          required: ['pdfBase64', 'redactions'],
        },
        execute: async ({ pdfBase64, redactions }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const bytes = new Uint8Array(await file.arrayBuffer());
          const out = await pdfLib.redactPdf(bytes, redactions);
          return { success: true, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
      {
        toolParam: 'rearrange',
        name: 'rearrange_pdf',
        description: 'Reorders or removes pages in a PDF according to a 1-based pageOrder array locally.',
        inputSchema: {
          type: 'object',
          properties: {
            pdfBase64: { type: 'string' },
            pageOrder: { type: 'array', items: { type: 'integer' }, description: '1-based page numbers in desired order.' },
          },
          required: ['pdfBase64', 'pageOrder'],
        },
        execute: async ({ pdfBase64, pageOrder }: any) => {
          const pdfLib = await import('./pdf');
          const file = await base64ToFile(pdfBase64, 'input.pdf');
          const loaded = await pdfLib.loadPdfFile(file, 'mcp-rearr');
          const ordered = pageOrder
            .map((n: number) => loaded.pages[n - 1])
            .filter(Boolean);
          const out = await pdfLib.generatePdf({ 'mcp-rearr': loaded.fileInfo }, ordered);
          return { success: true, pageCount: ordered.length, pdfBase64: await uint8ToBase64DataUrl(out) };
        },
      },
    ];

    const selected = activeToolParam
      ? allTools.filter((t) => t.toolParam === activeToolParam)
      : allTools;
    const toolsToExpose = selected.length > 0 ? selected : allTools;

    mc.provideContext({
      tools: toolsToExpose.map(({ toolParam: _tp, ...toolDef }) => toolDef),
    });
  } catch (e) {
    console.error('Failed to provide PDF WebMCP context:', e);
  }
}
