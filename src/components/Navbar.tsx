'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, user, logout } = useShop();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600">
            ⚡ SmartShop
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
              Shop
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-700">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                Sign In
              </Link>
            )}
          </nav>

          {/* Right Actions Block */}
          <div className="flex items-center space-x-4">
            {/* Cart Badge Trigger */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600" aria-label="View Cart">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-In Mobile Navigation Drawer Menu */}
      <div
        data-testid="mobile-drawer"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out transform md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-150 pb-4">
          <span className="text-lg font-bold text-gray-900">Navigation</span>
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 flex flex-col space-y-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
          >
            Browse Products
          </Link>
          <Link
            href="/cart"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
          >
            Your Cart ({cartCount})
          </Link>
          
          <hr className="border-gray-200 my-2" />

          {user ? (
            <>
              <div className="px-4 py-1 text-xs font-medium text-gray-400">
                Signed in as: <span className="text-gray-700 font-semibold">{user.name}</span>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                User Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left rounded-lg px-4 py-2 text-base font-semibold text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-2 text-base font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Sign In / Create Account
            </Link>
          )}
        </nav>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
        />
      )}
    </>
  );
}