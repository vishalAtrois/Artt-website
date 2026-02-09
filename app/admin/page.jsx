"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AdminStorage } from '@/lib/adminStorage';
import { motion } from 'framer-motion';

const LOGIN_API_URL = 'https://art-website-liart.vercel.app/v1/admin/login';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        setError('Ogiltigt svar från servern.');
        toast.error('Ogiltigt svar från servern.');
        return;
      }

      if (parsed?.success && parsed?.user && parsed?.tokens?.access?.token) {
        AdminStorage.setAuthSession(parsed);
        toast.success('Inloggad framgångsrikt');
        router.push('/admin/dashboard');
        return;
      }

      const errMsg = parsed?.message || parsed?.error || 'Login failed.';
      setError(errMsg);
      toast.error(errMsg);
    } catch (err) {
      console.error('Login API error:', err);
      setError('Nätverksfel. Försök igen.');
      toast.error('Nätverksfel. Försök igen.');
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
        <h1 className="text-3xl font-semibold mb-2 text-center">Admin inloggning</h1>
        <p className="text-gray-600 text-center mb-8">Öppna adminpanelen</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            E-post
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
            Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Ange lösenord"
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
            {loading ? 'inloggning.com...' : 'Inloggning'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
        Använd din administratörs-e-postadress och ditt lösenord för att logga in.
        </p>
      </motion.div>
    </div>
  );
}
