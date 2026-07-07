'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { processOrderCheckout } from '@/app/actions/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, cartTotal, updateUserAddress, clearCart } = useShop();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=checkout');
    } else if (user.address) {
      setAddress(user.address);
    }
  }, [user, router]);

  if (!user || cart.length === 0) return null;

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('A valid shipping address configuration is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        email: user.email,
        address: address.trim(),
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          emoji: item.emoji
        })),
        totalCost: cartTotal
      };

      const result = await processOrderCheckout(payload);
      if (result.success) {
        updateUserAddress(result.savedAddress);
        clearCart(); // Flush item tracking array
        router.push('/checkout/success');
      }
    } catch (err: any) {
      setError(err.message || 'Payment system error processing checkout sequence.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 border-b border-gray-100 pb-3">
          Secure Checkout
        </h1>

        <form onSubmit={handlePaySubmit} className="mt-4 space-y-4">
          {error && <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">⚠️ {error}</div>}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Customer Name</label>
            <input type="text" readOnly value={user.name} className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-500 outline-none cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Account Email</label>
            <input type="email" readOnly value={user.email} className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm text-gray-500 outline-none cursor-not-allowed" />
          </div>

          <div>
            <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-gray-700">Shipping Delivery Address</label>
            <textarea
              id="address"
              rows={3}
              placeholder="123 Main Street, Apt 4B, New York, NY 10001"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="rounded-xl bg-indigo-50/50 p-4 border border-indigo-100">
            <div className="flex items-center justify-between text-sm font-bold text-gray-900">
              <span>Total Charge Payment</span>
              <span className="text-base">${cartTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 disabled:bg-gray-300"
          >
            {loading ? 'Processing Transaction...' : `Pay $${cartTotal}`}
          </button>
        </form>
      </div>
    </main>
  );
}