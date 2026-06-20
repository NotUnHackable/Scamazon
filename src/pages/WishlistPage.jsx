import { Link } from 'react-router-dom';
import { ChevronRight, Trash2, ShoppingCart } from 'lucide-react';
import StarRating from '../components/StarRating';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useStore';
import { useToast } from '../components/Toast';

export default function WishlistPage() {
  const items = useWishlistStore(s => s.items);
  const removeItem = useWishlistStore(s => s.removeItem);
  const addItem = useCartStore(s => s.addItem);
  const toast = useToast();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Your Wishlist</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="card p-4">
              <h2 className="font-bold text-gray-900 mb-4">Your Lists</h2>
              <nav className="space-y-2">
                <Link to="/wishlist" className="block text-sm font-medium text-orange-600">Wishlist ({items.length})</Link>
                <Link to="/orders" className="block text-sm text-gray-700 hover:text-orange-600">Your Orders</Link>
                <Link to="/" className="block text-sm text-gray-700 hover:text-orange-600">Your Account</Link>
              </nav>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="lg:col-span-9">
            <div className="card p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Wishlist ({items.length} items)</h1>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                  <p className="text-gray-600 mb-6">Save items you like to your wishlist and come back to them anytime.</p>
                  <Link to="/" className="btn-primary inline-block">Discover Products</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {items.map(product => (
                    <div key={product.id} className="card p-4 relative">
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors z-10"
                      >
                        <Trash2 size={14} className="text-gray-500 hover:text-red-500" />
                      </button>

                      <Link to={`/product/${product.id}`} className="block">
                        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
                      </Link>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 mb-1">{product.name}</h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={product.rating} size={12} />
                        <span className="text-xs text-gray-500">{product.numReviews.toLocaleString()}</span>
                      </div>

                      <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>

                      <button
                        onClick={() => {
                          addItem(product);
                          toast(`Added to cart`);
                        }}
                        className="btn-cart text-sm flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
