interface CategoryTagProps {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
  active?: boolean;
}

export default function CategoryTag({
  label,
  removable = false,
  onRemove,
  active = false,
}: CategoryTagProps) {
  const baseClasses = 'inline-flex items-center text-micro font-semibold px-space-sm py-space-xs rounded-radius-sm uppercase tracking-wide';
  const colorClasses = active
    ? 'bg-primary text-white'
    : 'bg-neutral-200 text-neutral-600';

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {label}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-space-xs text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label={`Remove ${label}`}
        >
          &times;
        </button>
      )}
    </span>
  );
}
