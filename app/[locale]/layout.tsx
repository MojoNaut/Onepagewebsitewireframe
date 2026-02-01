import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n';
import { CustomCursor } from '@/components/CustomCursor';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fix: cambio any in typeof locales[number]
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    // Fix: rimosso 'error' non usato
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CustomCursor />
      {children}
    </NextIntlClientProvider>
  );
}
