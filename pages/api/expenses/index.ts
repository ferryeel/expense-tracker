import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@/lib/clerk-mock';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  // Ensure user is authenticated
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Ensure user exists in database
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: `${userId}@example.com`,
      name: 'Demo User',
    },
  });

  if (req.method === 'GET') {
    try {
      const { categoryId, startDate, endDate } = req.query;

      let where: any = { userId };

      if (categoryId && categoryId !== 'all') {
        where.categoryId = categoryId as string;
      }

      if (startDate || endDate) {
        where.date = {};
        if (startDate) {
          where.date.gte = new Date(startDate as string);
        }
        if (endDate) {
          const end = new Date(endDate as string);
          end.setHours(23, 59, 59, 999);
          where.date.lte = end;
        }
      }

      const expenses = await prisma.expense.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          date: 'desc',
        },
      });

      return res.status(200).json(expenses);
    } catch (error) {
      console.error('GET /api/expenses:', error);
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { amount, description, date, categoryId } = req.body;

      // Validate input
      if (!amount || !categoryId) {
        return res
          .status(400)
          .json({ error: 'Missing required fields: amount, categoryId' });
      }

      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }

      // Verify category belongs to user
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category || category.userId !== userId) {
        return res.status(403).json({ error: 'Category not found or unauthorized' });
      }

      const expense = await prisma.expense.create({
        data: {
          amount,
          description: description || '',
          date: date ? new Date(date) : new Date(),
          categoryId,
          userId,
        },
        include: {
          category: true,
        },
      });

      return res.status(201).json(expense);
    } catch (error) {
      console.error('POST /api/expenses:', error);
      return res.status(500).json({ error: 'Failed to create expense' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
