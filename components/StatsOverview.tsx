import React from 'react';

interface StatsOverviewProps {
  stats: any;
  isLoading: boolean;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/40 rounded-xl"></div>)}
    </div>;
  }

  const items = [
    { label: 'Available Balance', value: stats?.totalBalance || 0, color: 'text-indigo-600' },
    { label: 'Monthly Out', value: stats?.monthlyExpenses || 0, color: 'text-slate-900' },
    { label: 'Savings Rate', value: `${stats?.savingsRate || 0}%`, color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/30 border border-white/40 group hover:bg-white/60 transition-all">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
          <p className={`text-lg font-black tracking-tight ${item.color}`}>
            {typeof item.value === 'number'
              ? `$${item.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
              : item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
