import { NextResponse } from 'next/server';
import Stripe from "stripe";
import { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const timeFilter = searchParams.get('timeFilter') || 'week';
  const statusFilter = searchParams.get('statusFilter')?.split(',') || ['All'];
  const limit = 10; // Number of orders per page

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
      limit: limit * page,
      created: { gte: Math.floor(startDate.getTime() / 1000) }
    });

    let filteredCharges = charges.data;
    if (!statusFilter.includes('All')) {
      filteredCharges = filteredCharges.filter(charge => 
        statusFilter.includes(charge.status === 'succeeded' ? 'Succeeded' : 'Failed')
      );
    }

    const orders = filteredCharges.slice((page - 1) * limit, page * limit).map(charge => ({
      id: charge.id,
      customerName: charge.billing_details.name || "Anonymous",
      customerEmail: charge.billing_details.email || "N/A",
      paymentMethod: charge.payment_method_details?.type || "Unknown",
      status: charge.status === 'succeeded' ? 'Succeeded' : 'Failed',
      date: new Date(charge.created * 1000).toLocaleDateString(),
      amount: charge.amount / 100,
    }));

    // Calculate total pages
    const totalPages = Math.ceil(filteredCharges.length / limit);

    return NextResponse.json({ orders, totalPages });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
