import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Current month
    const startOfCurrentMonth = Math.floor(new Date(currentYear, currentMonth, 1).getTime() / 1000);
    const endOfCurrentMonth = Math.floor(new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).getTime() / 1000);

    // Previous month
    const startOfPreviousMonth = Math.floor(new Date(currentYear, currentMonth - 1, 1).getTime() / 1000);
    const endOfPreviousMonth = Math.floor(new Date(currentYear, currentMonth, 0, 23, 59, 59).getTime() / 1000);

    const [currentMonthCustomers, previousMonthCustomers] = await Promise.all([
      stripe.customers.list({
        created: { gte: startOfCurrentMonth, lte: endOfCurrentMonth },
        limit: 100,
      }),
      stripe.customers.list({
        created: { gte: startOfPreviousMonth, lte: endOfPreviousMonth },
        limit: 100,
      })
    ]);

    const totalCustomersThisMonth = currentMonthCustomers.data.length;
    const totalCustomersPreviousMonth = previousMonthCustomers.data.length;

    const percentageChange = totalCustomersPreviousMonth > 0
      ? ((totalCustomersThisMonth - totalCustomersPreviousMonth) / totalCustomersPreviousMonth) * 100
      : 100; // If previous month was 0, consider it 100% increase

    return NextResponse.json({ 
      totalCustomersThisMonth, 
      percentageChange: Number(percentageChange.toFixed(2))
    });
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
}
