import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import SearchBar from './SearchBar';
import { searchProducts, type Product } from '../../lib/api/products';

const SKELETON_COUNT = 3;

type Status = 'idle' | 'searching' | 'results' | 'empty' | 'error';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

  const handleSubmit = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setStatus('searching');
    setError(null);
    setSubmittedQuery(trimmed);

    try {
      const rows = await searchProducts(trimmed);
      setResults(rows);
      setStatus(rows.length === 0 ? 'empty' : 'results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

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
        <h1 className="text-h1 text-neutral-900">Search products</h1>
        <p className="text-body text-neutral-600 mt-space-sm">
          Find clean alternatives by name, brand, or keyword.
        </p>
      </header>

      <div className="max-w-6xl mx-auto mb-space-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSubmit}
          isLoading={status === 'searching'}
        />
      </div>

      {status === 'idle' && (
        <div className="max-w-6xl mx-auto text-center mt-space-2xl">
          <p className="text-body text-neutral-600">
            Type a product name, brand, or keyword above and press Enter to search.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-6xl mx-auto mb-space-xl p-space-lg rounded-radius-lg bg-error/10 border border-error">
          <p className="text-body text-error font-semibold">Search failed</p>
          <p className="text-small text-neutral-600 mt-space-xs">{error}</p>
        </div>
      )}

      {status === 'empty' && (
        <div className="max-w-6xl mx-auto text-center mt-space-2xl">
          <p className="text-h3 text-neutral-900">No products found</p>
          <p className="text-body text-neutral-600 mt-space-sm">
            No matches for &ldquo;{submittedQuery}&rdquo;. Try a different keyword or check for typos.
          </p>
        </div>
      )}

      {(status === 'searching' || status === 'results') && (
        <div className="max-w-6xl mx-auto">
          {status === 'results' && (
            <p className="text-small text-neutral-600 mb-space-md">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;
              {submittedQuery}&rdquo;
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-xl">
            {status === 'searching'
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
              : results.map((product) => (
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
        </div>
      )}
    </main>
  );
}
