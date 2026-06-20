import { useState, createContext, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, X } from 'lucide-react';

const CompareContext = createContext();

export function useCompare() {
  return useContext(CompareContext);
}

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);

  const toggleCompare = (product) => {
    setCompareItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  const isComparing = (id) => compareItems.some(p => p.id === id);

  const clearCompare = () => setCompareItems([]);

  const removeFromCompare = (id) => setCompareItems(prev => prev.filter(p => p.id !== id));

  return (
    <CompareContext.Provider value={{ compareItems, toggleCompare, isComparing, clearCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function CompareBar() {
  const { compareItems, clearCompare, removeFromCompare } = useCompare();
  const navigate = useNavigate();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-4 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-4 animate-slide-in max-w-2xl w-[calc(100%-2rem)]">
      <div className="flex items-center gap-2 shrink-0">
        <BarChart3 size={18} className="text-orange-400" />
        <span className="text-sm font-medium">{compareItems.length}/4</span>
      </div>

      <div className="flex items-center gap-2 flex-1 overflow-x-auto">
        {compareItems.map(p => (
          <div key={p.id} className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5 shrink-0">
            <img src={p.image} alt="" className="w-8 h-8 rounded object-cover" />
            <span className="text-xs max-w-[100px] truncate">{p.name}</span>
            <button onClick={() => removeFromCompare(p.id)} className="text-gray-400 hover:text-white">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 shrink-0">
        <button onClick={clearCompare} className="text-xs text-gray-400 hover:text-white">
          Clear
        </button>
        <button
          onClick={() => navigate(`/compare?ids=${compareItems.map(p => p.id).join(',')}`)}
          disabled={compareItems.length < 2}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            compareItems.length >= 2
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Compare ({compareItems.length})
        </button>
      </div>
    </div>
  );
}
