export const TOOLS_METADATA = {
  'compress-pdf': {
    title: 'Compress PDF Locally — Reduce File Size Without Uploading | TheNexTools',
    description: 'Shrink heavy PDF files right in your browser. Adjust quality with a slider, see the estimated size before downloading, and keep your documents private.',
    h1: 'Make that PDF small enough to email.',
    p: 'You have a 40MB scan that needs to be under 10MB for an email attachment. Instead of uploading it to some random compression site, NexPDF handles it locally — you set the quality, see the estimated size, and download the result.',
    features: [
      'Quality slider with real-time file size estimate',
      'Works on scans, reports, and image-heavy documents',
      'No file size limits or daily quotas',
      'Runs offline after the first page load'
    ],
    steps: [
      'Drop your PDF into the upload area.',
      'Move the quality slider until the estimated output size works for you.',
      'Hit "Compress" and the smaller file downloads straight to your hard drive.'
    ],
    toolParam: 'compress'
  },
  'merge-pdf': {
    title: 'Merge PDFs Locally — Combine Documents Without Uploading | TheNexTools',
    description: 'Combine multiple PDF files into a single document. Drag to reorder pages, add images, and download — all processed in your browser.',
    h1: 'Combine multiple PDFs into one document.',
    p: 'Load up all the files, drag pages into the right order, and merge. The whole thing happens on your machine — no upload queue, no file size cap, no account required.',
    features: [
      'Combine as many PDFs as you need in one pass',
      'Drag-and-drop page reordering before merging',
      'Insert images directly into the final document',
      'No file count or size restrictions'
    ],
    steps: [
      'Select or drag in the PDF files you want to combine.',
      'Rearrange pages by dragging thumbnails into the right order.',
      'Click "Merge" to generate your combined document and download it.'
    ],
    toolParam: 'merge'
  },
  'split-pdf': {
    title: 'Split PDF Locally — Extract Pages Without Uploading | TheNexTools',
    description: 'Pull specific pages out of a PDF or split it into separate documents. Runs locally in your browser — no server involved.',
    h1: 'Pull out the pages you need.',
    p: 'You have a 200-page report but only need pages 14 through 22. Or you want to split a document into three separate files by chapter. NexPDF handles both without uploading anything.',
    features: [
      'Custom page ranges (e.g., 1-3, 7, 12-18)',
      'Split into equal parts automatically',
      'Download as separate PDFs or a single ZIP',
      'Handles encrypted and large documents'
    ],
    steps: [
      'Drop your PDF into the upload area.',
      'Enter the page numbers or ranges you want to extract.',
      'Click "Split" and download your extracted pages.'
    ],
    toolParam: 'split'
  },
  'pdf-to-images': {
    title: 'PDF to JPG/PNG Locally — Convert Pages to Images | TheNexTools',
    description: 'Turn each page of a PDF into a high-quality JPEG or PNG image. Processed in your browser — no upload required.',
    h1: 'Turn PDF pages into images.',
    p: 'Need to embed a page from a contract in a presentation? Or save a design mockup PDF as individual PNGs? NexPDF converts each page to a high-res image — pick JPEG for smaller files or PNG for lossless quality.',
    features: [
      'High-resolution output at your chosen DPI',
      'JPEG and PNG format options',
      'Batch download all pages as a ZIP',
      'No server involved — everything stays on your device'
    ],
    steps: [
      'Upload the PDF you want to convert.',
      'Choose JPEG or PNG and set your quality preference.',
      'Click "Convert" and download the images individually or as a ZIP.'
    ],
    toolParam: 'images'
  },
  'scan-to-pdf': {
    title: 'Scan to PDF — Use Your Camera as a Document Scanner | TheNexTools',
    description: 'Capture physical documents with your camera and convert them to PDF pages instantly. Everything stays on your device.',
    h1: 'Use your phone camera as a document scanner.',
    p: 'Point your camera at a receipt, a whiteboard, or a paper form — NexPDF captures it and converts it to a clean PDF page. No dedicated scanner hardware needed, and the images never leave your device.',
    features: [
      'Capture directly from your device camera',
      'Works well on phones and tablets',
      'Automatic contrast enhancement for text documents',
      'Combine multiple scans into one PDF'
    ],
    steps: [
      'Tap the camera button and point it at your document.',
      'Take photos of each page. You can capture as many as you need.',
      'Click "Create PDF" to combine all scans into a single document.'
    ],
    toolParam: 'scan'
  },
  'protect-pdf': {
    title: 'Password Protect PDF Locally — Encrypt Without Uploading | TheNexTools',
    description: 'Add password protection and AES encryption to your PDFs. Runs entirely in your browser — the password never touches a server.',
    h1: 'Lock your PDF with a password.',
    p: 'Set an open password so only authorized people can view the document, and optionally set a separate owner password to restrict printing and editing. The encryption happens locally — your password is never transmitted anywhere.',
    features: [
      'AES encryption applied in your browser',
      'Separate open and owner passwords',
      'Control printing, copying, and editing permissions',
      'The password never leaves your device'
    ],
    steps: [
      'Drop your PDF into the upload area.',
      'Enter a password. Optionally set separate permissions for printing and editing.',
      'Click "Protect" to encrypt the file and download the secured version.'
    ],
    toolParam: 'protect'
  },
  'unlock-pdf': {
    title: 'Remove PDF Password Locally — Unlock Without Uploading | TheNexTools',
    description: 'Remove password protection from your PDF files. Enter the password once and download an unprotected copy — all in your browser.',
    h1: 'Remove the password from your PDF.',
    p: 'You know the password but you\'re tired of typing it every time you open the file. Or you need to share an unlocked version with someone. Enter the password once here and download a clean, unprotected copy.',
    features: [
      'Removes open passwords instantly',
      'Unlocks printing and editing restrictions',
      'Decryption runs locally in your browser',
      'No need to upload the file anywhere'
    ],
    steps: [
      'Upload the password-protected PDF.',
      'Enter the correct password.',
      'Click "Unlock" and download the unprotected version.'
    ],
    toolParam: 'unlock'
  },
  'watermark-pdf': {
    title: 'Add Watermark to PDF Locally — Stamp Text on Pages | TheNexTools',
    description: 'Stamp "CONFIDENTIAL", "DRAFT", or custom text across your PDF pages. Customize opacity, size, and position — all in your browser.',
    h1: 'Stamp your PDFs before sharing them.',
    p: 'Mark a draft with "DRAFT" so nobody treats it as final. Stamp "CONFIDENTIAL" on an internal report. Or add your company name as a subtle watermark across every page. Adjust the text, size, opacity, and position to get exactly the look you want.',
    features: [
      'Custom text with adjustable font size and opacity',
      'Center, diagonal, header, or footer positioning',
      'Apply to specific pages or the whole document',
      'Live preview before saving'
    ],
    steps: [
      'Upload your PDF.',
      'Type your watermark text and adjust the size, opacity, and position.',
      'Click "Apply" and download the stamped document.'
    ],
    toolParam: 'watermark'
  },
  'ocr-pdf': {
    title: 'OCR PDF Locally — Extract Text from Scanned Documents | TheNexTools',
    description: 'Convert scanned PDFs and images into searchable, selectable text using browser-based OCR. No upload required.',
    h1: 'Get searchable text out of a scanned document.',
    p: 'Someone sent you a scan of a contract and you need to copy a paragraph. Or you have a stack of old paper documents photographed as PDFs and need to search through them. NexPDF\'s OCR engine reads the text from the image and gives you a copyable, searchable result.',
    features: [
      'Powered by Tesseract.js — runs in your browser',
      'Supports multiple languages',
      'No server involved, so sensitive documents stay private',
      'Export extracted text as a .txt file'
    ],
    steps: [
      'Upload your scanned PDF or image.',
      'Select the document language to optimize recognition.',
      'Click "Extract Text" and copy the result or download it as a text file.'
    ],
    toolParam: 'ocr'
  },
  'redact-pdf': {
    title: 'Redact PDF Locally — Permanently Black Out Sensitive Text | TheNexTools',
    description: 'Draw black boxes over names, numbers, and addresses in your PDF. The redaction is permanent — the hidden text cannot be recovered.',
    h1: 'Black out what shouldn\'t be visible.',
    p: 'Draw redaction boxes over social security numbers, client names, financial figures, or anything else that needs to stay hidden. The output is flattened — the text underneath is permanently destroyed, not just covered with a shape.',
    features: [
      'Area-based redaction with permanent flattening',
      'Hidden text cannot be copy-pasted or extracted',
      'Suitable for legal, financial, and medical documents',
      'Everything processed on your device'
    ],
    steps: [
      'Drop your PDF into the editor.',
      'Draw black boxes over the text or areas you want to hide.',
      'Click "Redact" to flatten the document and download the final version.'
    ],
    toolParam: 'redact'
  },
  'html-to-pdf': {
    title: 'HTML to PDF Locally — Convert Web Content to PDF | TheNexTools',
    description: 'Paste HTML code and get a formatted PDF back instantly. Supports CSS styling. Runs in your browser.',
    h1: 'Turn HTML into a downloadable PDF.',
    p: 'Paste in your HTML — an invoice template, a report layout, a styled email — and NexPDF renders it as a clean PDF you can save or print. Handy for developers who need a quick PDF preview without setting up a headless browser.',
    features: [
      'Renders HTML with CSS styling',
      'Instant preview before conversion',
      'Useful for invoices, reports, and email templates',
      'No external API or service required'
    ],
    steps: [
      'Paste your HTML (and optional CSS) into the editor.',
      'Check the rendered preview to make sure it looks right.',
      'Click "Convert to PDF" and download the result.'
    ],
    toolParam: 'html'
  },
  'images-to-pdf': {
    title: 'Images to PDF Locally — Combine Photos into a Document | TheNexTools',
    description: 'Convert JPG, PNG, and WebP images into a single PDF document. Rearrange pages, adjust margins, and download — all in your browser.',
    h1: 'Turn a stack of images into a single PDF.',
    p: 'You photographed a multi-page document with your phone and now you need it as a single PDF. Or you have a set of design mockups that need to go out as one file. Drop them in, arrange the order, and export.',
    features: [
      'Accepts JPG, PNG, and WebP',
      'Drag-and-drop page ordering',
      'Adjustable margins and page orientation',
      'No image count or file size limits'
    ],
    steps: [
      'Upload your images (JPG, PNG, or WebP).',
      'Drag them into the order you want.',
      'Click "Create PDF" and download your document.'
    ],
    toolParam: 'batch-upload'
  },
  'rotate-pdf': {
    title: 'Rotate PDF Pages Locally — Fix Sideways Scans | TheNexTools',
    description: 'Rotate individual pages or the entire PDF by 90, 180, or 270 degrees. Saved permanently. No upload required.',
    h1: 'Fix the pages that came through sideways.',
    p: 'Scanned documents and phone photos end up in the wrong orientation all the time. Click to rotate individual pages or the whole document, and save the corrected version. The rotation is permanent — it\'s not just a viewer setting.',
    features: [
      'Rotate individual pages or the full document',
      'Visual preview of every rotation',
      'Lossless — no recompression of content',
      'Works on any PDF regardless of size'
    ],
    steps: [
      'Upload the PDF with sideways or upside-down pages.',
      'Click the rotate button on the pages that need fixing.',
      'Click "Save" to download the corrected document.'
    ],
    toolParam: 'rotate'
  },
  'rearrange-pdf': {
    title: 'Rearrange PDF Pages Locally — Drag and Drop Reordering | TheNexTools',
    description: 'Reorder, remove, and reorganize pages in your PDF with drag-and-drop. Runs locally in your browser.',
    h1: 'Put the pages in the right order.',
    p: 'The appendix ended up before the introduction, or there are three blank pages in the middle that need to go. Drag thumbnails around to reorder, click to delete, and download the cleaned-up version.',
    features: [
      'Visual drag-and-drop page reordering',
      'Delete unwanted pages with one click',
      'Combine and reorder across multiple PDFs',
      'Handles large documents smoothly'
    ],
    steps: [
      'Drop your PDF into the upload area.',
      'Drag page thumbnails into the correct order, or delete the ones you don\'t need.',
      'Click "Save" to download the reorganized document.'
    ],
    toolParam: 'rearrange'
  },
  'sign-pdf': {
    title: 'Sign PDF Locally — Add Your Signature Without Printing | TheNexTools',
    description: 'Draw or type your signature onto any PDF page. The output is flattened so the signature can\'t be moved or edited. No upload required.',
    h1: 'Sign it without printing it.',
    p: 'Draw your signature with a mouse or touchscreen, or type it and pick a cursive font. Place it on the right line, resize it, and export a flattened PDF. The signature becomes part of the page — it can\'t be selected, moved, or edited by the recipient.',
    features: [
      'Handwritten (draw) and typed signature modes',
      'Save signatures for reuse across documents',
      'Flattened output — signature can\'t be tampered with',
      'Works for leases, NDAs, HR forms, and more'
    ],
    steps: [
      'Upload the document that needs your signature.',
      'Draw your signature or type it with a cursive font.',
      'Drag it to the correct spot, click "Export," and download the signed PDF.'
    ],
    toolParam: 'sign'
  },
  'add-page-numbers': {
    title: 'Add Page Numbers to PDF Locally — Automatic Pagination | TheNexTools',
    description: 'Add sequential page numbers to your PDF. Choose the position and style. Runs locally in your browser.',
    h1: 'Number your pages automatically.',
    p: 'Reports, manuscripts, court filings — anything longer than a few pages usually needs page numbers. Pick where they go (bottom center, top right, etc.) and NexPDF stamps them across every page.',
    features: [
      'Sequential numbering across all pages',
      'Multiple position options (top, bottom, left, right, center)',
      'Works on documents of any length',
      'Processed locally for sensitive documents'
    ],
    steps: [
      'Upload the PDF you want to number.',
      'Choose where the page numbers should appear.',
      'Click "Add Numbers" and download the paginated document.'
    ],
    toolParam: 'page-numbers'
  },
  'text-to-pdf': {
    title: 'Text to PDF Locally — Convert Plain Text to a Formatted Document | TheNexTools',
    description: 'Paste plain text and get a clean, formatted PDF back. Preserves line breaks and spacing. Runs in your browser.',
    h1: 'Turn plain text into a proper PDF.',
    p: 'You have meeting notes, server logs, or a code snippet that needs to go out as a PDF. Paste the text in, check the preview, and download a cleanly formatted document. Line breaks and spacing are preserved exactly.',
    features: [
      'Clean typography with consistent formatting',
      'Preserves line breaks, indentation, and spacing',
      'Instant conversion with live preview',
      'No data leaves your browser'
    ],
    steps: [
      'Paste your text into the editor.',
      'Check the formatted preview.',
      'Click "Convert to PDF" and download the result.'
    ],
    toolParam: 'text'
  }
};
