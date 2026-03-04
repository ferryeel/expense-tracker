import { useState, useCallback, useEffect } from 'react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FetchExpensesParams {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async (params?: FetchExpensesParams) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (params?.categoryId) query.append('categoryId', params.categoryId);
      if (params?.startDate) query.append('startDate', params.startDate);
      if (params?.endDate) query.append('endDate', params.endDate);

      const response = await fetch(`/api/expenses?${query.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createExpense = useCallback(
    async (data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt' | 'category'>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create expense');
        const newExpense = await response.json();
        setExpenses([newExpense, ...expenses]);
        return newExpense;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [expenses]
  );

  const updateExpense = useCallback(
    async (id: string, data: Partial<Expense>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update expense');
        const updated = await response.json();
        setExpenses(expenses.map((e) => (e.id === id ? updated : e)));
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [expenses]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete expense');
        setExpenses(expenses.filter((e) => e.id !== id));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [expenses]
  );

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};
