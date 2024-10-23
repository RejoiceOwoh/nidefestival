import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Update the LineItem interface
interface LineItem {
  id: string;
  amount: number;
  currency: string;
  description: string;
  quantity?: number;
  product?: {
    id: string;
    name: string;
    images: string[];
  };
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // console.log('Fetching order with ID:', id);
    
    // Retrieve the charge
    const charge = await stripe.charges.retrieve(id, {
      expand: ['customer', 'invoice.lines']
    });

    let lineItems: { id: any; amount: any; currency: any; description: any; quantity: any; }[] = [];
    if (charge.invoice && typeof charge.invoice !== 'string') {
      lineItems = charge.invoice.lines.data.map((item: any) => ({
        id: item.id,
        amount: item.amount,
        currency: item.currency,
        description: item.description,
        quantity: item.quantity,
        // We'll need to fetch product details separately if needed
      }));
    }

    // console.log('Charge and line items retrieved successfully');

    return NextResponse.json({ charge, lineItems });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
  }
}
