export type NavPage = 'home' | 'search' | 'library' | 'cart' | 'preferences';

interface NavBarProps {
  activePage: NavPage;
  onNavigate?: (page: NavPage) => void;
}

const navLinks: { page: NavPage; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'search', label: 'Search' },
  { page: 'library', label: 'Library' },
  { page: 'cart', label: 'Cart' },
  { page: 'preferences', label: 'Prefs' },
];

export default function NavBar({ activePage, onNavigate }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between px-space-3xl py-space-md bg-neutral-50 border-b border-neutral-200">
      <span className="text-h4 text-neutral-900 font-semibold">
        Clean Shopper
      </span>

      <div className="flex items-center gap-space-xl">
        {navLinks.map(({ page, label }) => {
          const isActive = page === activePage;
          return (
            <button
              key={page}
              onClick={() => onNavigate?.(page)}
              className={
                isActive
                  ? 'text-small text-neutral-900 font-semibold border-b-2 border-accent pb-space-xs cursor-pointer'
                  : 'text-small text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
              }
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
