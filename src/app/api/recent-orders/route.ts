import { NextResponse } from 'next/server';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeFilter = searchParams.get('timeFilter') || 'week';
  const statusFilter = searchParams.get('statusFilter')?.split(',') || ['All'];

  try {
    let startDate = new Date();
    switch (timeFilter) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const charges = await stripe.charges.list({
      limit: 100,
      created: { gte: Math.floor(startDate.getTime() / 1000) }
    });

    let filteredCharges = charges.data;
    if (!statusFilter.includes('All')) {
      filteredCharges = filteredCharges.filter(charge => 
        statusFilter.includes(charge.status === 'succeeded' ? 'Succeeded' : 'Failed')
      );
    }

    const orders = filteredCharges.map(charge => ({
      id: charge.id,
      customerName: charge.billing_details.name || "Anonymous",
      customerEmail: charge.billing_details.email || "N/A",
      paymentMethod: charge.payment_method_details?.type || "Unknown",
      status: charge.status === 'succeeded' ? 'Succeeded' : 'Failed',
      date: new Date(charge.created * 1000).toLocaleDateString(),
      amount: charge.amount / 100,
    }));

    return NextResponse.json({ orders: orders.slice(0, 7) });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return NextResponse.json({ error: "Failed to fetch recent orders" }, { status: 500 });
  }
}
