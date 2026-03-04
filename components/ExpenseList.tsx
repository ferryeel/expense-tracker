import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

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

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ExpenseList({ expenses, onDelete, isLoading = false }: ExpenseListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    setDeletingId(id);
    setError(null);
    try {
      await onDelete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete expense');
    } finally {
      setDeletingId(null);
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        <p>No expenses yet. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className="px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{ backgroundColor: expense.category.color }}
                  >
                    {expense.category.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {expense.description || '-'}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    disabled={deletingId === expense.id || isLoading}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-400 font-medium"
                  >
                    {deletingId === expense.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
