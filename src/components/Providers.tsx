'use client';

import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Define routes where authentication is required
  const adminRoutes = ['/admin', '/dashboard'];

  // Conditionally render auth buttons only for admin-related pages
  const showAuthButtons = adminRoutes.some((route) => pathname.startsWith(route));

  return (
    <ClerkProvider>
      {showAuthButtons && (
        <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </>
      )}
      {children}
    </ClerkProvider>
  );
}
