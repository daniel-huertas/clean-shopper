import { useState } from 'react';
import NavBar, { type NavPage } from './components/NavBar';
import BrowsePage from './features/browse/BrowsePage';
import SearchPage from './features/search/SearchPage';

function App() {
  const [activePage, setActivePage] = useState<NavPage>('home');

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'home' && <BrowsePage />}
      {activePage === 'search' && <SearchPage />}
      {activePage !== 'home' && activePage !== 'search' && (
        <main className="px-space-3xl py-space-2xl">
          <div className="max-w-6xl mx-auto text-center mt-space-2xl">
            <p className="text-h3 text-neutral-900">Coming soon</p>
            <p className="text-body text-neutral-600 mt-space-sm">
              This section is not yet built.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
