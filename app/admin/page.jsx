"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminStorage } from '@/lib/adminStorage';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (AdminStorage.isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (AdminStorage.login(username, password)) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-2 text-center">Admin Login</h1>
        <p className="text-gray-600 text-center mb-8">Access the admin panel</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Default: admin / admin123
        </p>
      </motion.div>
    </div>
  );
}
