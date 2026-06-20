import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { useToast } from './Toast';

export default function NotifyMe({ productName }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast('Please enter a valid email', 'error');
      return;
    }
    setSubscribed(true);
    toast(`We'll notify you when "${productName.slice(0, 30)}..." is back in stock!`);
  };

  if (subscribed) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <Check size={18} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-800">You're on the list!</p>
          <p className="text-xs text-blue-600">We'll email you at {email} when this item is back in stock.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={18} className="text-yellow-600" />
        <p className="text-sm font-medium text-yellow-800">Get notified when back in stock</p>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="input-field flex-1 text-sm py-2"
        />
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap">
          Notify Me
        </button>
      </div>
    </form>
  );
}
