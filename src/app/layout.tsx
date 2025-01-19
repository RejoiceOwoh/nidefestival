import '../styles/globals.css';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';
import ClientLayout from './ClientLayout';
import { GoogleAnalytics} from '@next/third-parties/google'

export const metadata = {
  title: {
    default: 'NIDEFEST',
    template: '%s | NIDEFEST'
  },
  description: 'African Largest Cultural Festival',
  keywords: ['Niger Delta Festival', 'Arts and Culture', 'Nigerian Festival', 'Cultural Events', 'Festival of Arts', 'Niger Delta Region', 'Nigerian Culture', 'Arts Festival'],
  authors: [{ name: 'NIDEFEST' }],
  creator: 'NIDEFEST',
  publisher: 'NIDEFEST',
  image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1734444342/New_Project__20_-removebg-preview_1_md87x7.png',
  url: 'https://www.nidefest.africa',
  type: 'website',
  site_name: 'NIDEFEST',
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
            {/* <GoogleAnalytics gaId="G-3ioi" /> */}
          </ClientLayout>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
