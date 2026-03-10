"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { getFaqsApi, createFaqApi, deleteFaqApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { Plus, Trash2, HelpCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: '',
  });
  const { t } = useLanguage();

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setLoading(true);
    const token = AdminStorage.getAccessToken();
    const res = await getFaqsApi(token);
    setLoading(false);
    // API returns { success: true, result: Array }
    const list = res?.result ?? res?.data ?? res?.faqs ?? [];
    const normalized = Array.isArray(list) ? list : [];
    setFaqs(normalized);
    if (!res?.success && normalized.length === 0 && res?.message) {
      toast.error(res.message || 'Failed to load FAQs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = AdminStorage.getAccessToken();
    try {
      const res = await createFaqApi(token, {
        question: formData.question,
        answer: formData.answer,
        order: formData.order || '1',
      });
      if (res?.success) {
        toast.success(t('admin.faq.addSuccess') ?? 'FAQ added');
        setShowModal(false);
        resetForm();
        loadFaqs();
      } else {
        toast.error(res?.message || t('admin.faq.addError'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('admin.faq.genericError'));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      order: '',
    });
  };

  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!faqToDelete) return;
    setDeleting(true);
    const token = AdminStorage.getAccessToken();
    try {
      const res = await deleteFaqApi(token, faqToDelete._id ?? faqToDelete.id);
      if (res?.success) {
        toast.success(t('admin.faq.deleteSuccess'));
        setShowDeleteModal(false);
        setFaqToDelete(null);
        loadFaqs();
      } else {
        toast.error(res?.message || t('admin.faq.deleteError'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('admin.faq.genericError'));
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFaqToDelete(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">
              {t('admin.faq.title')}
            </h1>
            <p className="text-gray-600">{t('admin.faq.subtitle')}</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#4b463f] text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
          >
            <Plus size={20} />
              {t('admin.faq.addButton')}
            </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              {t('admin.faq.loading')}
            </div>
          ) : faqs.length === 0 ? (
            <div className="p-12 text-center">
              <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">{t('admin.faq.noneYet')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {faqs
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((faq, index) => (
                  <motion.div
                    key={faq._id ?? faq.id ?? index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {faq.order && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm font-medium">
                              #{faq.order}
                            </span>
                          )}
                          {faq.isActive === false && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-500 rounded text-xs">
                              {t('admin.faq.inactive') ?? 'Inactive'}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-gray-900">
                            {faq.question || t('admin.faq.noQuestion')}
                          </h3>
                        </div>
                       <p className="text-gray-600 mt-2 whitespace-pre-wrap">
                         {faq.answer || t('admin.faq.noAnswer') || 'Inget svar'}
                       </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleDeleteClick(faq)}
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Ta bort FAQ"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>

        {/* Add FAQ Modal */}
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
                    {t('admin.faq.addNewTitle')}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question *
                      </label>
                      <input
                        type="text"
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder={t('admin.faq.questionPlaceholder')}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer *
                      </label>
                      <textarea
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                        placeholder={t('admin.faq.answerPlaceholder') ?? 'Ange svaret'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="1"
                        min="1"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t('admin.faq.sortOptional')}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-60"
                      >
                        {submitting ? t('admin.faq.creating') ?? 'Skapande...' : t('admin.faq.createButton') ?? 'Skapa FAQ'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        {t('common.cancel') ?? 'Avboka'}
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
          {showDeleteModal && faqToDelete && (
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
                    {t('admin.faq.deleteTitle') ?? 'Ta bort FAQ'}
                  </h2>
                  
                  <p className="text-gray-600 text-center mb-6">
                    {t('admin.faq.deleteConfirm')}{' '}
                    <span className="font-semibold text-gray-900">
                      "{faqToDelete.question}"
                    </span>
                    ? {t('common.cannotUndo') ?? 'Den här åtgärden kan inte ångras.'}
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleDeleteCancel}
                      disabled={deleting}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-60"
                    >
                      {t('common.cancel') ?? 'Cancel'}
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
                          {t('common.deleting') ?? 'Tar bort...'}
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          {t('common.delete') ?? 'Radera'}
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