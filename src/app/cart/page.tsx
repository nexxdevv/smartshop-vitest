'use client';

import Link from 'next/link';
import { useShop } from '@/context/ShopContext';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="mt-4 text-xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-1 text-sm text-gray-500">Add some high-performance gadgets to get started.</p>
        <Link href="/" className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700">
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Your Basket</h1>
        <button onClick={clearCart} className="text-xs font-semibold text-rose-600 hover:underline">
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="mt-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-50 text-3xl">
                {item.emoji}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                <p className="text-xs font-semibold text-indigo-600">${item.price} each</p>
              </div>
            </div>

            {/* Stepper Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
              <button
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, emoji: item.emoji })}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer Panel */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between text-base font-bold text-gray-900">
          <span>Subtotal Cost</span>
          <span className="text-xl">${cartTotal}</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">Shipping calculations and options apply on next screen tier.</p>
        
        <Link
          href="/checkout"
          className="mt-5 block w-full text-center rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 active:scale-99 transition-all"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}