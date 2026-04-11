import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-space-md py-space-xs text-small',
  md: 'px-space-lg py-space-sm text-body',
  lg: 'px-space-xl py-space-md text-body',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-light active:bg-primary-dark disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed',
  secondary:
    'bg-secondary text-neutral-900 border border-neutral-200 hover:bg-neutral-200 active:bg-neutral-200 active:border-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200 disabled:cursor-not-allowed',
  destructive:
    'bg-error text-white hover:bg-error/90 active:bg-error/80 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed',
};

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const base =
    'inline-flex items-center justify-center font-semibold rounded-radius-md transition-all cursor-pointer gap-space-sm';
  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${width}`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
