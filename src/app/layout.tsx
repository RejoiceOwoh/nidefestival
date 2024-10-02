import '../styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '@/components/footer';
import Providers from '@/components/Providers'; // Client-side component

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
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
