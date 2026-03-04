import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@/lib/clerk-mock';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid category ID' });
  }

  // Verify category belongs to user
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category || category.userId !== userId) {
    return res.status(403).json({ error: 'Category not found or unauthorized' });
  }

  if (req.method === 'DELETE') {
    try {
      // Check if category has expenses
      const expenseCount = await prisma.expense.count({
        where: { categoryId: id },
      });

      if (expenseCount > 0) {
        return res
          .status(400)
          .json({ error: `Cannot delete category with ${expenseCount} expenses` });
      }

      await prisma.category.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error(`DELETE /api/categories/${id}:`, error);
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
