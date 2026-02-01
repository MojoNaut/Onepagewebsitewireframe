import { getRequestConfig } from 'next-intl/server';

export const locales = ['it', 'en'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => ({
  locale: locale ?? defaultLocale,
  messages: (await import(`./messages/${locale ?? defaultLocale}.json`)).default,
}));