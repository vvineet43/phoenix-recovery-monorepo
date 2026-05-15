export const TOOLS_METADATA = {
  'compress-pdf': {
    title: 'Compress PDF Online — Reduce PDF File Size Locally',
    description: 'Compress your PDF files without uploading them. NexPDF reduces file size using your browser, ensuring 100% privacy and lightning-fast processing.',
    h1: 'Compress PDF without compromising privacy.',
    p: 'Email attachments too large? Our compression engine shrinks PDF files locally on your device. You keep your data, and the file gets smaller.',
    features: [
      'Visual quality slider to balance size and clarity',
      'Real-time file size estimation before you download',
      'Works completely offline for sensitive documents',
      'No file size limits or daily quotas'
    ],
    toolParam: 'compress'
  },
  'merge-pdf': {
    title: 'Merge PDF Online — Combine PDF Files Locally',
    description: 'Combine multiple PDF files into one document. 100% private, no server upload required.',
    h1: 'Merge multiple PDFs into one document.',
    p: 'Load multiple files and rearrange pages with a simple drag-and-drop interface. The merging happens entirely on your machine.',
    features: [
      'Combine unlimited PDF files',
      'Rearrange pages before merging',
      'Add images directly into your PDF',
      'Fast, local processing with no file size limits'
    ],
    toolParam: 'merge'
  },
  'split-pdf': {
    title: 'Split PDF Online — Extract Pages from PDF Locally',
    description: 'Split your PDF into multiple documents or extract specific pages. 100% private, no server upload required.',
    h1: 'Extract pages from any PDF instantly.',
    p: 'Split a large document into individual chapters or extract just the pages you need. No waiting for uploads, no server-side processing.',
    features: [
      'Extract custom ranges (e.g. 1-3, 5, 8-10)',
      'Split into equal parts automatically',
      'Export as individual PDFs or a single ZIP file',
      'Securely handles encrypted or large documents'
    ],
    toolParam: 'split'
  },
  'pdf-to-images': {
    title: 'PDF to JPG Online — Convert PDF to Images Locally',
    description: 'Convert PDF pages to high-quality JPEG or PNG images. 100% private, no server upload required.',
    h1: 'Convert PDF pages to high-quality images.',
    p: 'Extract every page of your PDF as a separate image. Choose between JPEG for smaller files or PNG for lossless quality.',
    features: [
      'High-resolution image extraction',
      'Support for JPEG and PNG formats',
      'Batch download as a ZIP file',
      'No server-side processing ensures data privacy'
    ],
    toolParam: 'images'
  },
  'scan-to-pdf': {
    title: 'Scan to PDF Online — Capture Documents via Camera Locally',
    description: 'Use your camera to scan documents directly into PDF format. 100% private, no server upload required.',
    h1: 'Turn your camera into a document scanner.',
    p: 'Capture physical documents using your device\'s camera and convert them to high-quality PDF pages instantly.',
    features: [
      'Direct camera-to-PDF workflow',
      'Optimized for mobile and tablet browsers',
      'Automatic image enhancement for documents',
      'Add scanned pages to existing PDF files'
    ],
    toolParam: 'scan'
  },
  'protect-pdf': {
    title: 'Protect PDF Online — Password Protect PDF Locally',
    description: 'Add passwords and encryption to your PDF files. 100% private, no server upload required.',
    h1: 'Add bank-grade encryption to your PDFs.',
    p: 'Secure your sensitive documents with user and owner passwords. Control printing and editing permissions without uploading files.',
    features: [
      'Strong AES encryption',
      'Set separate open and edit passwords',
      'Restrict printing and copying permissions',
      'Password remains on your device'
    ],
    toolParam: 'protect'
  },
  'unlock-pdf': {
    title: 'Unlock PDF Online — Remove Password from PDF Locally',
    description: 'Remove passwords and restrictions from your PDF files. 100% private, no server upload required.',
    h1: 'Remove passwords from your PDF documents.',
    p: 'If you have the password, you can remove it permanently to make the file easier to share. Processes entirely in your browser.',
    features: [
      'Remove open passwords instantly',
      'Unlock restricted printing and editing',
      'Fast, secure, and local decryption',
      'No need to upload sensitive files'
    ],
    toolParam: 'unlock'
  },
  'watermark-pdf': {
    title: 'Watermark PDF Online — Add Text Watermarks Locally',
    description: 'Add text watermarks to your PDF pages. Customize opacity, position, and text. 100% private.',
    h1: 'Brand or protect your PDFs with watermarks.',
    p: 'Add "CONFIDENTIAL", "DRAFT", or your own custom text to any or all pages of your document.',
    features: [
      'Custom text, font size, and opacity',
      'Multiple positioning options (Center, Diagonal, etc.)',
      'Apply to specific pages or the entire document',
      'Instant preview and local generation'
    ],
    toolParam: 'watermark'
  },
  'ocr-pdf': {
    title: 'OCR PDF Online — Extract Text from PDF Locally',
    description: 'Convert scanned PDFs and images to searchable text using OCR. 100% private, runs in browser.',
    h1: 'Extract searchable text from scans.',
    p: 'Our browser-based OCR engine reads text from images and scanned PDFs so you can copy and search content without uploads.',
    features: [
      'High-accuracy Tesseract.js engine',
      'Support for multiple languages',
      'Processes files locally to ensure data privacy',
      'Directly export extracted text to TXT files'
    ],
    toolParam: 'ocr'
  },
  'redact-pdf': {
    title: 'Redact PDF Online — Securely Hide Sensitive Info Locally',
    description: 'Black out sensitive text or areas in your PDF permanently. 100% private, no server upload required.',
    h1: 'Permanently remove sensitive information.',
    p: 'Use the redaction tool to black out names, numbers, or addresses. The output is flattened to ensure the data cannot be recovered.',
    features: [
      'Secure area-based redaction',
      'Flattened output prevents data recovery',
      'Perfect for legal and financial documents',
      'Your sensitive data never leaves your device'
    ],
    toolParam: 'redact'
  },
  'html-to-pdf': {
    title: 'HTML to PDF Online — Convert Web Content Locally',
    description: 'Convert HTML code to a professional PDF document. 100% private, no server upload required.',
    h1: 'Generate PDFs from HTML code instantly.',
    p: 'Paste your HTML and see it converted to a PDF page. Ideal for developers and designers who need quick previews.',
    features: [
      'Clean HTML-to-PDF rendering',
      'Support for CSS styling',
      'Instant local conversion',
      'Securely handles code snippets'
    ],
    toolParam: 'html'
  },
  'images-to-pdf': {
    title: 'Images to PDF Online — Convert Photos to PDF Locally',
    description: 'Convert JPG, PNG, and WebP images to a single PDF document. 100% private, no server upload required.',
    h1: 'Convert your photos into a professional PDF.',
    p: 'Select multiple images and combine them into a high-quality PDF document. Perfect for portfolios, receipts, and photo albums.',
    features: [
      'Supports JPG, PNG, and WebP',
      'Adjust page margins and orientation',
      'Batch process dozens of images at once',
      'High-quality output with local processing'
    ],
    toolParam: 'batch-upload'
  },
  'rotate-pdf': {
    title: 'Rotate PDF Online — Permanently Rotate PDF Pages Locally',
    description: 'Rotate individual pages or the entire PDF document. 100% private, no server upload required.',
    h1: 'Fix sideways scans by rotating PDF pages.',
    p: 'Rotate any page by 90, 180, or 270 degrees. Save the orientation permanently without uploading your files.',
    features: [
      'Rotate specific pages or all at once',
      'Visual preview of rotation changes',
      'Lossless rotation preserves quality',
      'Works instantly in your browser'
    ],
    toolParam: 'rotate'
  },
  'rearrange-pdf': {
    title: 'Rearrange PDF Pages Online — Organize PDF Locally',
    description: 'Reorder pages in your PDF document with drag-and-drop. 100% private, no server upload required.',
    h1: 'Organize your PDF pages exactly how you want.',
    p: 'Drag and drop page thumbnails to reorder them. Delete unnecessary pages or merge files and then rearrange the final document.',
    features: [
      'Intuitive drag-and-drop interface',
      'Delete unwanted pages instantly',
      'Combine and reorder multiple PDFs',
      '100% local processing for sensitive files'
    ],
    toolParam: 'rearrange'
  },
  'sign-pdf': {
    title: 'Sign PDF Online — Add Electronic Signatures Locally',
    description: 'Sign your PDF documents with handwritten or typed signatures. 100% private, no server upload required.',
    h1: 'Sign documents securely without printing.',
    p: 'Draw your signature with your mouse or touch screen, or type it out. Place it anywhere on the page and export a flattened PDF.',
    features: [
      'Handwritten and typed signature support',
      'Save signatures for future use',
      'Securely sign legal and HR documents',
      'Flattened output ensures signature security'
    ],
    toolParam: 'sign'
  },
  'add-page-numbers': {
    title: 'Add Page Numbers to PDF Online — Local PDF Tools',
    description: 'Add sequential page numbers to your PDF document. Customize position and style. 100% private.',
    h1: 'Number your PDF pages automatically.',
    p: 'Add clear, professional page numbering to the bottom or top of your document. Ideal for reports, manuscripts, and legal filings.',
    features: [
      'Automatic sequential numbering',
      'Multiple placement options',
      'Works on documents of any length',
      'Local generation ensures file privacy'
    ],
    toolParam: 'page-numbers'
  },
  'text-to-pdf': {
    title: 'Text to PDF Online — Convert Plain Text Locally',
    description: 'Convert plain text files or snippets to professional PDF documents. 100% private, no server upload required.',
    h1: 'Turn plain text into a printable PDF.',
    p: 'Paste your notes, logs, or reports and convert them into a clean, standard PDF document instantly.',
    features: [
      'Clean, professional typography',
      'Preserves line breaks and formatting',
      'Instant local conversion',
      'No data leaves your device'
    ],
    toolParam: 'text'
  }
};
