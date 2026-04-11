import NavBar from './components/NavBar';
import BrowsePage from './features/browse/BrowsePage';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage="home" onNavigate={(page) => console.log('Navigate to:', page)} />
      <BrowsePage />
    </div>
  );
}

export default App;
