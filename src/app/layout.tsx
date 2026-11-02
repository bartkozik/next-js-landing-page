import '@/core/theme/theme-style.scss';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { JSX } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Epoca – Monitorowanie czasu pracy',
  description:
    'Zyskaj pełną kontrolę nad czasem pracy zespołu dzięki Epoca – nowoczesnemu narzędziu do raportowania i analizy.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'Epoca – Monitorowanie czasu pracy',
    description:
      'Zyskaj pełną kontrolę nad czasem pracy zespołu dzięki Epoca – nowoczesnemu narzędziu do raportowania i analizy.',
    //Change url's before deploy
    url: 'https://example.invalid/',
    siteName: 'Epoca',
    images: [
      {
        url: 'https://example.invalid/og-image-final-rock.png',
        width: 1200,
        height: 630,
        alt: 'Epoca – zarządzaj sprawi czasem pracy zespołu',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epoca – Monitorowanie czasu pracy',
    description: 'Zyskaj pełną kontrolę nad czasem pracy zespołu dzięki Epoca.',
    images: ['https://example.invalid/og-image-final-rock.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="pl">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
