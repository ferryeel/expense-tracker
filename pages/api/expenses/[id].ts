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

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid expense ID' });
  }

  // Verify expense belongs to user
  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense || expense.userId !== userId) {
    return res.status(403).json({ error: 'Expense not found or unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const expenseWithCategory = await prisma.expense.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return res.status(200).json(expenseWithCategory);
    } catch (error) {
      console.error(`GET /api/expenses/${id}:`, error);
      return res.status(500).json({ error: 'Failed to fetch expense' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { amount, description, date, categoryId } = req.body;

      const updateData: any = {};

      if (amount !== undefined) {
        if (typeof amount !== 'number' || amount <= 0) {
          return res.status(400).json({ error: 'Amount must be a positive number' });
        }
        updateData.amount = amount;
      }

      if (description !== undefined) {
        updateData.description = description;
      }

      if (date !== undefined) {
        updateData.date = new Date(date);
      }

      if (categoryId !== undefined) {
        // Verify new category belongs to user
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category || category.userId !== userId) {
          return res
            .status(403)
            .json({ error: 'Category not found or unauthorized' });
        }
        updateData.categoryId = categoryId;
      }

      const updatedExpense = await prisma.expense.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
        },
      });

      return res.status(200).json(updatedExpense);
    } catch (error) {
      console.error(`PUT /api/expenses/${id}:`, error);
      return res.status(500).json({ error: 'Failed to update expense' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.expense.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error(`DELETE /api/expenses/${id}:`, error);
      return res.status(500).json({ error: 'Failed to delete expense' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
