import { PdfEditorWrapper } from '../../components/pdf-tools/PdfEditorWrapper';

export const metadata = {
  title: 'PDF Toolkit | Phoenix',
  description: 'Merge, split, watermark, and securely process your PDF documents natively in your browser.',
};

export default function PdfToolsPage() {
  return (
    <main>
      <PdfEditorWrapper />
    </main>
  );
}
