import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Update stock for each product
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.product.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return NextResponse.json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Failed to update stock:', error);
    return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
  }
}
