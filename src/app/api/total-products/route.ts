import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const [totalProducts, productsOneMonthAgo] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({
        where: {
          createdAt: {
            lt: oneMonthAgo
          }
        }
      })
    ]);

    const newProducts = totalProducts - productsOneMonthAgo;
    const percentageChange = productsOneMonthAgo > 0
      ? ((newProducts / productsOneMonthAgo) * 100).toFixed(2)
      : newProducts > 0 ? 100 : 0;

    return NextResponse.json({ 
      totalProducts, 
      newProducts,
      percentageChange: Number(percentageChange)
    });
  } catch (error) {
    console.error('Error fetching total products:', error);
    return NextResponse.json({ error: 'Failed to fetch total products' }, { status: 500 });
  }
}
