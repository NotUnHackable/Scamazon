import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const register = useUserStore(s => s.register);
  const loading = useUserStore(s => s.loading);
  const storeError = useUserStore(s => s.error);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      navigate('/');
    }
  };

  const displayError = localError || storeError;

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

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h1>

          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

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
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500 mt-1">Passwords must be at least 6 characters.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Re-enter Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-cart" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create your Scamazon account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to Scamazon's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
            </p>
          </div>

          <hr className="my-6" />

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Already have an account?</p>
            <Link to="/signin" className="btn-secondary w-full block text-center">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
