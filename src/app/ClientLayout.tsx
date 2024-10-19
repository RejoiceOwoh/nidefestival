"use client"

import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { CartProvider } from '@/components/CartProvider';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <CartProvider>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? '' : 'pt-16'}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </CartProvider>
  );
}
