import { useState } from 'react';
import { Category } from '@/hooks/useCategories';

const PRESET_COLORS = [
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

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (name: string, color?: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function CategoryManager({
  categories,
  onCreateCategory,
  onDeleteCategory,
  isLoading = false,
}: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!newCategory.trim()) {
        throw new Error('Category name is required');
      }

      await onCreateCategory(newCategory, selectedColor);
      setNewCategory('');
      setSelectedColor(PRESET_COLORS[0]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure? This will not delete expenses in this category.')) return;

    setDeletingId(id);
    setError(null);
    try {
      await onDeleteCategory(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold text-sm"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddCategory} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Groceries, Transport, Entertainment"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 font-semibold"
          >
            {submitting || isLoading ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 border-2 border-gray-100 rounded-lg hover:border-gray-300 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium text-gray-800">{category.name}</span>
            </div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              disabled={deletingId === category.id || isLoading}
              className="text-red-600 hover:text-red-800 disabled:text-gray-400 text-sm font-medium"
            >
              {deletingId === category.id ? '...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {categories.length === 0 && !showForm && (
        <p className="text-center text-gray-500">No categories yet. Create one to get started!</p>
      )}
    </div>
  );
}
