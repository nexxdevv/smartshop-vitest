import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  // Extract unique categories for catalog rendering blocks
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Hero Headline Intro */}
      <div className="text-center sm:text-left mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Next-Gen Electronics Shop
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Discover high-performance gadgets optimized for your digital workflow.
        </p>
      </div>

      {/* Structured Category Feeds */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryProducts = PRODUCTS.filter((p) => p.category === category);

          return (
            <section key={category} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-5 flex items-center">
                <span className="mr-2 rounded-lg bg-indigo-50 px-2.5 py-1 text-sm text-indigo-600">
                  📦
                </span>
                {category}
              </h2>

              {/* Grid System: Mobile (1 Col) -> Tablet (2 Col) -> Desktop (3 Col) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}