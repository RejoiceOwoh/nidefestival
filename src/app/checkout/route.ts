// src/app/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cart, currency } = req.body; // Expecting cart and currency in request body

      // Create line items for Stripe from the cart
      const lineItems = cart.map((product: any) => ({
        price_data: {
          currency: currency || 'usd', // Default currency set to USD, override if needed
          product_data: {
            name: product.name,
            images: [product.imageUrl], // Optionally add product images to checkout
          },
          unit_amount: Math.round(product.price * 100), // Stripe expects prices in cents
        },
        quantity: product.quantity,
      }));

      // Add a shipping fee as a separate line item if applicable
      const shippingFee = {
        price_data: {
          currency: currency || 'usd',
          product_data: {
            name: 'Shipping Fee',
          },
          unit_amount: calculateShippingFee(cart), // A function to dynamically calculate shipping
        },
        quantity: 1,
      };

      // Add shipping fee to the line items
      lineItems.push(shippingFee);

      // Create the Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `${req.headers.origin}/success`, // Redirect on success
        cancel_url: `${req.headers.origin}/cancel`, // Redirect on cancel
      });

      // Return session ID to the client
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Stripe Checkout error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// Helper function to calculate the shipping fee dynamically
function calculateShippingFee(cart: any[]) {
  let totalShipping = 0;
  cart.forEach((product) => {
    // Implement your custom logic here for shipping, e.g. based on quantity
    if (product.quantity >= 6) {
      // Example: Increase shipping for orders that meet certain conditions
      totalShipping += 1500; // Example: $15.00 shipping fee in cents
    } else {
      totalShipping += 500; // Example: $5.00 shipping fee in cents for smaller orders
    }
  });
  return totalShipping;
}
