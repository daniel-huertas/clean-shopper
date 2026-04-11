import type { SafetyRating } from '../../types/product';

export interface PlaceholderProduct {
  id: string;
  name: string;
  category: 'Personal Care' | 'Home Cleaning' | 'Baby Care';
  description: string;
  safetyRating: SafetyRating;
}

export const placeholderProducts: PlaceholderProduct[] = [
  {
    id: 'pc-1',
    name: "Dr. Bronner's Pure Castile Soap",
    category: 'Personal Care',
    description: 'Organic, fair trade, no synthetic preservatives or detergents.',
    safetyRating: { score: 92, level: 'clean' },
  },
  {
    id: 'pc-2',
    name: 'AquaFresh Multi-Action Toothpaste',
    category: 'Personal Care',
    description: 'Contains sodium lauryl sulfate and artificial sweeteners. Some ingredients flagged for moderate irritation risk.',
    safetyRating: { score: 54, level: 'caution' },
  },
  {
    id: 'hc-1',
    name: 'Seventh Generation All-Purpose Cleaner',
    category: 'Home Cleaning',
    description: 'Plant-based formula, no chlorine, ammonia, or synthetic fragrances. EPA Safer Choice certified.',
    safetyRating: { score: 88, level: 'clean' },
  },
  {
    id: 'hc-2',
    name: 'UltraClean Heavy Duty Degreaser',
    category: 'Home Cleaning',
    description: 'High concentration of 2-butoxyethanol and ammonia compounds. Multiple ingredients rated as high hazard.',
    safetyRating: { score: 18, level: 'avoid' },
  },
  {
    id: 'bc-1',
    name: 'Babyganics Fragrance-Free Baby Wash',
    category: 'Baby Care',
    description: 'Tear-free, plant-derived cleansers, no sulfates, parabens, or synthetic fragrances.',
    safetyRating: { score: 90, level: 'clean' },
  },
  {
    id: 'bc-2',
    name: 'SoftTouch Scented Baby Lotion',
    category: 'Baby Care',
    description: 'Contains synthetic fragrance blend and methylisothiazolinone preservative. Flagged for potential skin sensitization.',
    safetyRating: { score: 48, level: 'caution' },
  },
];
