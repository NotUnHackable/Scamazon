import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, Truck, Shield, ChevronRight, Heart, Share2 } from 'lucide-react';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import CountdownTimer from '../components/CountdownTimer';
import NotifyMe from '../components/NotifyMe';
import ImageZoom from '../components/ImageZoom';
import { useToast } from '../components/Toast';
import { useRecentlyViewed } from '../components/useRecentlyViewed';
import { useCartStore } from '../store/useStore';
import { useWishlistStore } from '../store/useWishlistStore';
import products from '../data/products';

// Variant data for select products
const variantData = {
  colors: {
    'Electronics': ['Black', 'White', 'Silver', 'Blue', 'Rose Gold'],
    'Fashion': ['Black', 'White', 'Navy', 'Gray', 'Red'],
    'Home & Kitchen': ['Black', 'White', 'Stainless Steel', 'Red', 'Blue'],
  },
  sizes: {
    'Fashion': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    'Sports & Outdoors': ['S', 'M', 'L', 'XL'],
  }
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(s => s.addItem);
  const toast = useToast();
  const { addRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  const toggleWishlist = useWishlistStore(s => s.toggleItem);
  const wishlistItems = useWishlistStore(s => s.items);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      const colors = variantData.colors[product.category];
      if (colors) setSelectedColor(colors[0]);
      const sizes = variantData.sizes[product.category];
      if (sizes) setSelectedSize(sizes[0]);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary inline-block">Go back to homepage</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isInWishlist = wishlistItems.some(i => i.id === product.id);
  const hasVariants = variantData.colors[product.category] || variantData.sizes[product.category];
  const colors = variantData.colors[product.category] || [];
  const sizes = variantData.sizes[product.category] || [];

  // Flash sale target: 4 hours from now
  const flashSaleEnd = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    toast(`Added ${quantity}x "${product.name.slice(0, 30)}..." to cart`);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/search?category=${encodeURIComponent(product.category)}`} className="hover:text-orange-600">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-700 truncate">{product.name}</span>
        </div>
      </div>

      {/* Flash Sale Banner (for discounted products) */}
      {discount > 20 && (
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">⚡ Flash Sale</span>
              <span className="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">-{discount}% OFF</span>
            </div>
            <CountdownTimer targetDate={flashSaleEnd} compact />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-4">
              <div className="border rounded-lg overflow-hidden bg-gray-50 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <ImageZoom src={product.image} alt={product.name} />
              </div>
              {/* Thumbnail gallery */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 border-2 rounded-lg overflow-hidden bg-gray-50 cursor-pointer hover:border-orange-400 transition-colors">
                    <img
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4">
            <h1 className="text-xl font-medium text-gray-900 mb-2 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">{product.brand}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <Link to="#reviews" className="text-sm text-blue-600 hover:underline">
                {product.numReviews.toLocaleString()} ratings
              </Link>
            </div>

            <hr className="my-4" />

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                {discount > 0 && (
                  <span className="text-sm text-red-600 font-medium">-{discount}%</span>
                )}
                <span className="text-sm text-gray-500 align-top">$</span>
                <span className="text-3xl font-bold text-gray-900">
                  {Math.floor(product.price)}
                </span>
                <span className="text-sm text-gray-500 align-top">
                  {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
                </span>
              </div>
              {product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 mt-1">
                  List Price: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                </p>
              )}
            </div>

            {product.prime && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-blue-600">prime</span>
                <span className="text-sm text-gray-600">FREE delivery</span>
                <Truck size={16} className="text-gray-600" />
              </div>
            )}

            {product.inStock ? (
              <div className="flex items-center gap-1 mb-4">
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-sm text-red-600 font-medium mb-2">Out of Stock</p>
                <NotifyMe productName={product.name} />
              </div>
            )}

            {/* Color Variant */}
            {colors.length > 0 && (
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">
                  Color: <span className="font-medium">{selectedColor}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 rounded-full text-sm border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variant */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <label className="text-sm text-gray-700 mb-2 block">
                  Size: <span className="font-medium">{selectedSize}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 rounded-lg text-sm border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm text-gray-700 mb-2 block">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {product.inStock && (
                <>
                  <button onClick={handleAddToCart} className="btn-cart">
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition-colors"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {addedToCart && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-700">Added to cart!</span>
                <Link to="/cart" className="text-sm text-blue-600 hover:underline ml-auto">
                  View Cart
                </Link>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 text-sm text-gray-600">
              <button
                onClick={() => {
                  toggleWishlist(product);
                  toast(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                className={`flex items-center gap-1 transition-colors ${isInWishlist ? 'text-red-500' : 'hover:text-red-500'}`}
              >
                <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} /> {isInWishlist ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast('Link copied to clipboard');
                }}
                className="flex items-center gap-1 hover:text-orange-600"
              >
                <Share2 size={16} /> Share
              </button>
              <Link to="/wishlist" className="flex items-center gap-1 hover:text-orange-600">
                View Wishlist
              </Link>
            </div>

            <hr className="my-6" />

            {/* Delivery & Returns */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">FREE Delivery</p>
                  <p className="text-xs text-gray-500">
                    Get it by {new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features & Specs */}
          <div className="lg:col-span-3">
            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">About this item</h3>
              <ul className="space-y-2">
                {(showAllFeatures ? product.features : product.features.slice(0, 4)).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {product.features.length > 4 && (
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-sm text-blue-600 hover:underline mt-2"
                >
                  {showAllFeatures ? 'Show less' : `Show all ${product.features.length} features`}
                </button>
              )}
            </div>

            <hr className="my-4" />

            {/* Specifications */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Product Details</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-2 text-gray-500 pr-4">{key}</td>
                      <td className="py-2 text-gray-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      {relatedProducts.length >= 2 && (
        <div className="max-w-7xl mx-auto px-4 py-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
          <div className="card p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                <span className="text-2xl text-gray-400 font-light">+</span>
                <img src={relatedProducts[0].image} alt={relatedProducts[0].name} className="w-24 h-24 object-cover rounded-lg" />
                <span className="text-2xl text-gray-400 font-light hidden sm:block">+</span>
                <img src={relatedProducts[1].image} alt={relatedProducts[1].name} className="w-24 h-24 object-cover rounded-lg hidden sm:block" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm text-gray-600 mb-2">Buy these 3 items together and save 10%</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Total: ${((product.price + relatedProducts[0].price + relatedProducts[1].price) * 0.9).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 line-through mb-3">
                  ${product.price + relatedProducts[0].price + relatedProducts[1].price}
                </p>
                <button
                  onClick={() => {
                    addItem(product);
                    addItem(relatedProducts[0]);
                    addItem(relatedProducts[1]);
                    toast('3 items added to cart');
                  }}
                  className="btn-cart max-w-xs"
                >
                  Add All 3 to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews & Q&A */}
      <ReviewSection product={product} />

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 py-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentlyViewed
              .filter(p => p.id !== product.id)
              .slice(0, 5)
              .map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
