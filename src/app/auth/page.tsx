'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { authenticateOrCreateUser } from '@/app/actions/auth';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useShop();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const sessionUser = await authenticateOrCreateUser(formData);
      login(sessionUser);
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
            👤
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            Welcome to SmartShop
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your details to register or jump right back into your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wide text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Alex Johnson"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wide text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-98 disabled:bg-gray-300"
          >
            {loading ? 'Authenticating...' : 'Continue to Shop'}
          </button>
        </form>
      </div>
    </main>
  );
}