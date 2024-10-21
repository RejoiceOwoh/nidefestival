import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const charge = await stripe.charges.retrieve(id);
    await stripe.charges.update(id, {
      receipt_email: charge.billing_details.email || undefined, // Use the actual email from the charge or undefined if null
    });

    return NextResponse.json({ message: "Receipt resent successfully" });
  } catch (error) {
    console.error("Error resending receipt:", error);
    return NextResponse.json({ error: "Failed to resend receipt" }, { status: 500 });
  }
}
