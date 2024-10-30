import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  try {
    const charge = await stripe.charges.retrieve(id);
    
    if (!charge.receipt_url) {
      return NextResponse.json({ error: 'Receipt URL not available' }, { status: 404 });
    }

    const response = await fetch(charge.receipt_url);
    const receiptHtml = await response.text();

    // Extract only the body content
    const bodyContent = receiptHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';

    return NextResponse.json({ receiptHtml: bodyContent });
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return NextResponse.json({ error: 'Failed to fetch receipt' }, { status: 500 });
  }
}
