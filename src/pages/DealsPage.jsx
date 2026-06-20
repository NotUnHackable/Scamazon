import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Flame, Tag, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CountdownTimer from '../components/CountdownTimer';
import products from '../data/products';

const filterTabs = [
  { id: 'all', label: 'All Deals' },
  { id: '20', label: '20% Off or More' },
  { id: '30', label: '30% Off or More' },
  { id: '50', label: '50% Off or More' },
];

export default function DealsPage() {
  const [filter, setFilter] = useState('all');

  const deals = useMemo(() => {
    return products
      .filter(p => p.originalPrice > p.price)
      .map(p => ({
        ...p,
        discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100),
      }))
      .sort((a, b) => b.discount - a.discount);
  }, []);

  const filteredDeals = useMemo(() => {
    if (filter === 'all') return deals;
    const minDiscount = parseInt(filter);
    return deals.filter(d => d.discount >= minDiscount);
  }, [deals, filter]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flame size={32} />
                <h1 className="text-3xl md:text-4xl font-bold">Today's Deals</h1>
              </div>
              <p className="text-lg text-red-100 mb-4">
                Save big on thousands of items. Limited time offers — don't miss out!
              </p>
              <div className="flex items-center gap-2 text-sm text-red-100">
                <Clock size={16} />
                <span>Deals refreshed daily</span>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-sm text-red-100 mb-2 text-center">Flash deals end in</p>
              <CountdownTimer targetDate={new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Today's Deals</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border'
              }`}
            >
              <Tag size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {filteredDeals.length} deals available
        </p>

        {/* Deals Grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredDeals.map(product => (
              <div key={product.id} className="relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}% off
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Tag size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No deals in this range</h2>
            <p className="text-gray-600 mb-4">Try selecting a different discount range.</p>
            <button onClick={() => setFilter('all')} className="btn-primary">
              View All Deals
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
