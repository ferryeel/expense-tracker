import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomeContent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="min-h-screen flex flex-col justify-between">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Expense Tracker</h1>
          <p className="text-lg text-gray-700">
            Track your income and expenses, visualize spending patterns, and take control of your finances.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-center">
          {user ? (
            // Authenticated user
            <div className="w-full">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Welcome back, {user.firstName || 'User'}!
                </h2>
                <p className="text-blue-700 mb-6">
                  You're all set. Jump into your dashboard to track your expenses.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Go to Dashboard →
                </Link>
              </div>
            </div>
          ) : (
            // Unauthenticated user
            <div className="w-full">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Benefits */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-2xl mr-4">📊</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Real-time Analytics</h3>
                        <p className="text-gray-600">See your spending patterns at a glance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-4">📁</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Smart Categories</h3>
                        <p className="text-gray-600">Organize expenses by custom categories</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-2xl mr-4">📈</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Visual Charts</h3>
                        <p className="text-gray-600">Beautiful pie and bar charts for insights</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to get started?</h3>
                    <div className="space-y-3">
                      <Link
                        href="/sign-up"
                        className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center"
                      >
                        Create Account
                      </Link>
                      <Link
                        href="/sign-in"
                        className="block w-full px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-center"
                      >
                        Sign In
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                      No credit card required. Free forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="py-8 border-t border-gray-200 mt-12">
          <p className="text-sm text-gray-500 text-center">
            © 2026 Expense Tracker. Built with Next.js, Supabase & Prisma.
          </p>
        </div>
      </div>
    </main>
  );
}
