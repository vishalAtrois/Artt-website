"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AdminStorage } from '@/lib/adminStorage';
import { 
  LayoutDashboard, 
  Image, 
  Mail, 
  Tag, 
  LogOut,
  Menu,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!AdminStorage.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    AdminStorage.logout();
    router.push('/admin');
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/artworks', label: 'Artworks', icon: Image },
    { href: '/admin/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
  ];

  if (!AdminStorage.isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f7f5ef]">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          <motion.aside
            initial={false}
            animate={{ 
              x: sidebarOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : -300) 
            }}
            exit={{ x: -300 }}
            className="fixed md:sticky inset-y-0 md:top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200"
          >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold">Admin Panel</h2>
                  <p className="text-sm text-gray-600 mt-1">Art Gallery Management</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-[#4b463f] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
