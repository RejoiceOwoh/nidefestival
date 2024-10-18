import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const now = Math.floor(Date.now() / 1000);
    const weekStart = now - 7 * 24 * 60 * 60; // 7 days ago
    const weekEnd = now; // Now

    // Fetch charges for the current week
    const currentWeekCharges = await stripe.charges.list({
      created: { gte: weekStart, lte: weekEnd },
      limit: 100, // Adjust as needed
    });

    // Calculate total for the current week
    const currentWeekTotal = currentWeekCharges.data.reduce((sum, charge) => sum + charge.amount, 0);

    // Fetch charges for the previous week
    const previousWeekStart = weekStart - 7 * 24 * 60 * 60; // 14 days ago
    const previousWeekEnd = weekStart; // 7 days ago

    const previousWeekCharges = await stripe.charges.list({
      created: { gte: previousWeekStart, lte: previousWeekEnd },
      limit: 100, // Adjust as needed
    });

    // Calculate total for the previous week
    const previousWeekTotal = previousWeekCharges.data.reduce((sum, charge) => sum + charge.amount, 0);

    // Calculate percentage change
    const percentageChange = previousWeekTotal > 0
      ? ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100
      : 0;

    return NextResponse.json({
      currentWeekTotal,
      previousWeekTotal,
      percentageChange,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
