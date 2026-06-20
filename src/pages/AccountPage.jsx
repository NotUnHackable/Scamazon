import { Link } from 'react-router-dom';
import { ChevronRight, User, Package, Heart, CreditCard, MapPin, Shield } from 'lucide-react';
import { useUserStore, useOrderStore, useCartStore } from '../store/useStore';
import { useWishlistStore } from '../store/useWishlistStore';

export default function AccountPage() {
  const user = useUserStore(s => s.user);
  const orders = useOrderStore(s => s.orders);
  const wishlist = useWishlistStore(s => s.items);
  const cartItems = useCartStore(s => s.items);

  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your account</h1>
          <Link to="/signin" className="btn-primary inline-block">Sign In</Link>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { icon: Package, label: 'Your Orders', desc: `${orders.length} order${orders.length !== 1 ? 's' : ''}`, path: '/orders', color: 'bg-blue-100 text-blue-600' },
    { icon: Heart, label: 'Your Wishlist', desc: `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''}`, path: '/wishlist', color: 'bg-red-100 text-red-600' },
    { icon: CreditCard, label: 'Payment Methods', desc: 'Manage your cards', path: '/', color: 'bg-green-100 text-green-600' },
    { icon: MapPin, label: 'Your Addresses', desc: 'Manage addresses', path: '/', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Shield, label: 'Login & Security', desc: 'Manage your account', path: '/', color: 'bg-purple-100 text-purple-600' },
    { icon: User, label: 'Your Profile', desc: 'Edit your info', path: '/', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Your Account</span>
        </div>

        {/* Welcome Banner */}
        <div className="card p-8 mb-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
              <p className="text-gray-300 text-sm">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {quickLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link key={link.label} to={link.path} className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${link.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{link.label}</h3>
                  <p className="text-sm text-gray-500">{link.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          {orders.length === 0 && wishlist.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No recent activity yet. Start shopping to see your activity here!</p>
              <Link to="/" className="btn-primary inline-block">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Package size={20} className="text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order placed — ${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <Link to="/orders" className="text-xs text-blue-600 hover:underline">View</Link>
                </div>
              ))}
              {wishlist.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Heart size={20} className="text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Wishlist</p>
                    <p className="text-xs text-gray-500">{wishlist.length} item{wishlist.length !== 1 ? 's : ' : ''}</p>
                  </div>
                  <Link to="/wishlist" className="text-xs text-blue-600 hover:underline">View</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
