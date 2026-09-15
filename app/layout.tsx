import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mohammed-amin-design.shrfaldynmhmd359.workers.dev'),
  verification: {
    google: 'pzMTyxHkIb1pBXdxnzsz-usp3o7Sq-HvS_jbTYyih6I',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
