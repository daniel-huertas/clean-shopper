import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { placeholderProducts } from './placeholder-products';

export default function BrowsePage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="px-space-3xl py-space-2xl">
      <header className="mb-space-xl max-w-6xl mx-auto">
        <h1 className="text-h1 text-neutral-900">Browse products</h1>
        <p className="text-body text-neutral-600 mt-space-sm">
          Explore clean alternatives across personal care, home cleaning, and baby care.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-xl max-w-6xl mx-auto">
        {placeholderProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={product.category}
            description={product.description}
            safetyRating={product.safetyRating}
            isSaved={savedIds.has(product.id)}
            onToggleSave={() => toggleSaved(product.id)}
          />
        ))}
      </div>
    </main>
  );
}
