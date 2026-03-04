import React, { useState } from 'react';

interface CategoryManagerProps {
  categories: any[];
  onCreateCategory: (name: string, color?: string) => Promise<any>;
  onDeleteCategory: (id: string) => Promise<any>;
  isLoading: boolean;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onCreateCategory, onDeleteCategory, isLoading }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('#6366f1');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      setError('Label required.');
      return;
    }
    try {
      await onCreateCategory(newTitle, newColor);
      setNewTitle('');
      setError(null);
    } catch (err: any) {
      setError('Log Error: ' + (err.message || 'Initialization failed'));
    }
  };

  return (
    <div className="space-y-8 flex flex-col h-full">
      <div className="space-y-4">
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-indigo-50/50 border border-indigo-100 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all"
              placeholder="New Domain Name..."
            />
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-10 h-10 p-1 bg-white border border-indigo-100 rounded-xl cursor-pointer"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white rounded-xl py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'SYNCING...' : 'Register Domain'}
          </button>
          {error && <p className="text-red-500 text-[10px] font-bold italic">{error}</p>}
        </form>
      </div>

      <div className="flex-1 space-y-2">
        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Active Segments</h5>
        {categories.map((cat) => (
          <div key={cat.id} className="flex justify-between items-center p-3 bg-white/30 border border-white/40 rounded-xl group hover:bg-white/60 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(34,38,135,0.1)]" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs font-bold text-slate-700">{cat.name}</span>
            </div>
            <button
              onClick={() => onDeleteCategory(cat.id)}
              className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
        {categories.length === 0 && !isLoading && (
          <div className="py-10 text-center opacity-30">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Neutral Environment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
