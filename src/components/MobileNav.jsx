import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Package } from 'lucide-react';
import { useCartStore, useUserStore } from '../store/useStore';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: Package, label: 'Orders', path: '/orders' },
  { icon: User, label: 'Account', path: '/signin' },
];

export default function MobileNav() {
  const location = useLocation();
  const itemCount = useCartStore(s => s.getItemCount());
  const user = useUserStore(s => s.user);

  // Hide on auth pages
  if (['/signin', '/register'].includes(location.pathname)) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 min-w-[48px] ${
                isActive ? 'text-orange-500' : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.path === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
