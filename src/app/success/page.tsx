'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/useCart';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart();

    // You might want to fetch the session details from Stripe here
    // to confirm the purchase and update your database

    // Redirect to home page after a few seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [clearCart, router]);

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>You will be redirected to the home page shortly.</p>
    </div>
  );
}

