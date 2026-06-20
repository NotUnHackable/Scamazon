import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import categories from '../data/categories';
import products from '../data/products';
import promos from '../data/promos';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const displayProducts = filteredProducts.slice(0, 12);

  // Carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + promos.length) % promos.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % promos.length);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                className={`w-full shrink-0 bg-gradient-to-r ${promo.bgColor} relative`}
              >
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex items-center">
                  <div className="text-white z-10 max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                      {promo.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-gray-200">
                      {promo.subtitle}
                    </p>
                    <Link
                      to={promo.link}
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-30 md:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="card p-4 text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full aspect-square object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h3 className="font-medium text-sm text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.productCount} products</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Deals Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
            <Link to="/search" className="text-sm text-blue-600 hover:underline">
              See all deals
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {products.filter(p => p.originalPrice > p.price).slice(0, 8).map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="shrink-0 w-48 group"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <p className="text-red-600 font-bold text-sm">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </p>
                <p className="text-sm text-gray-900 line-clamp-2">{product.name}</p>
                <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <Link to="/search" className="text-sm text-blue-600 hover:underline">
              See all best sellers
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...products].sort((a, b) => b.numReviews - a.numReviews).slice(0, 8).map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="shrink-0 w-48 group relative"
              >
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  #{index + 1}
                </div>
                <div className="aspect-square overflow-hidden rounded-lg mb-2 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-gray-900 line-clamp-2">{product.name}</p>
                <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex text-yellow-400 text-xs">
                    {'★'.repeat(Math.floor(product.rating))}{product.rating % 1 >= 0.5 ? '½' : ''}
                  </div>
                  <span className="text-xs text-gray-500">{product.numReviews.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory || 'Recommended for You'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200 border'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bottom Sign In Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="card p-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            See personalized recommendations
          </p>
          <Link
            to="/signin"
            className="inline-block btn-cart max-w-xs text-center"
          >
            Sign in securely
          </Link>
        </div>
      </div>
    </div>
  );
}
