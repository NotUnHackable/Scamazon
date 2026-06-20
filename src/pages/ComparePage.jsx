import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import StarRating from '../components/StarRating';
import { useCartStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import products from '../data/products';

export default function ComparePage() {
  const addItem = useCartStore(s => s.addItem);
  const toast = useToast();
  const [ids, setIds] = useState([1, 2, 3]);

  const compareProducts = ids
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  const allSpecKeys = [...new Set(compareProducts.flatMap(p => Object.keys(p.specifications)))];

  const removeProduct = (id) => {
    setIds(prev => prev.filter(i => i !== id));
  };

  const addProduct = (id) => {
    if (ids.length < 4 && !ids.includes(id)) {
      setIds(prev => [...prev, id]);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Compare Products</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Compare Products ({compareProducts.length}/4)</h1>

        {compareProducts.length === 0 ? (
          <div className="card p-12 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products to compare</h2>
            <Link to="/" className="btn-primary inline-block mt-4">Browse Products</Link>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 w-40">Feature</th>
                  {compareProducts.map(product => (
                    <th key={product.id} className="p-4 text-center min-w-[200px]">
                      <div className="relative">
                        {compareProducts.length > 1 && (
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <X size={12} />
                          </button>
                        )}
                        <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mx-auto mb-3" />
                        <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 block">
                          {product.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-gray-500">Price</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      <span className="text-xl font-bold text-gray-900">${p.price.toFixed(2)}</span>
                      {p.originalPrice > p.price && (
                        <p className="text-xs text-gray-500 line-through">${p.originalPrice.toFixed(2)}</p>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-500">Rating</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <StarRating rating={p.rating} size={14} />
                        <span className="text-sm">{p.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{p.numReviews.toLocaleString()} reviews</p>
                    </td>
                  ))}
                </tr>
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-gray-500">Brand</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center text-sm">{p.brand}</td>
                  ))}
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-500">Prime</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center text-sm">
                      {p.prime ? <span className="font-bold text-blue-600">prime</span> : '—'}
                    </td>
                  ))}
                </tr>
                <tr className="border-t">
                  <td className="p-4 text-sm font-medium text-gray-500">Availability</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center text-sm">
                      {p.inStock ? <span className="text-green-600">In Stock</span> : <span className="text-red-600">Out of Stock</span>}
                    </td>
                  ))}
                </tr>
                {allSpecKeys.map((key, i) => (
                  <tr key={key} className={`border-t ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="p-4 text-sm font-medium text-gray-500">{key}</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-4 text-center text-sm">
                        {p.specifications[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="p-4"></td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      <button
                        onClick={() => { addItem(p); toast(`Added "${p.name.slice(0, 25)}..." to cart`); }}
                        className="btn-cart text-sm"
                      >
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
