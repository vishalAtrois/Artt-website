"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AdminStorage } from '@/lib/adminStorage';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

const LOGIN_API_URL = 'https://art-website-liart.vercel.app/v1/admin/login';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (AdminStorage.isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email,
      password,
      roleType: 'admin',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(LOGIN_API_URL, requestOptions);
      const result = await response.text();
      let parsed = null;
      try {
        parsed = JSON.parse(result);
      } catch {
        setError(t('admin.login.invalidResponse'));
        toast.error(t('admin.login.invalidResponse'));
        return;
      }

      if (parsed?.success && parsed?.user && parsed?.tokens?.access?.token) {
        AdminStorage.setAuthSession(parsed);
        toast.success(t('admin.login.success'));
        router.push('/admin/dashboard');
        return;
      }

      const errMsg = parsed?.message || parsed?.error || 'Login failed.';
      setError(errMsg);
      toast.error(errMsg);
    } catch (err) {
      console.error('Login API error:', err);
      setError(t('admin.login.networkError'));
      toast.error(t('admin.login.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-2 text-center">Admin login</h1>
        <p className="text-gray-600 text-center mb-8">
          {t('admin.login.openPanel')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.login.emailLabel') ?? 'E-post'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('admin.login.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder={t('admin.login.passwordPlaceholder')}
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
            disabled={loading}
            className="w-full bg-[#4b463f] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          {t('admin.login.helper')}
        </p>
      </motion.div>
    </div>
  );
}
