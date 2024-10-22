import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
}
