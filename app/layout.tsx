import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="pzMTyxHklb1pBXdxnzsz-usp3o7Sq-HvS_jbTYyih6I"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
