"use client";

import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { getProductsApi, createProductApi, uploadImageApi, updateProductApi, deleteProductApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, Upload, X, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function normalizeProduct(item) {
  const inStock = item.inStock;
  const forSale = inStock === true || inStock === 'yes' || item.forSale === true;
  return {
    id: item.id ?? item._id,
    title: item.title ?? '',
    category: item.category ?? '',
    image: item.image ?? '',
    description: item.description ?? '',
    forSale,
    layout: item.layout || 'vertical',
    price: item.price,
    year: item.year,
  };
}

export default function AdminArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const imageInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    price: '',
    year: '',
    forSale: true,
    layout: 'vertical',
  });

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    setLoading(true);
    const token = AdminStorage.getAccessToken();
    const res = await getProductsApi(token);
    setLoading(false);
    // API returns { success, message, data: { totalCount, totalPages, currentPage, limit, data: [] } }
    const list = res?.data?.data ?? res?.data ?? res?.products ?? [];
    const normalized = Array.isArray(list) ? list.map(normalizeProduct) : [];
    setArtworks(normalized);
    if (!res?.success && normalized.length === 0 && res?.message) {
      toast.error(res.message || 'Failed to load artworks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = AdminStorage.getAccessToken();
    try {
      if (editingArtwork) {
        let imageUrl = formData.image;
        const file = imageFile || imageInputRef.current?.files?.[0];
        if (file) {
          const uploadRes = await uploadImageApi(token, file);
          imageUrl = uploadRes?.data?.image ?? uploadRes?.data?.url ?? uploadRes?.data?.imageUrl ?? uploadRes?.url ?? '';
          if (!imageUrl) {
            toast.error(uploadRes?.message || 'Image upload failed');
            setSubmitting(false);
            return;
          }
        }
        const res = await updateProductApi(token, editingArtwork.id, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price || '0',
          inStock: formData.forSale ? 'yes' : 'no',
          image: imageUrl,
          year: formData.year || '',
        });
        if (res?.success) {
          toast.success('Artwork updated successfully');
          setShowModal(false);
          resetForm();
          loadArtworks();
        } else {
          toast.error(res?.message || 'Failed to update artwork');
        }
        return;
      }

      const file = imageFile || imageInputRef.current?.files?.[0];
      if (!file) {
        toast.error('Please select an image');
        setSubmitting(false);
        return;
      }
      const uploadRes = await uploadImageApi(token, file);
      const imageUrl = uploadRes?.data?.image ?? uploadRes?.data?.url ?? uploadRes?.data?.imageUrl ?? uploadRes?.url ?? '';
      if (!imageUrl) {
        toast.error(uploadRes?.message || 'Image upload failed – no URL in response');
        setSubmitting(false);
        return;
      }
      const res = await createProductApi(token, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price || '0',
        inStock: formData.forSale ? 'yes' : 'no',
        image: imageUrl,
        year: formData.year || '',
      });
      if (res?.success) {
        toast.success('Artwork added successfully');
        setShowModal(false);
        resetForm();
        loadArtworks();
      } else {
        toast.error(res?.message || 'Failed to add artwork');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      category: artwork.category,
      image: artwork.image,
      description: artwork.description,
      price: artwork.price ?? '',
      year: artwork.year ?? '',
      forSale: artwork.forSale ?? true,
      layout: artwork.layout || 'vertical',
    });
    setImageFile(null);
    setImagePreview(artwork.image || null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    const artwork = artworks.find((a) => a.id === id);
    setArtworkToDelete(artwork);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!artworkToDelete) return;
    setDeleting(true);
    const token = AdminStorage.getAccessToken();
    try {
      const res = await deleteProductApi(token, artworkToDelete.id);
      if (res?.success) {
        toast.success('Artwork deleted successfully');
        setShowDeleteModal(false);
        setArtworkToDelete(null);
        loadArtworks();
      } else {
        toast.error(res?.message || 'Failed to delete artwork');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setArtworkToDelete(null);
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      image: '',
      description: '',
      price: '',
      year: '',
      forSale: true,
      layout: 'vertical',
    });
    setEditingArtwork(null);
    setImageFile(null);
    setImagePreview(null);
    setIsDragging(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const categories = AdminStorage.getCategories();
  const uniqueCategories = [...new Set([...categories, ...artworks.map((a) => a.category)].filter(Boolean))];

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
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading artworks...</div>
          ) : (
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
                  <tr key={artwork.id ?? artwork._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        {artwork.image ? (
                          artwork.image.startsWith('/') ? (
                            <Image
                              src={artwork.image}
                              alt={artwork.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                        )}
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
                          onClick={() => handleDeleteClick(artwork.id)}
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
          )}
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
                        {uniqueCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image *
                      </label>
                      
                      {imagePreview ? (
                        <div className="relative">
                          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImageFile(null);
                                setImagePreview(null);
                                if (imageInputRef.current) imageInputRef.current.value = '';
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 text-center">
                            {imageFile?.name}
                          </p>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith('image/')) {
                              handleImageSelect(file);
                            }
                          }}
                          onClick={() => imageInputRef.current?.click()}
                          className={`relative w-full h-48 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
                            isDragging
                              ? 'border-[#4b463f] bg-[#f7f5ef]'
                              : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleImageSelect(f);
                            }}
                            className="hidden"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className={`p-4 rounded-full mb-3 ${
                              isDragging ? 'bg-[#4b463f]' : 'bg-gray-200'
                            }`}>
                              {isDragging ? (
                                <Upload size={24} className="text-white" />
                              ) : (
                                <ImageIcon size={24} className="text-gray-600" />
                              )}
                            </div>
                            <p className={`text-sm font-medium mb-1 ${
                              isDragging ? 'text-[#4b463f]' : 'text-gray-700'
                            }`}>
                              {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
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

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="3000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          placeholder="2026"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          In Stock
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
                        disabled={submitting}
                        className="flex-1 bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-60"
                      >
                        {submitting ? (editingArtwork ? 'Updating...' : 'Creating...') : (editingArtwork ? 'Update' : 'Create')}
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

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && artworkToDelete && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleDeleteCancel}
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
                  className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-xl"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                    <AlertTriangle className="text-red-600" size={32} />
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-center mb-2">
                    Delete Artwork
                  </h2>
                  
                  <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to delete <span className="font-semibold text-gray-900">"{artworkToDelete.title}"</span>? This action cannot be undone.
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleDeleteCancel}
                      disabled={deleting}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConfirm}
                      disabled={deleting}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {deleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
