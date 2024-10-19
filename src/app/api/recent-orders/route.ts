import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const charges = await stripe.charges.list({ limit: 7 });
    const orders = charges.data.map(charge => ({
      id: charge.id,
      customerName: charge.billing_details.name,
      customerEmail: charge.billing_details.email,
      type: charge.description || "N/A",
      status: charge.status,
      date: new Date(charge.created * 1000).toLocaleDateString(),
      amount: charge.amount / 100,
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return NextResponse.json({ error: "Failed to fetch recent orders" }, { status: 500 });
  }
}
