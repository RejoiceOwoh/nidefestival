import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Keep-Alive API route that pings the database with a lightweight query
export async function GET() {
  try {
    // Simple query that counts the number of products in the database
    await prisma.product.count(); // Lightweight query to keep the database active

    return NextResponse.json({ message: 'Database ping successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Database ping failed' }, { status: 500 });
  }
}
