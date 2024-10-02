import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(() => {});

export const config = {
  matcher: [
    // Protect admin and dashboard routes
    '/admin/:path*', 
    '/dashboard/:path*'
  ],
};
