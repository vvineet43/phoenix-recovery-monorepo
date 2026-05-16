export const TOOLS_METADATA = {
  'compress-pdf': {
    title: 'Compress PDF Online — Reduce PDF File Size Locally | TheNexTools',
    description: 'Compress your PDF files without uploading them. NexPDF reduces file size using your browser, ensuring 100% privacy and lightning-fast processing.',
    h1: 'Compress PDF without compromising privacy.',
    p: 'Email attachments too large? Our compression engine shrinks PDF files locally on your device. You keep your data, and the file gets smaller.',
    features: [
      'Visual quality slider to balance size and clarity',
      'Real-time file size estimation before you download',
      'Works completely offline for sensitive documents',
      'No file size limits or daily quotas'
    ],
    steps: [
      'Drag and drop your PDF document into the upload zone above.',
      'Adjust the compression slider to find the perfect balance between file size and image quality.',
      'Click "Compress PDF" and download the smaller file directly to your hard drive.'
    ],
    toolParam: 'compress'
  },
  'merge-pdf': {
    title: 'Merge PDF Online — Combine PDF Files Locally | TheNexTools',
    description: 'Combine multiple PDF files into one document. 100% private, no server upload required.',
    h1: 'Merge multiple PDFs into one document.',
    p: 'Load multiple files and rearrange pages with a simple drag-and-drop interface. The merging happens entirely on your machine, keeping your documents private.',
    features: [
      'Combine unlimited PDF files',
      'Rearrange pages before merging',
      'Add images directly into your PDF',
      'Fast, local processing with no file size limits'
    ],
    steps: [
      'Select two or more PDF files you wish to combine.',
      'Drag and drop the files or individual pages to reorder them exactly how you want.',
      'Click "Merge PDFs" to instantly generate and download your combined document.'
    ],
    toolParam: 'merge'
  },
  'split-pdf': {
    title: 'Split PDF Online — Extract Pages from PDF Locally | TheNexTools',
    description: 'Split your PDF into multiple documents or extract specific pages. 100% private, no server upload required.',
    h1: 'Extract pages from any PDF instantly.',
    p: 'Split a large document into individual chapters or extract just the pages you need. No waiting for uploads, no server-side processing.',
    features: [
      'Extract custom ranges (e.g. 1-3, 5, 8-10)',
      'Split into equal parts automatically',
      'Export as individual PDFs or a single ZIP file',
      'Securely handles encrypted or large documents'
    ],
    steps: [
      'Upload the PDF you want to split by dropping it into the dropzone.',
      'Select the specific pages you want to extract, or define custom page ranges.',
      'Click "Split PDF" to instantly download your extracted pages as a new document or ZIP file.'
    ],
    toolParam: 'split'
  },
  'pdf-to-images': {
    title: 'PDF to JPG Online — Convert PDF to Images Locally | TheNexTools',
    description: 'Convert PDF pages to high-quality JPEG or PNG images. 100% private, no server upload required.',
    h1: 'Convert PDF pages to high-quality images.',
    p: 'Extract every page of your PDF as a separate image. Choose between JPEG for smaller files or PNG for lossless quality, all processed directly in your browser.',
    features: [
      'High-resolution image extraction',
      'Support for JPEG and PNG formats',
      'Batch download as a ZIP file',
      'No server-side processing ensures data privacy'
    ],
    steps: [
      'Select the PDF file you wish to convert into images.',
      'Choose your preferred image format (JPEG or PNG) and image quality settings.',
      'Click "Convert" to instantly extract all pages and download them securely in a ZIP archive.'
    ],
    toolParam: 'images'
  },
  'scan-to-pdf': {
    title: 'Scan to PDF Online — Capture Documents via Camera Locally | TheNexTools',
    description: 'Use your camera to scan documents directly into PDF format. 100% private, no server upload required.',
    h1: 'Turn your camera into a document scanner.',
    p: 'Capture physical documents using your device\'s camera and convert them to high-quality PDF pages instantly, without the images ever leaving your device.',
    features: [
      'Direct camera-to-PDF workflow',
      'Optimized for mobile and tablet browsers',
      'Automatic image enhancement for documents',
      'Add scanned pages to existing PDF files'
    ],
    steps: [
      'Click the upload area and select your device\'s camera to begin scanning.',
      'Take photos of your physical documents. You can capture multiple pages in succession.',
      'Click "Create PDF" to instantly compile the photos into a single, high-quality document.'
    ],
    toolParam: 'scan'
  },
  'protect-pdf': {
    title: 'Protect PDF Online — Password Protect PDF Locally | TheNexTools',
    description: 'Add passwords and encryption to your PDF files. 100% private, no server upload required.',
    h1: 'Add bank-grade encryption to your PDFs.',
    p: 'Secure your sensitive documents with user and owner passwords. Control printing and editing permissions without uploading files to an external server.',
    features: [
      'Strong AES encryption',
      'Set separate open and edit passwords',
      'Restrict printing and copying permissions',
      'Password remains on your device'
    ],
    steps: [
      'Drop the PDF document you want to secure into the upload zone.',
      'Enter a strong password. You can set an "open" password and an "owner" password for permissions.',
      'Click "Protect PDF" to encrypt the file locally using bank-grade AES encryption.'
    ],
    toolParam: 'protect'
  },
  'unlock-pdf': {
    title: 'Unlock PDF Online — Remove Password from PDF Locally | TheNexTools',
    description: 'Remove passwords and restrictions from your PDF files. 100% private, no server upload required.',
    h1: 'Remove passwords from your PDF documents.',
    p: 'If you have the password, you can remove it permanently to make the file easier to share. The decryption processes entirely in your browser for total privacy.',
    features: [
      'Remove open passwords instantly',
      'Unlock restricted printing and editing',
      'Fast, secure, and local decryption',
      'No need to upload sensitive files'
    ],
    steps: [
      'Upload the password-protected PDF document.',
      'Enter the correct password to unlock the file within your browser.',
      'Click "Unlock PDF" to strip the password and download the unprotected version.'
    ],
    toolParam: 'unlock'
  },
  'watermark-pdf': {
    title: 'Watermark PDF Online — Add Text Watermarks Locally | TheNexTools',
    description: 'Add text watermarks to your PDF pages. Customize opacity, position, and text. 100% private.',
    h1: 'Brand or protect your PDFs with watermarks.',
    p: 'Add "CONFIDENTIAL", "DRAFT", or your own custom text to any or all pages of your document natively in your browser.',
    features: [
      'Custom text, font size, and opacity',
      'Multiple positioning options (Center, Diagonal, etc.)',
      'Apply to specific pages or the entire document',
      'Instant preview and local generation'
    ],
    steps: [
      'Select the PDF file you wish to stamp with a watermark.',
      'Type your watermark text (e.g., "CONFIDENTIAL") and adjust the font size, opacity, and position.',
      'Click "Apply Watermark" to stamp your document and download the finalized PDF.'
    ],
    toolParam: 'watermark'
  },
  'ocr-pdf': {
    title: 'OCR PDF Online — Extract Text from PDF Locally | TheNexTools',
    description: 'Convert scanned PDFs and images to searchable text using OCR. 100% private, runs in browser.',
    h1: 'Extract searchable text from scans.',
    p: 'Our browser-based OCR engine reads text from images and scanned PDFs so you can copy and search content without ever uploading your private files.',
    features: [
      'High-accuracy Tesseract.js engine',
      'Support for multiple languages',
      'Processes files locally to ensure data privacy',
      'Directly export extracted text to TXT files'
    ],
    steps: [
      'Upload your scanned PDF or image containing text.',
      'Select the language of the document to optimize the Optical Character Recognition (OCR) engine.',
      'Click "Extract Text" to process the scan locally and copy or download the resulting text.'
    ],
    toolParam: 'ocr'
  },
  'redact-pdf': {
    title: 'Redact PDF Online — Securely Hide Sensitive Info Locally | TheNexTools',
    description: 'Black out sensitive text or areas in your PDF permanently. 100% private, no server upload required.',
    h1: 'Permanently remove sensitive information.',
    p: 'Use the redaction tool to black out names, numbers, or addresses. The output is flattened locally to ensure the data cannot be recovered.',
    features: [
      'Secure area-based redaction',
      'Flattened output prevents data recovery',
      'Perfect for legal and financial documents',
      'Your sensitive data never leaves your device'
    ],
    steps: [
      'Drop your sensitive PDF document into the editor.',
      'Draw black boxes over any sensitive text, names, or addresses you need to hide.',
      'Click "Redact PDF" to permanently flatten the document, ensuring the hidden text cannot be copy-pasted or recovered.'
    ],
    toolParam: 'redact'
  },
  'html-to-pdf': {
    title: 'HTML to PDF Online — Convert Web Content Locally | TheNexTools',
    description: 'Convert HTML code to a professional PDF document. 100% private, no server upload required.',
    h1: 'Generate PDFs from HTML code instantly.',
    p: 'Paste your HTML and see it converted to a PDF page. Ideal for developers and designers who need quick previews without relying on third-party APIs.',
    features: [
      'Clean HTML-to-PDF rendering',
      'Support for CSS styling',
      'Instant local conversion',
      'Securely handles code snippets'
    ],
    steps: [
      'Paste your raw HTML code or CSS snippets into the editor.',
      'Preview the rendered web content in real-time.',
      'Click "Convert to PDF" to generate and download a perfectly formatted PDF version of your code.'
    ],
    toolParam: 'html'
  },
  'images-to-pdf': {
    title: 'Images to PDF Online — Convert Photos to PDF Locally | TheNexTools',
    description: 'Convert JPG, PNG, and WebP images to a single PDF document. 100% private, no server upload required.',
    h1: 'Convert your photos into a professional PDF.',
    p: 'Select multiple images and combine them into a high-quality PDF document locally. Perfect for keeping portfolios, receipts, and private photos offline.',
    features: [
      'Supports JPG, PNG, and WebP',
      'Adjust page margins and orientation',
      'Batch process dozens of images at once',
      'High-quality output with local processing'
    ],
    steps: [
      'Upload one or more JPG, PNG, or WebP images.',
      'Drag and drop the images to arrange them in your desired order.',
      'Click "Create PDF" to instantly bind your images together into a single document.'
    ],
    toolParam: 'batch-upload'
  },
  'rotate-pdf': {
    title: 'Rotate PDF Online — Permanently Rotate PDF Pages Locally | TheNexTools',
    description: 'Rotate individual pages or the entire PDF document. 100% private, no server upload required.',
    h1: 'Fix sideways scans by rotating PDF pages.',
    p: 'Rotate any page by 90, 180, or 270 degrees. Save the orientation permanently without uploading your files.',
    features: [
      'Rotate specific pages or all at once',
      'Visual preview of rotation changes',
      'Lossless rotation preserves quality',
      'Works instantly in your browser'
    ],
    steps: [
      'Upload the PDF containing sideways or upside-down pages.',
      'Click the rotate button on individual pages, or rotate the entire document at once.',
      'Click "Apply Changes" to permanently save the new orientation to your hard drive.'
    ],
    toolParam: 'rotate'
  },
  'rearrange-pdf': {
    title: 'Rearrange PDF Pages Online — Organize PDF Locally | TheNexTools',
    description: 'Reorder pages in your PDF document with drag-and-drop. 100% private, no server upload required.',
    h1: 'Organize your PDF pages exactly how you want.',
    p: 'Drag and drop page thumbnails to reorder them. Delete unnecessary pages or merge files and rearrange the final document entirely on your machine.',
    features: [
      'Intuitive drag-and-drop interface',
      'Delete unwanted pages instantly',
      'Combine and reorder multiple PDFs',
      '100% local processing for sensitive files'
    ],
    steps: [
      'Drop your PDF into the upload zone to view all pages as thumbnails.',
      'Drag and drop the thumbnails to reorder them, or click the trash icon to remove unwanted pages.',
      'Click "Save PDF" to instantly download your newly organized document.'
    ],
    toolParam: 'rearrange'
  },
  'sign-pdf': {
    title: 'Sign PDF Online — Add Electronic Signatures Locally | TheNexTools',
    description: 'Sign your PDF documents with handwritten or typed signatures. 100% private, no server upload required.',
    h1: 'Sign documents securely without printing.',
    p: 'Draw your signature with your mouse or touch screen, or type it out. Place it anywhere on the page and export a flattened PDF without exposing your signature online.',
    features: [
      'Handwritten and typed signature support',
      'Save signatures for future use',
      'Securely sign legal and HR documents',
      'Flattened output ensures signature security'
    ],
    steps: [
      'Upload the PDF document that requires your signature.',
      'Use your mouse or touchscreen to draw your signature, or type it using a cursive font.',
      'Drag the signature to the correct line and click "Export PDF" to flatten and save your signed document.'
    ],
    toolParam: 'sign'
  },
  'add-page-numbers': {
    title: 'Add Page Numbers to PDF Online — Local PDF Tools | TheNexTools',
    description: 'Add sequential page numbers to your PDF document. Customize position and style. 100% private.',
    h1: 'Number your PDF pages automatically.',
    p: 'Add clear, professional page numbering to the bottom or top of your document locally. Ideal for reports, manuscripts, and sensitive legal filings.',
    features: [
      'Automatic sequential numbering',
      'Multiple placement options',
      'Works on documents of any length',
      'Local generation ensures file privacy'
    ],
    steps: [
      'Upload the PDF file you wish to number.',
      'Select the position for your page numbers (e.g., bottom-center, top-right).',
      'Click "Add Numbers" to instantly apply the pagination and download the final file.'
    ],
    toolParam: 'page-numbers'
  },
  'text-to-pdf': {
    title: 'Text to PDF Online — Convert Plain Text Locally | TheNexTools',
    description: 'Convert plain text files or snippets to professional PDF documents. 100% private, no server upload required.',
    h1: 'Turn plain text into a printable PDF.',
    p: 'Paste your notes, logs, or reports and convert them into a clean, standard PDF document instantly. All text processing happens strictly within your browser.',
    features: [
      'Clean, professional typography',
      'Preserves line breaks and formatting',
      'Instant local conversion',
      'No data leaves your device'
    ],
    steps: [
      'Paste your raw text, notes, or code logs into the text editor.',
      'Verify the text layout in the live preview panel.',
      'Click "Convert to PDF" to instantly generate and download a formatted PDF file.'
    ],
    toolParam: 'text'
  }
};
