import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/useStore';

export default function CartPage() {
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);
  const getTotal = useCartStore(s => s.getTotal);
  const getItemCount = useCartStore(s => s.getItemCount);
  const navigate = useNavigate();

  const subtotal = getTotal();
  const shipping = subtotal > 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="card p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/"
              className="inline-block btn-cart max-w-xs"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Shopping Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="card">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-sm text-gray-500 text-right">{getItemCount()} items</p>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className={`p-6 ${index < items.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 block mb-1"
                      >
                        {item.name}
                      </Link>

                      <p className="text-xs text-gray-500 mb-2">{item.brand}</p>

                      {item.prime && (
                        <span className="text-xs font-bold text-blue-600">prime</span>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-green-600 font-medium">
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-gray-300 mx-2">|</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-blue-600 hover:text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 text-right text-gray-700 font-medium">
                Subtotal ({getItemCount()} items): <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="card p-6 sticky top-4">
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
                  <span className="text-sm">
                    <span className="font-bold text-green-700">Gift options</span>
                    <br />
                    <span className="text-gray-600">Add a personal message</span>
                  </span>
                </label>
              </div>

              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getItemCount()} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Order Total</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-cart mb-3"
              >
                Proceed to Checkout
              </button>

              <div className="text-xs text-gray-500 space-y-2">
                <p>🔒 Secure checkout powered by Scamazon Pay</p>
                <p>📦 FREE delivery on orders over $25</p>
                <p>↩️ Easy 30-day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
