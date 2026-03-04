import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyBarChartProps {
  expenses: any[];
  isLoading?: boolean;
}

const getMonthlyData = (expenses: any[]) => {
  const months: Record<string, number> = {};
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get last 12 months
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months[key] = 0;
  }

  // Sum expenses by month
  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (months.hasOwnProperty(key)) {
      months[key] += expense.amount;
    }
  });

  const labels = Object.keys(months).map((key) => {
    const [year, month] = key.split('-');
    const monthIndex = parseInt(month) - 1;
    return `${monthNames[monthIndex]} '${year.slice(-2)}`;
  });

  return {
    labels,
    data: Object.values(months),
  };
};

export default function MonthlyBarChart({ expenses, isLoading = false }: MonthlyBarChartProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-80">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center h-80">
        <p className="text-gray-500">Add expenses to see monthly trends</p>
      </div>
    );
  }

  const { labels, data } = getMonthlyData(expenses);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data,
        backgroundColor: '#3b82f6',
        borderColor: '#1e40af',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { size: 12 },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value.toFixed(0)}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">12-Month Spending Trend</h3>
      <Bar data={chartData} options={options} height={80} />
    </div>
  );
}
