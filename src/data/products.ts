export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  emoji: string;
  inStock: boolean;
}

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
  // === SMARTPHONES ===
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
    id: 'prod-7',
    name: 'Nexus Flip X',
    category: 'Smartphones',
    description: 'Foldable pocket-sized smartphone with an interactive exterior cover display.',
    price: 1099,
    emoji: '📲',
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'Aero Lite 5G',
    category: 'Smartphones',
    description: 'Budget-friendly 5G smartphone prioritizing massive 3-day battery lifespan.',
    price: 349,
    emoji: '📞',
    inStock: true,
  },

  // === EARBUDS ===
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
    id: 'prod-9',
    name: 'Aura Studio Buds',
    category: 'Earbuds',
    description: 'Ultra-lightweight transparent earbuds featuring studio-grade spatial audio tracking.',
    price: 199,
    emoji: '🎵',
    inStock: true,
  },
  {
    id: 'prod-10',
    name: 'SportFit Air',
    category: 'Earbuds',
    description: 'Sweatproof wrap-around wireless hooks tailored for high-intensity running circuits.',
    price: 99,
    emoji: '🎙️',
    inStock: false,
  },

  // === SMARTWATCHES ===
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
    id: 'prod-11',
    name: 'Chronos Titan GPS',
    category: 'Smartwatches',
    description: 'Rugged titanium outdoor watch built with dual-frequency satellite navigation systems.',
    price: 449,
    emoji: '🧭',
    inStock: true,
  },
  {
    id: 'prod-12',
    name: 'Vibe Band Minimal',
    category: 'Smartwatches',
    description: 'Ultra-thin notification wristband focusing on stress and sleep tracking analytics.',
    price: 79,
    emoji: '📿',
    inStock: true,
  },

  // === LAPTOPS ===
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
    id: 'prod-13',
    name: 'Vanguard Titan 16',
    category: 'Laptops',
    description: 'Elite gaming rig housing a desktop-class graphics processing unit and mechanical keyboard.',
    price: 2199,
    emoji: '🖥️',
    inStock: true,
  },
  {
    id: 'prod-14',
    name: 'CloudStream Air',
    category: 'Laptops',
    description: 'Feather-light aluminum laptop purpose-built for browser tasks and cloud computing layouts.',
    price: 429,
    emoji: '⌨️',
    inStock: true,
  },

  // === TABLETS ===
  {
    id: 'prod-5',
    name: 'TabVivid Slate',
    category: 'Tablets',
    description: 'Crisp 11-inch cinematic tablet screen designed for digital artists and streaming entertainment.',
    price: 499,
    emoji: '📟',
    inStock: true,
  },
  {
    id: 'prod-15',
    name: 'NotePad E-Ink Pro',
    category: 'Tablets',
    description: 'Paper-like digital notepad built to prevent eye strain during writing and textbook reading.',
    price: 379,
    emoji: '📝',
    inStock: true,
  },
  {
    id: 'prod-16',
    name: 'TabMini Pocket',
    category: 'Tablets',
    description: 'Compact 8-inch tablet easily gripped in a single hand, built for tracking recipes and travel.',
    price: 299,
    emoji: '📖',
    inStock: true,
  },

  // === SPEAKERS ===
  {
    id: 'prod-6',
    name: 'BoomBox Aura',
    category: 'Speakers',
    description: '360-degree room-filling portable wireless speaker featuring ambient pulsing light syncing.',
    price: 189,
    emoji: '🔊',
    inStock: true,
  },
  {
    id: 'prod-17',
    name: 'SoundBar Horizon',
    category: 'Speakers',
    description: 'Multi-channel slim home theater bar featuring immersive surround sound technologies.',
    price: 299,
    emoji: '📻',
    inStock: true,
  },
  {
    id: 'prod-18',
    name: 'EchoMini Smart Pod',
    category: 'Speakers',
    description: 'Voice-controlled compact home speaker integrating personal smart assistants and device hubs.',
    price: 49,
    emoji: '📢',
    inStock: true,
  }
];

// Quick localized mapping helper if an emoji layout needs checking
PRODUCTS[4].emoji = '📟'; // Tablet alternative device icon for reliable rendering