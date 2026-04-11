import { useState } from 'react';
import Button from '../../components/Button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for a product...',
  isLoading = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit();
  };

  const containerClasses = [
    'flex items-center gap-space-sm bg-secondary rounded-radius-lg shadow-shadow-sm p-space-sm transition-shadow',
    isFocused ? 'ring-2 ring-accent' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <span className="text-neutral-400 ml-space-sm flex items-center">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={isLoading ? 'Researching...' : placeholder}
        disabled={isLoading}
        className="flex-1 bg-transparent text-body text-neutral-900 placeholder:text-neutral-400 outline-none px-space-sm py-space-sm disabled:cursor-not-allowed"
        aria-label="Search products"
      />
      <Button
        label="Search"
        onClick={handleSubmit}
        variant="primary"
        size="sm"
        isLoading={isLoading}
        disabled={!value.trim()}
      />
    </div>
  );
}
