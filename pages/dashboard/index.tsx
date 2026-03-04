import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Expense Tracker</title>
        <meta name="description" content="Your expense dashboard" />
      </Head>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="text-sm">
            <p>Welcome, <strong>{user?.firstName || user?.emailAddresses[0]?.emailAddress}</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">$0.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">This Month</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">$0.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">$0.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
          <p className="text-gray-500">No expenses yet. Start by adding your first expense!</p>
        </div>

        <div className="mt-6">
          <a
            href="/api/auth/logout"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </a>
        </div>
      </main>
    </>
  );
}
