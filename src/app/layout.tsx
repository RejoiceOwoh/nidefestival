import '../styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import Providers from '@/components/Providers'; // Client-side component
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/components/CartProvider';
import Cart from '@/app/products/components/Cart';

export const metadata = {
  title: 'AfriGold Palm Oil',
  description: 'Premium, authentic palm oil sourced from Nigeria',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers> {/* Wrapping in the client-side Providers */}
          <CartProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Toaster position="top-right" richColors />
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
