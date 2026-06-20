import { Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, Check } from 'lucide-react';
import { useOrderStore, useUserStore } from '../store/useStore';

export default function OrdersPage() {
  const orders = useOrderStore(s => s.orders);
  const user = useUserStore(s => s.user);

  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your orders</h1>
          <Link to="/signin" className="btn-primary inline-block">Sign In</Link>
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
          <span className="text-gray-700">Your Orders</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="card p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">Hello, {user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <hr className="my-3" />
              <nav className="space-y-2">
                <Link to="/orders" className="block text-sm font-medium text-orange-600">Your Orders</Link>
                <Link to="/" className="block text-sm text-gray-700 hover:text-orange-600">Your Account</Link>
                <Link to="/" className="block text-sm text-gray-700 hover:text-orange-600">Your Lists</Link>
              </nav>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-9">
            <div className="card p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
                  <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      {/* Order Header */}
                      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between gap-2 text-sm">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <p className="text-gray-500 text-xs">ORDER PLACED</p>
                            <p className="font-medium">
                              {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">TOTAL</p>
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">SHIP TO</p>
                            <p className="font-medium text-blue-600 hover:underline cursor-pointer">
                              {order.shippingAddress.fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">ORDER #</p>
                            <p className="font-medium text-blue-600 hover:underline cursor-pointer font-mono text-xs">
                              {order.id}
                            </p>
                          </div>
                        </div>
                        <button className="text-sm text-blue-600 hover:underline whitespace-nowrap">
                          Invoice
                        </button>
                      </div>

                      {/* Order Items */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          {order.status === 'Confirmed' && (
                            <span className="flex items-center gap-1 text-sm text-green-600">
                              <Check size={16} /> {order.status}
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            Delivery: {new Date(new Date(order.date).getTime() + 5 * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                          </span>
                        </div>

                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-4 py-3 border-t first:border-t-0">
                            <Link to={`/product/${item.id}`} className="shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/product/${item.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 block"
                              >
                                {item.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">
                                Qty: {item.quantity} | ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <Link
                              to={`/product/${item.id}`}
                              className="btn-secondary text-xs whitespace-nowrap"
                            >
                              Buy again
                            </Link>
                          </div>
                        ))}
                      </div>
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
