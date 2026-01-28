"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { AdminStorage } from '@/lib/adminStorage';
import { Image, Mail, Tag, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    const artworks = AdminStorage.getArtworks();
    const contacts = AdminStorage.getContacts();
    const categories = AdminStorage.getCategories();

    setStats({
      totalArtworks: artworks.length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter(c => !c.read).length,
      totalCategories: categories.length,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Artworks',
      value: stats.totalArtworks,
      icon: Image,
      color: 'bg-blue-500',
    },
    {
      title: 'Contact Submissions',
      value: stats.totalContacts,
      icon: Mail,
      color: 'bg-green-500',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadContacts,
      icon: Mail,
      color: 'bg-orange-500',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-purple-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your art gallery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/artworks?action=add"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Add New Artwork</h3>
              <p className="text-sm text-gray-600">Upload a new painting</p>
            </a>
            <a
              href="/admin/contacts"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">View Messages</h3>
              <p className="text-sm text-gray-600">Check contact submissions</p>
            </a>
            <a
              href="/admin/categories"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-1">Manage Categories</h3>
              <p className="text-sm text-gray-600">Add or edit categories</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
