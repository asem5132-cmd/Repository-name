import './globals.css';

export const metadata = {
  verification: {
    google: 'pzMTyxHklb1pBXdxnzsz-usp3o7Sq-HvS_jbTYyih6I',
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
