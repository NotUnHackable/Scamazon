import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useCartStore } from '../store/useStore';
import { useToast } from './Toast';
import { useCompare } from './CompareBar';
import { Check, BarChart3 } from 'lucide-react';

export default function ProductCard({ product, showCompare = false }) {
  const addItem = useCartStore(s => s.addItem);
  const toast = useToast();
  const { toggleCompare, isComparing } = useCompare();

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast(`Added "${product.name.slice(0, 30)}..." to cart`);
  };

  return (
    <div className="card p-4 flex flex-col h-full group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 mb-1 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-gray-500">{product.numReviews.toLocaleString()}</span>
        </div>

        {product.prime && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-bold text-blue-600">prime</span>
            <span className="text-xs text-gray-500">FREE Delivery</span>
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-2">
          {discount > 0 && (
            <span className="text-xs text-red-600 font-medium">-{discount}%</span>
          )}
          <span className="text-xs text-gray-500 align-top">$</span>
          <span className="text-xl font-bold text-gray-900">
            {Math.floor(product.price)}
          </span>
          <span className="text-xs text-gray-500 align-top">
            {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
          </span>
        </div>

        {product.originalPrice > product.price && (
          <p className="text-xs text-gray-500 mb-2">
            List Price: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
          </p>
        )}

        {product.inStock && (
          <div className="flex items-center gap-1 mb-3">
            <Check size={14} className="text-green-600" />
            <span className="text-xs text-green-600">In Stock</span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="btn-cart text-sm mt-auto"
        >
          Add to Cart
        </button>

        {/* Compare Toggle */}
        {showCompare && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product);
              toast(isComparing(product.id) ? 'Removed from compare' : 'Added to compare');
            }}
            className={`w-full mt-2 py-1.5 rounded-full text-xs font-medium border flex items-center justify-center gap-1 transition-colors ${
              isComparing(product.id)
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <BarChart3 size={12} /> {isComparing(product.id) ? 'Comparing' : 'Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
