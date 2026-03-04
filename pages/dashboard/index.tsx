import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategoryManager from '@/components/CategoryManager';
import StatsOverview from '@/components/StatsOverview';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import { useStats } from '@/hooks/useStats';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { expenses, createExpense, deleteExpense, fetchExpenses, loading: expensesLoading } = useExpenses();
  const { categories, createCategory, deleteCategory, fetchCategories, loading: categoriesLoading } = useCategories();
  const { stats, fetchStats, loading: statsLoading } = useStats();
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'categories'>('overview');

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (user) {
      fetchCategories();
      fetchExpenses();
      fetchStats();
    }
  }, [user]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Expense Tracker</title>
        <meta name="description" content="Your expense dashboard" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-blue-100 mt-2">
                  Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
                </p>
              </div>
              <button
                onClick={() => router.push('/api/auth/logout')}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <StatsOverview stats={stats} isLoading={statsLoading} />

          {/* Tabs */}
          <div className="mt-8 flex gap-4 mb-6 border-b border-gray-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === 'expenses'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === 'categories'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Categories
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <ExpenseForm
                onSuccess={() => {
                  fetchExpenses();
                  fetchStats();
                }}
                onCreateExpense={createExpense}
                isLoading={expensesLoading}
              />
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">All Expenses</h2>
                {expenses.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      {expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded
                    </p>
                    <div className="overflow-x-auto">
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {expenses.slice(0, 10).map((expense) => (
                          <div
                            key={expense.id}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{expense.description || 'No description'}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(expense.date).toLocaleDateString()} • {expense.category.name}
                              </p>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ${expense.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No expenses yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <ExpenseForm
                onSuccess={() => {
                  fetchExpenses();
                  fetchStats();
                }}
                onCreateExpense={createExpense}
                isLoading={expensesLoading}
              />
              <ExpenseList
                expenses={expenses}
                onDelete={async (id) => {
                  await deleteExpense(id);
                  await fetchStats();
                }}
                isLoading={expensesLoading}
              />
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <CategoryManager
              categories={categories}
              onCreateCategory={async (name, color) => {
                await createCategory(name, color);
              }}
              onDeleteCategory={deleteCategory}
              isLoading={categoriesLoading}
            />
          )}
        </div>
      </main>
    </>
  );
}
