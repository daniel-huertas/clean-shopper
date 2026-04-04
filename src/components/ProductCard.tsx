import type { SafetyRating } from '../types/product';
import SafetyBadge from './SafetyBadge';
import CategoryTag from './CategoryTag';

interface ProductCardProps {
  name: string;
  safetyRating: SafetyRating;
  category: string;
  description: string;
  onClick?: () => void;
  isLoading?: boolean;
}

function ProductCardSkeleton() {
  return (
    <div className="bg-secondary rounded-radius-lg shadow-shadow-sm p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="bg-neutral-200 animate-pulse rounded-radius-sm h-5 w-24" />
        <div className="bg-neutral-200 animate-pulse rounded-radius-full h-6 w-16" />
      </div>
      <div className="bg-neutral-200 animate-pulse rounded-radius-md h-7 w-3/4" />
      <div className="flex flex-col gap-space-xs">
        <div className="bg-neutral-200 animate-pulse rounded-radius-md h-5 w-full" />
        <div className="bg-neutral-200 animate-pulse rounded-radius-md h-5 w-2/3" />
      </div>
    </div>
  );
}

export default function ProductCard({
  name,
  safetyRating,
  category,
  description,
  onClick,
  isLoading = false,
}: ProductCardProps) {
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const isClickable = Boolean(onClick);

  return (
    <div
      className={`bg-secondary rounded-radius-lg shadow-shadow-sm p-space-lg flex flex-col gap-space-md transition-shadow ${
        isClickable ? 'cursor-pointer hover:shadow-shadow-md active:shadow-shadow-sm' : ''
      }`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between gap-space-sm">
        <CategoryTag label={category} />
        <SafetyBadge rating={safetyRating} />
      </div>

      <h3 className="text-h3 text-neutral-900">
        {name}
      </h3>

      <p className="text-body text-neutral-600 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
