import { NextResponse } from 'next/server';
import Stripe from "stripe";
import { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 10; // Number of orders per page

  try {
    const charges = await stripe.charges.list({ limit });
    const orders = charges.data.map(charge => ({
      id: charge.id,
      customerName: charge.billing_details.name,
      customerEmail: charge.billing_details.email,
      type: charge.description || "N/A",
      status: charge.status,
      date: new Date(charge.created * 1000).toLocaleDateString(),
      amount: charge.amount / 100,
    }));

    // Determine if there are more pages
    const hasMore = charges.has_more;
    const totalPages = hasMore ? page + 1 : page;

    return NextResponse.json({ orders, totalPages });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
