'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  address?: string;
}

interface ShopContextType {
  cart: CartItem[];
  user: UserSession | null;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  login: (userData: UserSession) => void;
  logout: () => void;
  updateUserAddress: (address: string) => void;
  cartCount: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);

  // 1. Hydrate the state from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('smartshop_cart');
    const savedUser = localStorage.getItem('smartshop_user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 2. Automatically sync state back to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('smartshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartshop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smartshop_user');
    }
  }, [user]);

  // Sync state cleanly for client interactions
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (existing && existing.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => setCart([]);
  
  const login = (userData: UserSession) => setUser(userData);
  const logout = () => {
    setUser(null);
    clearCart();
  };

  const updateUserAddress = (address: string) => {
    if (user) {
      setUser({ ...user, address });
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        user,
        addToCart,
        removeFromCart,
        clearCart,
        login,
        logout,
        updateUserAddress,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};