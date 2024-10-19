import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const charge = await stripe.charges.retrieve(id);
    const order = {
      id: charge.id,
      customerName: charge.billing_details.name,
      customerEmail: charge.billing_details.email,
      customerPhone: charge.billing_details.phone,
      type: charge.description || "N/A",
      status: charge.status,
      date: new Date(charge.created * 1000).toLocaleDateString(),
      amount: charge.amount / 100,
    };

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}
