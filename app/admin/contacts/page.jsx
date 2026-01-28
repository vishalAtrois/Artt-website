"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { Mail, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, read, unread

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const allContacts = AdminStorage.getContacts();
    setContacts(allContacts);
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'read') return contact.read;
    if (filter === 'unread') return !contact.read;
    return true;
  });

  const handleMarkRead = (id, read) => {
    AdminStorage.markContactRead(id, read);
    loadContacts();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      AdminStorage.deleteContact(id);
      loadContacts();
    }
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Contact Submissions</h1>
            <p className="text-gray-600">Manage messages from visitors</p>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {unreadCount} unread
              </span>
            )}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Mail className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No contact submissions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl p-6 border-2 ${
                  contact.read ? 'border-gray-200' : 'border-orange-300 bg-orange-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{contact.name}</h3>
                      {!contact.read && (
                        <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(contact.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!contact.read ? (
                      <button
                        onClick={() => handleMarkRead(contact.id, true)}
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={18} className="text-green-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkRead(contact.id, false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Mark as unread"
                      >
                        <X size={18} className="text-gray-600" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {contact.painting && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">Painting: </span>
                    <span className="text-sm font-medium">{contact.painting}</span>
                  </div>
                )}

                {contact.subject && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">Subject: </span>
                    <span className="text-sm font-medium">{contact.subject}</span>
                  </div>
                )}

                {contact.message && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
