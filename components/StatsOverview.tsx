import { formatCurrency } from '@/lib/utils';
import { DashboardStats } from '@/hooks/useStats';

interface StatsOverviewProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

export default function StatsOverview({ stats, isLoading = false }: StatsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.overview.total),
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: '💰',
    },
    {
      title: 'This Month',
      value: formatCurrency(stats.overview.thisMonth),
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      icon: '📊',
    },
    {
      title: 'This Week',
      value: formatCurrency(stats.overview.thisWeek),
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: '📈',
    },
    {
      title: 'Categories',
      value: stats.categories.toString(),
      bg: 'bg-orange-50',
      textColor: 'text-orange-600',
      icon: '🏷️',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} p-6 rounded-lg shadow border-l-4 ${
              card.textColor === 'text-blue-600'
                ? 'border-blue-400'
                : card.textColor === 'text-green-600'
                ? 'border-green-400'
                : card.textColor === 'text-purple-600'
                ? 'border-purple-400'
                : 'border-orange-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <span className="text-4xl opacity-20">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {stats.topCategories.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Top Spending Categories</h3>
            <div className="space-y-3">
              {stats.topCategories.map((cat: any) => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {cat.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(cat.amount)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <p className="text-sm text-gray-600 mb-3">
              Total expenses recorded: {stats.overview.expenseCount}
            </p>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>✓ You have {stats.categories} spending categories configured</p>
              <p className="mt-2">
                ✓ Average monthly spending:{' '}
                <span className="font-semibold">
                  {formatCurrency(stats.overview.thisMonth || 0)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
