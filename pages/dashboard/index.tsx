import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategoryManager from '@/components/CategoryManager';
import StatsOverview from '@/components/StatsOverview';
import CategoryPieChart from '@/components/CategoryPieChart';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import TimelineChart from '@/components/TimelineChart';
import { useExpenses } from '@/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import { useStats } from '@/hooks/useStats';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { expenses, createExpense, deleteExpense, fetchExpenses, loading: expensesLoading } = useExpenses();
  const { categories, createCategory, deleteCategory, fetchCategories, loading: categoriesLoading } = useCategories();
  const { stats, fetchStats, loading: statsLoading } = useStats();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [mounted, isLoaded, user, router]);

  useEffect(() => {
    if (mounted && user) {
      fetchCategories();
      fetchExpenses();
      fetchStats();
    }
  }, [mounted, user]);

  if (!mounted || !isLoaded) return null;
  if (!user) return null;

  return (
    <>
      <Head>
        <title>Dashboard | Modern Insight</title>
      </Head>

      <div className="min-h-screen bg-[#f8fafc] flex flex-col overflow-hidden text-slate-900">

        {/* Modern Top Navigation Bar */}
        <nav className="h-20 px-10 border-b border-indigo-100 bg-white/70 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">i</div>
              <span className="text-2xl font-extrabold tracking-tighter text-slate-800">Insight<span className="text-[#6366f1]">Pro</span></span>
            </div>

            <div className="flex space-x-8 text-sm font-bold tracking-tight text-slate-400">
              <button className="text-indigo-600 border-b-2 border-indigo-600 pb-7 pt-2 transition-all">Overview</button>
              <button className="hover:text-slate-800 transition-colors pb-7 pt-2">Transactions</button>
              <button className="hover:text-slate-800 transition-colors pb-7 pt-2">Analytics</button>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden xl:flex items-center space-x-4 pr-8 border-r border-slate-100">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Ledger</p>
                <p className="text-xs font-bold text-indigo-600">{expenses.length} Records Documented</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            </div>

            <div className="flex items-center space-x-4 pl-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                {user?.firstName?.[0] || 'U'}
              </div>
              <button
                onClick={() => router.push('/sign-out')}
                className="text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-wider transition-colors"
              >
                Terminate Session
              </button>
            </div>
          </div>
        </nav>

        {/* 3-Column Wide Workspace */}
        <main className="flex-1 p-8 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row gap-8 max-w-[1700px] mx-auto overflow-hidden">

            {/* Column 1: Snapshots & Controls (240px - 320px) */}
            <div className="w-full lg:w-[300px] flex flex-col space-y-8 flex-shrink-0 overflow-y-auto pr-2 custom-scrollbar">
              <section className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Financial Status</h3>
                <StatsOverview stats={stats} isLoading={statsLoading} />
              </section>

              <section className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Initialize Record</h3>
                <ExpenseForm
                  onSuccess={() => { fetchExpenses(); fetchStats(); }}
                  onCreateExpense={createExpense}
                  isLoading={expensesLoading}
                />
              </section>
            </div>

            {/* Column 2: Main Ledger Workspace (Flexible) */}
            <div className="flex-1 min-w-0 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/20">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-slate-800">Operational Ledger</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time expense documentation</p>
                </div>
                <div className="flex space-x-3">
                  <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm text-xs font-bold text-slate-600 uppercase tracking-widest">Filter</div>
                  <div className="px-4 py-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 text-xs font-black text-white uppercase tracking-widest cursor-pointer hover:bg-indigo-700 transition-all">Export</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <ExpenseList
                  expenses={expenses}
                  onDelete={async (id: string) => {
                    await deleteExpense(id);
                    await fetchStats();
                  }}
                  isLoading={expensesLoading}
                />
              </div>
            </div>

            {/* Column 3: Analytics & Segments (320px - 380px) */}
            <div className="w-full lg:w-[380px] flex flex-col space-y-8 flex-shrink-0 overflow-y-auto pr-2 custom-scrollbar">
              <section className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Magnitude Allocation</h3>
                <div className="h-60 flex items-center justify-center">
                  <CategoryPieChart stats={stats} isLoading={statsLoading} />
                </div>
              </section>

              <section className="bg-white/40 backdrop-blur-lg p-8 rounded-[2rem] border border-white/60 flex-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">System Segments</h3>
                <CategoryManager
                  categories={categories}
                  onCreateCategory={async (name: string, color?: string) => {
                    await createCategory(name, color);
                  }}
                  onDeleteCategory={deleteCategory}
                  isLoading={categoriesLoading}
                />
              </section>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
