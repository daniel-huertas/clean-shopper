import { supabase } from '../supabase';
import type { SafetyLevel } from '../../types/product';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  safetyScore: number;
  safetyLevel: SafetyLevel;
}

/**
 * Fetches products from the Supabase products table.
 *
 * Only returns rows that have both safety_score and safety_level populated —
 * unrated products are filtered out until the app has a UI pattern for them.
 * No explicit ordering — display order is the caller's concern (e.g. the
 * Browse page shuffles for visual variety).
 */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, category, description, safety_score, safety_level')
    .not('safety_score', 'is', null)
    .not('safety_level', 'is', null);

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return (data ?? []).map(mapRow);
}

/**
 * Searches products by free-text query. Matches rows where every whitespace-
 * separated token in the query appears (case-insensitive, substring) in at
 * least one of: name, brand, or description.
 *
 * Examples:
 *   "soap"           → matches "Castile Soap", "Dish Soap", "Baby Wash" (no)
 *   "dr bronner"     → matches "Dr. Bronner's — Pure-Castile..." (both tokens present)
 *   "  "             → returns [] without hitting the network
 *
 * Results are ordered by safety_score descending so the cleanest hits show first.
 * Returns [] for empty/whitespace-only queries.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  // Split on whitespace and strip PostgREST filter-breaking characters
  // (comma, period, parens, asterisk) from each token. Everything else —
  // including apostrophes and hyphens — passes through.
  const tokens = query
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/[,().*]/g, ''))
    .filter((t) => t.length > 0);

  if (tokens.length === 0) return [];

  let q = supabase
    .from('products')
    .select('id, name, brand, category, description, safety_score, safety_level')
    .not('safety_score', 'is', null)
    .not('safety_level', 'is', null)
    .order('safety_score', { ascending: false });

  // Each .or() adds an OR group that is ANDed with the rest, giving us
  // per-token matching: (name|brand|desc contains token1) AND (… contains token2) …
  for (const token of tokens) {
    const pattern = `%${token}%`;
    q = q.or(`name.ilike.${pattern},brand.ilike.${pattern},description.ilike.${pattern}`);
  }

  const { data, error } = await q;
  if (error) {
    throw new Error(`Search failed: ${error.message}`);
  }

  return (data ?? []).map(mapRow);
}

function mapRow(row: {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  safety_score: number | null;
  safety_level: string | null;
}): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    description: row.description,
    safetyScore: row.safety_score as number,
    safetyLevel: row.safety_level as SafetyLevel,
  };
}
