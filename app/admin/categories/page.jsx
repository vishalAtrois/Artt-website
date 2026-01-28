"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { Plus, Trash2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const allCategories = AdminStorage.getCategories();
    setCategories(allCategories);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      AdminStorage.addCategory(newCategory.trim());
      setNewCategory('');
      loadCategories();
    }
  };

  const handleDelete = (category) => {
    if (confirm(`Are you sure you want to delete "${category}"? This will not remove it from existing artworks.`)) {
      AdminStorage.deleteCategory(category);
      loadCategories();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Categories</h1>
          <p className="text-gray-600">Manage artwork categories</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <form onSubmit={handleAdd} className="flex gap-4 mb-6">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#4b463f] text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
          </form>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No categories yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Tag size={20} className="text-gray-600" />
                    <span className="font-medium">{category}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(category)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
