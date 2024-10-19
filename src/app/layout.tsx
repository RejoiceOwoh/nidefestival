import '../styles/globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';
import ClientLayout from './ClientLayout';

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
            {children}
          </ClientLayout>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
