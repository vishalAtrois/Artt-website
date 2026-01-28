"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    forSale: true,
    layout: 'vertical',
  });

  useEffect(() => {
    loadArtworks();
    // Listen for updates
    if (typeof window !== 'undefined') {
      window.addEventListener('artworksUpdated', loadArtworks);
      return () => window.removeEventListener('artworksUpdated', loadArtworks);
    }
  }, []);

  const loadArtworks = () => {
    const allArtworks = AdminStorage.getArtworks();
    setArtworks(allArtworks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingArtwork) {
      AdminStorage.updateArtwork(editingArtwork.id, formData);
    } else {
      AdminStorage.addArtwork(formData);
    }
    loadArtworks();
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      category: artwork.category,
      image: artwork.image,
      description: artwork.description,
      forSale: artwork.forSale ?? true,
      layout: artwork.layout || 'vertical',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      AdminStorage.deleteArtwork(id);
      loadArtworks();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      image: '',
      description: '',
      forSale: true,
      layout: 'vertical',
    });
    setEditingArtwork(null);
  };

  const categories = AdminStorage.getCategories();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Artworks</h1>
            <p className="text-gray-600">Manage your art collection</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#4b463f] text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
          >
            <Plus size={20} />
            Add Artwork
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">For Sale</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{artwork.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">{artwork.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        artwork.forSale ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {artwork.forSale ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/Paintings/${artwork.id}`}
                          target="_blank"
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Eye size={18} className="text-gray-600" />
                        </Link>
                        <button
                          onClick={() => handleEdit(artwork)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(artwork.id)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <h2 className="text-2xl font-semibold mb-6">
                    {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Path *
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/Images/art1.jpeg"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Layout
                        </label>
                        <select
                          value={formData.layout}
                          onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                          <option value="vertical">Vertical</option>
                          <option value="horizontal">Horizontal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          For Sale
                        </label>
                        <select
                          value={formData.forSale ? 'true' : 'false'}
                          onChange={(e) => setFormData({ ...formData, forSale: e.target.value === 'true' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors"
                      >
                        {editingArtwork ? 'Update' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
