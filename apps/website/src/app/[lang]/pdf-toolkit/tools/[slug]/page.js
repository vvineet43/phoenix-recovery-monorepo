import ToolSeoPage, { generateMetadata as sharedGenerateMetadata } from '@/app/pdf-toolkit/tools/[slug]/page';
import { TOOLS_METADATA } from '@/lib/pdf-tools-metadata';

export const generateMetadata = sharedGenerateMetadata;

export async function generateStaticParams() {
  const slugs = Object.keys(TOOLS_METADATA);
  return slugs.map((slug) => ({
    lang: 'es',
    slug,
  }));
}

export default ToolSeoPage;
