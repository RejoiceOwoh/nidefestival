"use client"

import { ReactNode, useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures client-side rendering starts after mount
  }, []);

  if (!isMounted) {
    return null; // Prevents rendering on the server until mounted
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
