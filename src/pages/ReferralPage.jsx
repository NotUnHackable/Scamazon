import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Share2, Copy, Gift, Users, DollarSign, Check, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const toast = useToast();

  const referralCode = 'SCAM-FRIEND-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const referralLink = `https://scamazon.com/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast('Referral link copied!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!friendEmail) return;
    setEmailSent(true);
    toast(`Invitation sent to ${friendEmail}!`);
    setFriendEmail('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Gift size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">Refer & Earn</h1>
          </div>
          <p className="text-lg text-orange-100 mb-6 max-w-2xl">
            Share Scamazon with friends. You both get $10 in rewards when they make their first purchase!
          </p>
          <div className="flex gap-6">
            <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
              <p className="text-sm text-orange-200">You Earn</p>
              <p className="text-3xl font-bold">$10</p>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
              <p className="text-sm text-orange-200">Friend Gets</p>
              <p className="text-3xl font-bold">$10</p>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-center">
              <p className="text-sm text-orange-200">Friends Referred</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Refer & Earn</span>
        </div>

        {/* How It Works */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Share your link", desc: "Send your unique referral link to friends", icon: Share2 },
              { step: 2, title: "Friend signs up", desc: "They create a Scamazon account using your link", icon: Users },
              { step: 3, title: "Both earn $10", desc: "When they make their first purchase, you both get $10", icon: DollarSign },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Share Your Link */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Referral Link</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="input-field bg-gray-50 font-mono text-sm"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-lg font-medium transition-colors shrink-0 ${
                copied ? 'bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {/* Your Code */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">Your Referral Code</p>
            <p className="text-xl font-mono font-bold text-gray-900">{referralCode}</p>
          </div>

          {/* Quick Share */}
          <div className="flex gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Mail size={16} /> Share via Email
            </button>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <MessageCircle size={16} /> Share on WhatsApp
            </button>
            <button className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Share2 size={16} /> Share on Twitter
            </button>
          </div>
        </div>

        {/* Send Invite */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send an Invitation</h2>
          <form onSubmit={handleSendEmail} className="flex gap-2">
            <input
              type="email"
              value={friendEmail}
              onChange={e => setFriendEmail(e.target.value)}
              placeholder="friend@example.com"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-cart whitespace-nowrap">
              Send Invite
            </button>
          </form>
          {emailSent && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span className="text-sm text-green-700">Invitation sent successfully!</span>
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Terms & Conditions</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• The referred friend must be a new Scamazon customer</li>
            <li>• The referred friend must make a purchase of $25 or more within 30 days</li>
            <li>• $10 reward will be credited within 3 business days of qualifying purchase</li>
            <li>• Maximum of 50 referrals per account</li>
            <li>• Rewards expire after 90 days if unused</li>
            <li>• Scamazon reserves the right to modify or terminate the referral program at any time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
