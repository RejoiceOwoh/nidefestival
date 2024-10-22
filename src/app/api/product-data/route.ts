import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const topProducts = await prisma.product.findMany({
      take: 5,
      orderBy: {
        stock: 'desc',
      },
      select: {
        name: true,
        stock: true,
      },
    });

    const productData = topProducts.map(product => ({
      name: product.name,
      value: product.stock,
    }));

    return NextResponse.json(productData);
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'Failed to fetch product data' }, { status: 500 });
  }
}
