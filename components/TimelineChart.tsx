import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimelineChartProps {
  expenses: any[];
  isLoading?: boolean;
}

const getWeeklyData = (expenses: any[]) => {
  const weeks: Record<string, number> = {};
  const weekLabels: string[] = [];

  // Get last 8 weeks
  const now = new Date();
  const weekData = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 7);
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const label = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
    weekLabels.push(label);

    let total = 0;
    expenses.forEach((expense) => {
      const expDate = new Date(expense.date);
      if (expDate >= weekStart && expDate <= weekEnd) {
        total += expense.amount;
      }
    });

    weekData.push(total);
  }

  return {
    labels: weekLabels,
    data: weekData,
  };
};

export default function TimelineChart({ expenses, isLoading = false }: TimelineChartProps) {
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
        <p className="text-gray-500">Add expenses to see spending timeline</p>
      </div>
    );
  }

  const { labels, data } = getWeeklyData(expenses);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weekly Spending',
        data,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.3,
        fill: true,
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
        mode: 'index' as const,
        intersect: false,
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
      <h3 className="text-xl font-bold mb-4">Weekly Spending Timeline</h3>
      <Line data={chartData} options={options} height={80} />
    </div>
  );
}
