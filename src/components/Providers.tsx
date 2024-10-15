'use client';

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Define routes where authentication is required
  const adminRoutes = ['/admin', '/dashboard'];

  // Conditionally check if the current path requires authentication
  const requiresAuth = adminRoutes.some((route) => pathname.startsWith(route));

  return (
    <ClerkProvider>
      {requiresAuth ? (
        <>
          <SignedOut>
            {/* Automatically redirect to sign-in page if the user is signed out */}
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            {/* Render children if the user is signed in */}
            {children}
          </SignedIn>
        </>
      ) : (
        // If no auth required, render children directly
        children
      )}
    </ClerkProvider>
  );
}
