import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { fetchProducts, type Product } from '../../lib/api/products';

const SKELETON_COUNT = 6;

/**
 * Reorders products so that caution/avoid cards are distributed evenly
 * through the grid instead of clustering at the bottom (or at the top).
 * Each "non-clean" product is placed at a position calculated to spread
 * them uniformly, with clean products filling the remaining slots.
 * Order within each band is randomized so reloads vary.
 */
function interleaveByBand(products: Product[]): Product[] {
  const shuffle = <T,>(arr: T[]): T[] => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const cleans = shuffle(products.filter((p) => p.safetyLevel === 'clean'));
  const nonCleans = shuffle(products.filter((p) => p.safetyLevel !== 'clean'));

  if (nonCleans.length === 0) return cleans;

  const total = products.length;
  const targetPositions = new Set<number>();
  for (let i = 0; i < nonCleans.length; i++) {
    targetPositions.add(Math.floor(((i + 0.5) * total) / nonCleans.length));
  }

  const result: Product[] = [];
  let nonCleanIdx = 0;
  let cleanIdx = 0;
  for (let i = 0; i < total; i++) {
    if (targetPositions.has(i) && nonCleanIdx < nonCleans.length) {
      result.push(nonCleans[nonCleanIdx++]);
    } else if (cleanIdx < cleans.length) {
      result.push(cleans[cleanIdx++]);
    } else if (nonCleanIdx < nonCleans.length) {
      result.push(nonCleans[nonCleanIdx++]);
    }
  }
  return result;
}

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (cancelled) return;
        setProducts(interleaveByBand(data));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSaved = (id: number) => {
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
          Explore clean alternatives across personal care, home cleaning, baby care, and the kitchen.
        </p>
      </header>

      {error && (
        <div className="max-w-6xl mx-auto mb-space-xl p-space-lg rounded-radius-lg bg-error/10 border border-error">
          <p className="text-body text-error font-semibold">Failed to load products</p>
          <p className="text-small text-neutral-600 mt-space-xs">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-xl max-w-6xl mx-auto">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCard
                key={`skeleton-${i}`}
                name=""
                safetyRating={{ score: 0, level: 'clean' }}
                category=""
                description=""
                isLoading
              />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                name={`${product.brand} — ${product.name}`}
                category={product.category}
                description={product.description}
                safetyRating={{ score: product.safetyScore, level: product.safetyLevel }}
                isSaved={savedIds.has(product.id)}
                onToggleSave={() => toggleSaved(product.id)}
              />
            ))}
      </div>

      {!isLoading && !error && products.length === 0 && (
        <div className="max-w-6xl mx-auto mt-space-xl text-center">
          <p className="text-body text-neutral-600">No products found.</p>
        </div>
      )}
    </main>
  );
}
