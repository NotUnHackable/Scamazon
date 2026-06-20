import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-orange-400 mb-2 animate-pulse">404</div>
          <div className="text-xl text-gray-600">Page Not Found</div>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <Search size={48} className="text-gray-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          We couldn't find that page
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Try searching for what you need, or head back to our homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={18} /> Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Today's Deals", path: "/deals" },
              { label: "Best Sellers", path: "/" },
              { label: "Electronics", path: "/search?category=Electronics" },
              { label: "Your Cart", path: "/cart" },
              { label: "Your Orders", path: "/orders" },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
