import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fetch all products (GET)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get('id');

  if (productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId, 10) },
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
      palletThreshold, // Added palletThreshold here
      palletShippingCost,
      maxCap,
      soldOut,
      imageUrl, // Add imageUrl here
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
