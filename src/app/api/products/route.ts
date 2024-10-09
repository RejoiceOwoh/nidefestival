import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fetch all products (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Add a new product (POST)
export async function POST(req: Request) {
  try {
    const {
      name,
      description,
      price,
      stock,
      baseShippingCost,
      discountPricePerUnit,
      bulkThreshold,
      bulkShippingCost,
      palletShippingCost,
      maxCap,
      soldOut,
    } = await req.json();

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),               // Convert to Float
        stock: parseInt(stock, 10),             // Convert to Int
        baseShippingCost: baseShippingCost ? parseFloat(baseShippingCost) : null,
        discountPricePerUnit: discountPricePerUnit ? parseFloat(discountPricePerUnit) : null,
        bulkThreshold: bulkThreshold ? parseInt(bulkThreshold, 10) : null,
        bulkShippingCost: bulkShippingCost ? parseFloat(bulkShippingCost) : null,
        palletShippingCost: palletShippingCost ? parseFloat(palletShippingCost) : null,
        maxCap: maxCap ? parseInt(maxCap, 10) : null,
        soldOut,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
