export type SafetyLevel = 'clean' | 'caution' | 'avoid';

export interface SafetyRating {
  score: number;
  level: SafetyLevel;
}
