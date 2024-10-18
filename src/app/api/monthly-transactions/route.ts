import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const now = Math.floor(Date.now() / 1000);
    const monthStart = now - 30 * 24 * 60 * 60; // 30 days ago
    const monthEnd = now; // Now

    // Fetch charges for the current month
    const currentMonthCharges = await stripe.charges.list({
      created: { gte: monthStart, lte: monthEnd },
      limit: 100, // Adjust as needed
    });

    // Calculate total for the current month
    const currentMonthTotal = currentMonthCharges.data.reduce((sum, charge) => sum + charge.amount, 0);

    // Fetch charges for the previous month
    const previousMonthStart = monthStart - 30 * 24 * 60 * 60; // 60 days ago
    const previousMonthEnd = monthStart; // 30 days ago

    const previousMonthCharges = await stripe.charges.list({
      created: { gte: previousMonthStart, lte: previousMonthEnd },
      limit: 100, // Adjust as needed
    });

    // Calculate total for the previous month
    const previousMonthTotal = previousMonthCharges.data.reduce((sum, charge) => sum + charge.amount, 0);

    // Calculate percentage change
    const percentageChange = previousMonthTotal > 0
      ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
      : 0;

    return NextResponse.json({
      currentMonthTotal,
      previousMonthTotal,
      percentageChange,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
