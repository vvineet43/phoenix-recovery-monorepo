import { locales, defaultLocale } from '@/lib/i18n-config';

export async function generateStaticParams() {
  return locales
    .filter(locale => locale !== defaultLocale)
    .map(lang => ({ lang }));
}

export default function LangLayout({ children }) {
  return <>{children}</>;
}
