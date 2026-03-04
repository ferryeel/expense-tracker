// Utility functions for expense calculations

export interface ExpenseStats {
  total: number;
  thisMonth: number;
  thisWeek: number;
  byCategory: Record<string, number>;
}

/**
 * Calculate total expenses for all time
 */
export const calculateTotal = (amounts: number[]): number => {
  return amounts.reduce((sum, amount) => sum + amount, 0);
};

/**
 * Calculate expenses for current month
 */
export const calculateCurrentMonth = (expenses: any[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses
    .filter((expense) => {
      const expDate = new Date(expense.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Calculate expenses for current week
 */
export const calculateCurrentWeek = (expenses: any[]): number => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0);

  return expenses
    .filter((expense) => {
      const expDate = new Date(expense.date);
      expDate.setHours(0, 0, 0, 0);
      return expDate >= weekStart;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Group expenses by category
 */
export const groupByCategory = (
  expenses: any[]
): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    const categoryName = expense.category?.name || 'Uncategorized';
    acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
    return acc;
  }, {});
};

/**
 * Get top spending categories
 */
export const getTopCategories = (expenses: any[], limit = 5): Array<{
  name: string;
  amount: number;
  percentage: number;
}> => {
  const byCategory = groupByCategory(expenses);
  const total = calculateTotal(Object.values(byCategory));

  return Object.entries(byCategory)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Calculate average expense
 */
export const calculateAverage = (amounts: number[]): number => {
  if (amounts.length === 0) return 0;
  return amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
};

/**
 * Get expenses for date range
 */
export const getExpensesInRange = (
  expenses: any[],
  startDate: Date,
  endDate: Date
): any[] => {
  return expenses.filter((expense) => {
    const expDate = new Date(expense.date);
    return expDate >= startDate && expDate <= endDate;
  });
};
