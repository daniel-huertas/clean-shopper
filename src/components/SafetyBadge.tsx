import type { SafetyRating, SafetyLevel } from '../types/product';

const safetyConfig: Record<SafetyLevel, { label: string; className: string }> = {
  clean: {
    label: 'Clean',
    className: 'bg-success text-primary-dark',
  },
  caution: {
    label: 'Caution',
    className: 'bg-warning text-primary-dark',
  },
  avoid: {
    label: 'Avoid',
    className: 'bg-error text-white',
  },
};

interface SafetyBadgeProps {
  rating: SafetyRating;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'text-micro font-semibold px-space-sm py-space-xs rounded-radius-full',
  md: 'text-small font-semibold px-space-md py-space-xs rounded-radius-full',
};

export default function SafetyBadge({ rating, size = 'md' }: SafetyBadgeProps) {
  const safety = safetyConfig[rating.level];

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} ${safety.className}`}>
      {rating.score} &middot; {safety.label}
    </span>
  );
}
