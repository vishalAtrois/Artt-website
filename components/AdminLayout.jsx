"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AdminStorage } from '@/lib/adminStorage';
import { logoutApi } from '@/lib/adminApi';
import { 
  LayoutDashboard, 
  Image, 
  Mail, 
  Tag, 
  LogOut,
  Menu,
  X,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!AdminStorage.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    const email = AdminStorage.getUser()?.email;
    const refreshToken = AdminStorage.getRefreshToken();
    setLoggingOut(true);
    setShowLogoutModal(false);

    try {
      if (email && refreshToken) {
        const res = await logoutApi(email, refreshToken);
        if (res?.success) {
          toast.success('Logged out successfully');
        } else {
          toast.error(res?.message || 'Logout failed');
        }
      } else {
        toast.success('Logged out');
      }
    } catch (err) {
      toast.error('Logout failed');
    } finally {
      AdminStorage.logout();
      router.push('/admin');
      setLoggingOut(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/artworks', label: 'Artworks', icon: Image },
    { href: '/admin/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
    { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
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
                    onClick={handleLogoutClick}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-60"
                  >
                    <LogOut size={20} />
                    <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
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

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleLogoutCancel}
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
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
                    <AlertTriangle className="text-orange-600" size={32} />
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-center mb-2">
                    Confirm Logout
                  </h2>
                  
                  <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to logout? You'll need to login again to access the admin panel.
                  </p>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleLogoutCancel}
                      disabled={loggingOut}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleLogoutConfirm}
                      disabled={loggingOut}
                      className="flex-1 bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loggingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Logging out...
                        </>
                      ) : (
                        <>
                          <LogOut size={18} />
                          Logout
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
    </div>
  );
}
