import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: {
          name: 'asc',
        },
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error('GET /api/categories:', error);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, color } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      // Check if category with same name already exists for user
      const existing = await prisma.category.findFirst({
        where: { userId, name },
      });

      if (existing) {
        return res.status(400).json({ error: 'Category already exists' });
      }

      const category = await prisma.category.create({
        data: {
          name,
          color: color || '#6366f1',
          userId,
        },
      });

      return res.status(201).json(category);
    } catch (error) {
      console.error('POST /api/categories:', error);
      return res.status(500).json({ error: 'Failed to create category' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
