import { useState, useCallback } from 'react';

export interface DashboardStats {
  overview: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    expenseCount: number;
  };
  topCategories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
  byCategory: Record<string, number>;
  categories: number;
  recentExpenses: any[];
}

export const useStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
};
