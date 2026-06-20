import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check } from 'lucide-react';
import { useToast } from './Toast';

const footerLinks = [
  {
    title: "Get to Know Us",
    links: [
      { label: "About Scamazon", path: "/about" },
      { label: "Careers", path: "/about" },
      { label: "Scamazon Science", path: "/about" },
      { label: "Sell on Scamazon", path: "/sell" },
      { label: "Scamazon Devices", path: "/" },
    ]
  },
  {
    title: "Make Money with Us",
    links: [
      { label: "Sell products", path: "/sell" },
      { label: "Sell on Business", path: "/sell" },
      { label: "Become an Affiliate", path: "/refer" },
      { label: "Advertise Products", path: "/sell" },
      { label: "Scamazon Rewards", path: "/rewards" },
    ]
  },
  {
    title: "Payment Products",
    links: [
      { label: "Gift Cards", path: "/gift-cards" },
      { label: "Shop with Points", path: "/rewards" },
      { label: "Scamazon Currency", path: "/" },
      { label: "Subscribe & Save", path: "/subscribe-save" },
      { label: "Refer & Earn", path: "/refer" },
    ]
  },
  {
    title: "Let Us Help You",
    links: [
      { label: "Your Account", path: "/account" },
      { label: "Your Orders", path: "/orders" },
      { label: "Track Package", path: "/tracking" },
      { label: "Returns & Replacements", path: "/orders" },
      { label: "Help", path: "/contact" },
    ]
  }
];

const backToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast('Please enter a valid email', 'error');
      return;
    }
    setSubscribed(true);
    toast('Subscribed to our newsletter!');
    setEmail('');
  };

  return (
    <footer>
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Stay in the loop</h3>
              <p className="text-blue-200 text-sm">Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
                <Check size={18} />
                <span className="font-medium">You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none"
                />
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-r-full transition-colors flex items-center gap-2">
                  <Mail size={16} /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={backToTop}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* Main footer */}
      <div className="amazon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-gray-300 text-sm hover:underline hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#131921] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">scam</span>
            <span className="text-orange-400">azon</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Conditions of Use</Link>
            <Link to="/" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link to="/" className="hover:text-white transition-colors">Interest-Based Ads</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-gray-500">© 2024 Scamazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}
