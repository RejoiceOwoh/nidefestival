// src/app/api/sales-data/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    const charges = await stripe.charges.list({
      created: {
        gte: Math.floor(startDate.getTime() / 1000),
        lte: Math.floor(endDate.getTime() / 1000),
      },
      limit: 100,
    });

    const salesData = charges.data.map(charge => ({
      date: new Date(charge.created * 1000).toISOString().split('T')[0],
      sales: charge.amount / 100,
      profit: (charge.amount * 0.2) / 100, // Assuming 20% profit margin
    }));

    // Aggregate data by date
    const aggregatedData = salesData.reduce((acc: any[], curr) => {
      const existingEntry = acc.find(item => item.date === curr.date);
      if (existingEntry) {
        existingEntry.sales += curr.sales;
        existingEntry.profit += curr.profit;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    // Sort by date
    aggregatedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(aggregatedData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
  }
}
