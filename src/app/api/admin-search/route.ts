import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Search products
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
    });

    // Search orders (using Stripe)
    const orders = await stripe.charges.search({
      query: `description:*${query}* OR customer:*${query}*`,
      limit: 5,
    });

    // Combine results
    const results = [
      ...products.map(product => ({
        id: product.id,
        title: product.name,
        type: 'product' as const,
        url: `/admin/products/${product.id}`,
      })),
      ...orders.data.map(order => ({
        id: order.id,
        title: order.description || `Order ${order.id}`,
        type: 'order' as const,
        url: `/admin/orders/${order.id}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
