import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DashboardStats } from '@/hooks/useStats';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  stats: DashboardStats | null;
  isLoading?: boolean;
}

const COLORS = [
  '#6366f1', // indigo
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#a855f7', // purple
  '#ec4899', // pink
];

export default function CategoryPieChart({ stats, isLoading = false }: CategoryPieChartProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-96">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (!stats || stats.topCategories.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-96">
        <p className="text-gray-500">Add expenses to see spending by category</p>
      </div>
    );
  }

  const data = {
    labels: stats.topCategories.map((cat: any) => cat.name),
    datasets: [
      {
        label: 'Spending by Category',
        data: stats.topCategories.map((cat: any) => cat.amount),
        backgroundColor: COLORS.slice(0, stats.topCategories.length),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const percentage = ((value / stats.overview.total) * 100).toFixed(1);
            return `$${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
      <div className="flex justify-center">
        <div style={{ width: '400px', height: '300px' }}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
