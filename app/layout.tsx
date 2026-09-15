import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { isLang } from '@/content/translations';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammed-amin-design.shrfaldynmhmd359.workers.dev'),
  verification: {
    google: 'pzMTyxHklb1pBXdxnzsz-usp3o7Sq-HvS_jbTYyih6I',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const value = headersList.get('x-site-locale') || 'en';
  const lang = isLang(value) ? value : 'en';

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}
