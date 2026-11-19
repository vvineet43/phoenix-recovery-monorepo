import { locales, defaultLocale } from '@/lib/i18n-config';
import ToolSeoPage, { generateMetadata as sharedGenerateMetadata } from '@/app/pdf-toolkit/tools/[slug]/page';
import { TOOLS_METADATA } from '@/lib/pdf-tools-metadata';

export const dynamicParams = false;

export const generateMetadata = sharedGenerateMetadata;

export async function generateStaticParams() {
  const slugs = Object.keys(TOOLS_METADATA);
  const secondaryLocales = locales.filter((l) => l !== defaultLocale);
  const params = [];
  for (const lang of secondaryLocales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export default ToolSeoPage;
