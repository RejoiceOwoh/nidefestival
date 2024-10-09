'use client'; // This makes the component a client-side component

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { isLoaded, isSignedIn } = useUser(); // useUser hook to check auth status
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // If user is not signed in, redirect to sign-in page
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Render nothing until the user status is loaded
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // Render the admin dashboard if the user is signed in
  return (
    <div>
      <h1>Welcome</h1>
      <p>You are logged in as an admin.</p>
    </div>
  );
}
