import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import {
  calculateTotal,
  calculateCurrentMonth,
  calculateCurrentWeek,
  getTopCategories,
  groupByCategory,
} from '@/lib/utils';

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
      // Fetch all expenses for the user
      const expenses = await prisma.expense.findMany({
        where: { userId },
        include: { category: true },
      });

      // Fetch all categories for the user
      const categories = await prisma.category.findMany({
        where: { userId },
      });

      // Calculate statistics
      const amounts = expenses.map((e) => e.amount);
      const totalExpenses = calculateTotal(amounts);
      const thisMonth = calculateCurrentMonth(expenses);
      const thisWeek = calculateCurrentWeek(expenses);
      const topCategories = getTopCategories(expenses, 5);
      const byCategory = groupByCategory(expenses);

      const stats = {
        overview: {
          total: totalExpenses,
          thisMonth,
          thisWeek,
          expenseCount: expenses.length,
        },
        topCategories,
        byCategory,
        categories: categories.length,
        recentExpenses: expenses.slice(0, 10),
      };

      return res.status(200).json(stats);
    } catch (error) {
      console.error('GET /api/stats:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
