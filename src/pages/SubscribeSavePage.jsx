import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, DollarSign, Check, ArrowRight, Tag, Clock, Percent } from 'lucide-react';
import { useToast } from '../components/Toast';
import products from '../data/products';

const categories = [
  { name: "Electronics", discount: "Up to 15% off" },
  { name: "Books", discount: "Up to 20% off" },
  { name: "Home & Kitchen", discount: "Up to 10% off" },
  { name: "Beauty", discount: "Up to 12% off" },
  { name: "Pet Supplies", discount: "Up to 18% off" },
];

export default function SubscribeSavePage() {
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [frequency, setFrequency] = useState('monthly');
  const toast = useToast();

  const subscribeProducts = products.slice(0, 8);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Percent size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">Subscribe & Save</h1>
          </div>
          <p className="text-lg text-emerald-100 mb-6 max-w-2xl">
            Save up to 20% on everyday essentials with automatic deliveries. Cancel anytime — no commitment required.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
              <Check size={18} /> <span className="text-sm">Up to 20% savings</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
              <Clock size={18} /> <span className="text-sm">Flexible scheduling</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
              <ArrowRight size={18} /> <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Subscribe & Save</span>
        </div>

        {/* How It Works */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Subscribe & Save Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Choose your products", desc: "Pick from thousands of eligible items" },
              { step: 2, title: "Select your schedule", desc: "Deliver every 2 weeks, monthly, or every 6 months" },
              { step: 3, title: "Save automatically", desc: "Get 5% off (or up to 20% with 5+ subscriptions)" },
              { step: 4, title: "Manage easily", desc: "Skip, cancel, or change anytime from your account" },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Potential Savings</h3>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to 5+ products from the same category and save up to 20% on every delivery.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">$120</p>
                  <p className="text-xs text-gray-500">Average yearly savings</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-600">20%</p>
                  <p className="text-xs text-gray-500">Maximum discount</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-2">Savings Tier</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">1-4 items</span>
                  <span className="font-bold">5% off</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-600">5+ items (same category)</span>
                  <span className="font-bold text-emerald-600">Up to 20% off</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Selection */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Delivery Frequency:</h2>
          <div className="flex gap-2">
            {[
              { value: 'biweekly', label: 'Every 2 weeks' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'bimonthly', label: 'Every 2 months' },
              { value: 'quarterly', label: 'Every 3 months' },
              { value: 'semiannual', label: 'Every 6 months' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setFrequency(opt.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  frequency === opt.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border'
              }`}
            >
              {cat.name} — {cat.discount}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {subscribeProducts.map(product => (
            <div key={product.id} className="card p-4">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
              </Link>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 mb-1">{product.name}</h3>
              </Link>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">${(product.price * 0.9).toFixed(2)}</span>
                <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="text-xs text-emerald-600 font-bold">-10%</span>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 mb-3 text-center">
                <p className="text-xs text-emerald-700 font-medium">Subscribe & Save: ${(product.price * 0.85).toFixed(2)}/mo</p>
              </div>
              <button
                onClick={() => toast(`Subscribed to "${product.name.slice(0, 25)}..."`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-full transition-colors text-sm"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
