export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  emoji: string;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Quantum Phone Pro',
    category: 'Smartphones',
    description: 'Next-gen smartphone with an immersive edge-to-edge display and advanced camera array.',
    price: 899,
    emoji: '📱',
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'SonicWave Buds',
    category: 'Earbuds',
    description: 'Active noise-canceling wireless earbuds with deep acoustic bass tuning.',
    price: 149,
    emoji: '🎧',
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Aero Watch 5',
    category: 'Smartwatches',
    description: 'Sleek fitness and health metric tracker featuring a 48-hour continuous battery life.',
    price: 249,
    emoji: '⌚',
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'ApexBook 14',
    category: 'Laptops',
    description: 'Ultra-thin computational workhorse ideal for intensive programming and visual design.',
    price: 1299,
    emoji: '💻',
    inStock: false,
  },
  {
    id: 'prod-5',
    name: 'TabVivid Slate',
    category: 'Tablets',
    description: 'Crisp 11-inch cinematic tablet screen designed for digital artists and streaming entertainment.',
    price: 499,
    emoji: '平板', // Using tablet emoji representation or simple fallback icon string
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'BoomBox Aura',
    category: 'Speakers',
    description: '360-degree room-filling portable wireless speaker featuring ambient pulsing light syncing.',
    price: 189,
    emoji: '🔊',
    inStock: true,
  }
];

// Quick localized mapping helper if an emoji layout needs checking
PRODUCTS[4].emoji = '📟'; // Tablet alternative device icon for reliable rendering