import NavBar from './components/NavBar';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage="home" onNavigate={(page) => console.log('Navigate to:', page)} />
      <div className="p-space-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl max-w-6xl">
        <ProductCard
          name="Dr. Bronner's Pure Castile Soap"
          safetyRating={{ score: 92, level: 'clean' }}
          category="Personal Care"
          description="Organic, fair trade, no synthetic preservatives or detergents."
          onClick={() => console.log('Card clicked')}
        />
        <ProductCard
          name="AquaFresh Multi-Action Toothpaste"
          safetyRating={{ score: 54, level: 'caution' }}
          category="Oral Care"
          description="Contains sodium lauryl sulfate and artificial sweeteners. Some ingredients flagged for moderate irritation risk."
        />
        <ProductCard
          name="UltraClean Heavy Duty Degreaser"
          safetyRating={{ score: 18, level: 'avoid' }}
          category="Household"
          description="High concentration of 2-butoxyethanol and ammonia compounds. Multiple ingredients rated as high hazard."
        />
        <ProductCard
          name=""
          safetyRating={{ score: 0, level: 'clean' }}
          category=""
          description=""
          isLoading
        />
        </div>
      </div>
    </div>
  );
}

export default App;
