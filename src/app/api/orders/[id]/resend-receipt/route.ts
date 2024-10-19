import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: { params: { id: any; }; }) {
  const { id } = req.params;

  try {
    await stripe.charges.update(id, {
      receipt_email: "customer@example.com", // Replace with actual email if needed
    });

    return NextResponse.json({ message: "Receipt resent successfully" });
  } catch (error) {
    console.error("Error resending receipt:", error);
    return NextResponse.json({ error: "Failed to resend receipt" }, { status: 500 });
  }
}
