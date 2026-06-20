import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useOrderStore } from '../store/useStore';

const trackingSteps = [
  { label: "Order Placed", icon: CheckCircle, completed: true },
  { label: "Processing", icon: Package, completed: true },
  { label: "Shipped", icon: Truck, completed: false },
  { label: "Out for Delivery", icon: Truck, completed: false },
  { label: "Delivered", icon: MapPin, completed: false },
];

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const orders = useOrderStore(s => s.orders);

  const handleTrack = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const foundOrder = orders.find(o => o.id === orderId);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Package</h1>
          <p className="text-blue-200">Enter your order details to see real-time shipping updates.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Track Package</span>
        </div>

        {/* Search Form */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Enter Order Details</h2>
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                className="input-field"
                placeholder="ORD-1234567890-abcdef"
              />
              <p className="text-xs text-gray-500 mt-1">Find this in your order confirmation email or Your Orders page.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email address used for order</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
            <button type="submit" className="btn-cart">
              Track Package
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="card p-6 mb-8">
            {foundOrder ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle size={24} className="text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Order Found</h3>
                    <p className="text-sm text-gray-500">Order #{foundOrder.id}</p>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Shipping Status</h4>
                  <div className="relative">
                    {trackingSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isCompleted = index < 2; // First 2 steps completed for demo
                      const isCurrent = index === 2; // "Shipped" is current
                      return (
                        <div key={step.label} className="flex items-start gap-4 pb-6 relative">
                          {index < trackingSteps.length - 1 && (
                            <div className={`absolute left-4 top-8 w-0.5 h-full ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                          )}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                          }`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                            {isCompleted && <p className="text-xs text-gray-500">Completed</p>}
                            {isCurrent && <p className="text-xs text-blue-600">In Progress — Estimated: {new Date(Date.now() + 2 * 86400000).toLocaleDateString()}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Details */}
                <div className="border-t pt-6">
                  <h4 className="font-bold text-gray-900 mb-4">Order Items</h4>
                  {foundOrder.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping Address</span>
                      <span className="text-right">
                        {foundOrder.shippingAddress.fullName}<br/>
                        {foundOrder.shippingAddress.address}<br/>
                        {foundOrder.shippingAddress.city}, {foundOrder.shippingAddress.state} {foundOrder.shippingAddress.zip}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Order not found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find an order matching those details. Please double-check your order ID and email address.
                </p>
                <Link to="/orders" className="text-blue-600 hover:underline text-sm">View all your orders →</Link>
              </div>
            )}
          </div>
        )}

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Your Recent Orders</h3>
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <button
                  key={order.id}
                  onClick={() => { setOrderId(order.id); setSearched(true); }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors border"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-mono">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
