import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Fetch all products (GET)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const statusFilter = url.searchParams.get('statusFilter')?.split(',') || ['All'];
  const stockFilter = url.searchParams.get('stockFilter') || 'all';
  const limit = 10; // Number of products per page

  try {
    let whereClause: any = {};

    if (!statusFilter.includes('All')) {
      whereClause.soldOut = statusFilter.includes('Sold Out');
    }

    switch (stockFilter) {
      case 'low':
        whereClause.stock = { lte: 25, gt: 0 }; // Low stock is now defined as 25 or fewer items
        break;
      case 'out':
        whereClause.stock = 0;
        break;
      // 'all' case doesn't need any additional filter
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalProducts = await prisma.product.count({ where: whereClause });
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPages });
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
      palletThreshold,
      palletShippingCost,
      maxCap,
      soldOut,
      imageUrl,
      quantityPerBox,
    } = await req.json();

    const product = await prisma.product.create({
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
        quantityPerBox: quantityPerBox ? parseInt(quantityPerBox, 10) : null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// Update an existing product (PUT)
export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      description,
      price,
      stock,
      baseShippingCost,
      discountPricePerUnit,
      bulkThreshold,
      bulkShippingCost,
      palletThreshold, // Added palletThreshold here
      palletShippingCost,
      maxCap,
      soldOut,
      imageUrl, // Add imageUrl here
      quantityPerBox,
    } = await req.json();

    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        baseShippingCost: baseShippingCost ? parseFloat(baseShippingCost) : null,
        discountPricePerUnit: discountPricePerUnit ? parseFloat(discountPricePerUnit) : null,
        bulkThreshold: bulkThreshold ? parseInt(bulkThreshold, 10) : null,
        bulkShippingCost: bulkShippingCost ? parseFloat(bulkShippingCost) : null,
        palletThreshold: palletThreshold ? parseInt(palletThreshold, 10) : null, // Include palletThreshold
        palletShippingCost: palletShippingCost ? parseFloat(palletShippingCost) : null,
        maxCap: maxCap ? parseInt(maxCap, 10) : null,
        soldOut,
        imageUrl, // Ensure this is included here as well
        quantityPerBox: quantityPerBox ? parseInt(quantityPerBox, 10) : null, // <-- Update quantityPerBox
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
