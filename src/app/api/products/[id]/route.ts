import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fetch product by dynamic id (GET)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// Update product by dynamic id (PUT)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

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
      palletThreshold,
      palletShippingCost,
      maxCap,
      soldOut,
      imageUrl,
    } = await req.json();

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        baseShippingCost: baseShippingCost ? parseFloat(baseShippingCost) : null,
        discountPricePerUnit: discountPricePerUnit ? parseFloat(discountPricePerUnit) : null,
        bulkThreshold: bulkThreshold ? parseInt(bulkThreshold, 10) : null,
        bulkShippingCost: bulkShippingCost ? parseFloat(bulkShippingCost) : null,
        palletThreshold: palletThreshold ? parseInt(palletThreshold, 10) : null,
        palletShippingCost: palletShippingCost ? parseFloat(palletShippingCost) : null,
        maxCap: maxCap ? parseInt(maxCap, 10) : null,
        soldOut,
        imageUrl,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
