'use client';

import { Product } from '@/data/products';
import { useShop } from '@/context/ShopContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
    });
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Category Tag & Stock Status Indicators */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {product.category}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            product.inStock
              ? 'bg-green-50 text-green-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Visual Fallback Emoji Center */}
      <div className="my-4 flex h-36 items-center justify-center rounded-xl bg-gray-50 text-6xl">
        {product.emoji}
      </div>

      {/* Meta Specs Context Block */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Pricing & Cart Action Block */}
        <div className="mt-4 flex items-center justify-between pt-2">
          <span className="text-xl font-extrabold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              product.inStock
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}