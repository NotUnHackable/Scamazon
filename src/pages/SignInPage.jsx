import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useStore';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signIn = useUserStore(s => s.signIn);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    signIn(email, name);
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <Link to="/" className="block text-center mb-6">
            <span className="text-3xl font-bold">
              <span className="text-gray-900">scam</span>
              <span className="text-orange-500">azon</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-blue-600 hover:underline cursor-pointer">Forgot your password?</span>
              </p>
            </div>

            <button type="submit" className="btn-cart">
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-4">
              By continuing, you agree to Scamazon's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
            </p>
          </div>

          <hr className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">New to Scamazon?</p>
            <Link to="/register" className="btn-secondary w-full block text-center">
              Create your Scamazon account
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Demo: Use any email and password to sign in
        </p>
      </div>
    </div>
  );
}
