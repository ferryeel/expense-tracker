import React, { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';

interface ExpenseFormProps {
  onSuccess: () => void;
  onCreateExpense: (data: any) => Promise<any>;
  isLoading: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, onCreateExpense, isLoading }) => {
  const { categories, fetchCategories } = useCategories();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.categoryId) {
      setError('Entry requires Magnitude & Segment.');
      return;
    }

    try {
      await onCreateExpense({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        amount: '',
        description: '',
        categoryId: '',
        date: new Date().toISOString().split('T')[0],
      });
      setError(null);
      onSuccess();
    } catch (err: any) {
      setError('System Error: ' + (err.message || 'Transmission failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 shadow-none block">Magnitude</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full bg-white/40 border border-white/60 rounded-xl pl-8 pr-4 py-3 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Context</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-slate-900 font-semibold text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-300"
          placeholder="What was this for?"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Category</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500/50 transition-all appearance-none"
          >
            <option value="">Select Domain</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Timestamp</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider animate-shake">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
      >
        {isLoading ? 'Processing...' : 'Commit Transaction'}
      </button>
    </form>
  );
};

export default ExpenseForm;
