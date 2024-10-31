import '../styles/globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';
import ClientLayout from './ClientLayout';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: {
    default: 'Acefoods UK',
    template: '%s | Acefoods UK'
  },
  description: 'Premium, authentic palm oil sourced from Nigeria',
  keywords: ['palm oil', 'Nigerian palm oil', 'AfriGold', 'authentic palm oil'],
  authors: [{ name: 'AfriGold' }],
  creator: 'AfriGold',
  publisher: 'AfriGold',
  image: 'https://res.cloudinary.com/dkjnkg7hd/image/upload/v1730354254/Afrigoldlogo_w3gu6t.png',
  url: 'https://www.acefoods.co.uk',
  type: 'website',
  site_name: 'Acefoods UK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <ClientLayout>
            <GoogleTagManager gtmId='GT-WBZNZRBF' />
            {children}
            <GoogleAnalytics gaId="G-3H7TNL4S0Z" />
          </ClientLayout>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
