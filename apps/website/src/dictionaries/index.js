import { locales, defaultLocale } from '@/lib/i18n-config';

export const getDictionary = async (locale) => {
  const activeLocale = locales.includes(locale) ? locale : defaultLocale;
  return import(`./${activeLocale}.json`).then((module) => module.default);
};
