import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import categories from '../data/categories';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 to $50', min: 25, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: '$100 to $200', min: 100, max: 200 },
  { label: '$200 to $500', min: 200, max: 500 },
  { label: '$500 & above', min: 500, max: Infinity },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const [sort, setSort] = useState('featured');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    }

    // Price range filter
    if (selectedPriceRange) {
      result = result.filter(p => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max);
    }

    // Prime only
    if (primeOnly) {
      result = result.filter(p => p.prime);
    }

    // In stock only
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.numReviews - a.numReviews);
        break;
      default:
        break;
    }

    return result;
  }, [query, categoryParam, sort, selectedPriceRange, primeOnly, inStockOnly]);

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setPrimeOnly(false);
    setInStockOnly(false);
    setSort('featured');
  };

  const hasActiveFilters = selectedPriceRange || primeOnly || inStockOnly;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">
            {categoryParam || `Results for "${query}"`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary w-full mb-4 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category */}
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/search?category=${encodeURIComponent(cat.name)}${query ? `&q=${query}` : ''}`}
                      className={`block text-sm py-1 hover:text-orange-600 ${
                        categoryParam === cat.name ? 'text-orange-600 font-bold' : 'text-gray-700'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(selectedPriceRange === range ? null : range)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prime & Stock */}
              <div className="card p-4">
                <h3 className="font-bold text-gray-900 mb-3">Other Filters</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={primeOnly}
                      onChange={(e) => setPrimeOnly(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      <span className="font-bold text-blue-600">prime</span> Delivery
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <span className="text-sm text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  <X size={14} /> Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="card p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {categoryParam || (query ? `Results for "${query}"` : 'All Products')}
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} results
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-blue-600 hover:underline ml-2">
                      Clear filters
                    </button>
                  )}
                </p>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} showCompare />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
