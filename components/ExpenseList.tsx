import React from 'react';

interface ExpenseListProps {
  expenses: any[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-20 bg-white/40 rounded-2xl"></div>)}
    </div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale">
        <div className="text-4xl mb-4">📂</div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No active records in this cycle.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 px-1 pb-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-white/40 border border-white/60 rounded-2xl group hover:bg-white/80 hover:scale-[1.01] transition-all cursor-default"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm border border-white">
              {expense.category.icon || '☄️'}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-none">{expense.description || 'System Entry'}</p>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: expense.category.color || '#6366f1' }}></span>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {expense.category.name} • {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-lg font-black text-slate-900 tracking-tighter">${expense.amount.toFixed(2)}</p>
              <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest text-right mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Cleared</p>
            </div>

            <button
              onClick={() => onDelete(expense.id)}
              className="p-2.5 rounded-xl bg-red-50 text-red-100 hover:text-red-500 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100"
              title="Purge Record"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
