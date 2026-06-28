import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, MapPin, ChevronDown, Package, LogOut } from 'lucide-react';
import { useCartStore, useUserStore } from '../store/useStore';

const navLinks = [
  { label: "Today's Deals", path: "/deals" },
  { label: "Customer Service", path: "/search?q=Customer+Service" },
  { label: "Registry", path: "/search?q=Registry" },
  { label: "Gift Cards", path: "/search?q=Gift+Cards" },
  { label: "Sell", path: "/search?q=Sell" },
];

export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const itemCount = useCartStore(s => s.getItemCount());
  const user = useUserStore(s => s.user);
  const signOut = useUserStore(s => s.signOut);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (userMenuOpen && !e.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [userMenuOpen]);

  return (
    <header>
      {/* Main Header */}
      <div className="amazon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">scam</span>
              <span className="text-orange-400">azon</span>
            </span>
            <span className="text-[10px] text-gray-400 hidden sm:block mt-1">.com</span>
          </Link>

          {/* Deliver to */}
          <Link to="/" className="hidden lg:flex items-center gap-1 text-sm hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 shrink-0">
            <MapPin size={16} />
            <div>
              <div className="text-gray-300 text-[11px] leading-tight">Deliver to</div>
              <div className="font-bold text-sm leading-tight">United States</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex h-10">
            <select className="h-full bg-white text-gray-700 text-xs px-2 rounded-l-md border-r border-gray-300 focus:outline-none hidden sm:block">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Home & Kitchen</option>
              <option>Fashion</option>
              <option>Sports & Outdoors</option>
              <option>Toys & Games</option>
              <option>Beauty</option>
            </select>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Scamazon"
              className="flex-1 px-4 bg-white text-black text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-r-md transition-colors flex items-center"
            >
              <Search size={20} className="text-gray-800" />
            </button>
          </form>

          {/* Language */}
          <button className="hidden lg:flex items-center gap-1 text-sm font-bold hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1">
            <span className="text-sm">EN</span>
            <ChevronDown size={14} />
          </button>

          {/* Account */}
          <div className="relative user-menu hidden sm:block">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-sm hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1"
            >
              <div className="text-gray-300 text-[11px] leading-tight">
                {user ? `Hello, ${user.name}` : 'Hello, sign in'}
              </div>
              <div className="font-bold text-sm leading-tight flex items-center gap-1">
                Account & Lists <ChevronDown size={14} />
              </div>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white text-gray-900 rounded shadow-lg border z-50 w-64">
                {user ? (
                  <div className="p-4">
                    <p className="font-bold mb-3">Hello, {user.name}</p>
                    <div className="space-y-2">
                      <Link to="/account" className="block text-sm hover:text-orange-600" onClick={() => setUserMenuOpen(false)}>
                        Your Account
                      </Link>
                      <Link to="/orders" className="block text-sm hover:text-orange-600" onClick={() => setUserMenuOpen(false)}>
                        Your Orders
                      </Link>
                      <Link to="/wishlist" className="block text-sm hover:text-orange-600" onClick={() => setUserMenuOpen(false)}>
                        Your Wishlist
                      </Link>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="block text-sm hover:text-orange-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <Link
                      to="/signin"
                      className="btn-primary block text-center mb-3"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <div className="text-xs text-gray-500 mb-2">New customer? <Link to="/register" className="text-orange-600 hover:underline" onClick={() => setUserMenuOpen(false)}>Start here</Link></div>
                    <hr className="my-2" />
                    <div className="text-xs space-y-2">
                      <Link to="/wishlist" className="block font-bold hover:text-orange-600" onClick={() => setUserMenuOpen(false)}>Your Wishlist</Link>
                      <Link to="/account" className="block font-bold hover:text-orange-600" onClick={() => setUserMenuOpen(false)}>Your Account</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Orders */}
          <Link to="/orders" className="hidden lg:flex items-center gap-1 text-sm hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1">
            <div>
              <div className="text-gray-300 text-[11px] leading-tight">Returns</div>
              <div className="font-bold text-sm leading-tight">& Orders</div>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1 relative">
            <div className="relative">
              <ShoppingCart size={28} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="font-bold text-sm hidden sm:block">Cart</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sub Nav */}
      <div className="amazon-light text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto">
          <button
            className="lg:hidden flex items-center gap-1 font-bold whitespace-nowrap"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={18} /> All
          </button>
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.path}
              className="whitespace-nowrap hover:outline hover:outline-1 hover:outline-white rounded px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-yellow-300 font-bold whitespace-nowrap hidden md:inline">Shop deals in Electronics</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-gray-900 border-b shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            {user ? (
              <div className="mb-4">
                <p className="font-bold text-lg">Hello, {user.name}</p>
                <div className="flex gap-4 mt-2">
                  <Link to="/orders" className="text-sm text-orange-600" onClick={() => setMobileMenuOpen(false)}>Your Orders</Link>
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-sm text-orange-600">Sign Out</button>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Link to="/signin" className="btn-primary block text-center mb-2" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <p className="text-sm text-gray-500 text-center">New customer? <Link to="/register" className="text-orange-600" onClick={() => setMobileMenuOpen(false)}>Start here</Link></p>
              </div>
            )}
            <hr className="my-2" />
            <div className="space-y-3">
              <h3 className="font-bold text-lg">Shop by Category</h3>
              {["Electronics", "Books", "Home & Kitchen", "Fashion", "Sports & Outdoors", "Toys & Games", "Beauty", "Pet Supplies", "Automotive", "Office Products"].map(cat => (
                <Link
                  key={cat}
                  to={`/search?category=${encodeURIComponent(cat)}`}
                  className="block py-1 hover:text-orange-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <hr className="my-4" />
            <div className="space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block py-1 font-bold hover:text-orange-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
