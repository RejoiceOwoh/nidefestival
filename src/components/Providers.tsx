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
    <ClerkProvider
      signInFallbackRedirectUrl="/admin"
    >
      {requiresAuth ? (
        <>
          <SignedOut>
            <RedirectToSignIn redirectUrl={pathname} />
          </SignedOut>
          <SignedIn>
            {children}
          </SignedIn>
        </>
      ) : (
        children
      )}
    </ClerkProvider>
  );
}
