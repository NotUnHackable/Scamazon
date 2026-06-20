import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Gift, Check, Copy, DollarSign } from 'lucide-react';
import { useToast } from '../components/Toast';

const denominations = [25, 50, 100, 150, 200, 500];

const designs = [
  { id: 1, name: "Birthday", color: "from-pink-400 to-purple-500", emoji: "🎂" },
  { id: 2, name: "Thank You", color: "from-green-400 to-emerald-500", emoji: "🙏" },
  { id: 3, name: "Congratulations", color: "from-yellow-400 to-orange-500", emoji: "🎉" },
  { id: 4, name: "Holiday", color: "from-red-400 to-green-500", emoji: "🎄" },
  { id: 5, name: "Love", color: "from-pink-400 to-red-500", emoji: "❤️" },
  { id: 6, name: "Classic", color: "from-gray-600 to-gray-800", emoji: "✨" },
];

export default function GiftCardPage() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [purchased, setPurchased] = useState(false);
  const toast = useToast();

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : amount;
  const selectedDesignData = designs.find(d => d.id === selectedDesign);

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!recipientName || !recipientEmail || finalAmount < 1 || finalAmount > 2000) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    setPurchased(true);
    toast('Gift card sent successfully!');
  };

  const giftCardCode = `SCAM-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className={`bg-gradient-to-r ${selectedDesignData?.color || 'from-orange-500 to-red-500'} text-white transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Scamazon Gift Cards</h1>
          <p className="text-lg opacity-90">The perfect gift for anyone. Let them choose what they love.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Gift Cards</span>
        </div>

        {purchased ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="card p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gift Card Sent!</h2>
              <p className="text-gray-600 mb-6">
                A ${finalAmount} gift card has been sent to {recipientEmail}.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-500 mb-2">Gift Card Code</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-mono font-bold text-gray-900">{giftCardCode}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(giftCardCode);
                      toast('Code copied!');
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Link to="/" className="btn-primary">Continue Shopping</Link>
                <button onClick={() => setPurchased(false)} className="btn-secondary">Send Another</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gift Card Preview */}
            <div>
              <div className={`bg-gradient-to-br ${selectedDesignData?.color || 'from-orange-500 to-red-500'} rounded-2xl p-8 text-white shadow-xl aspect-[16/10] flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">
                      <span className="text-white">scam</span>
                      <span className="text-yellow-300">azon</span>
                    </span>
                    <CreditCard size={20} className="ml-auto" />
                  </div>
                  <p className="text-lg opacity-90">Gift Card</p>
                </div>

                <div className="relative z-10">
                  <p className="text-4xl font-bold mb-2">${finalAmount || 0}</p>
                  {recipientName && <p className="text-sm opacity-80">For: {recipientName}</p>}
                  {senderName && <p className="text-sm opacity-80">From: {senderName}</p>}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {[
                  "No expiration date",
                  "No fees",
                  "Redeemable on millions of items",
                  "Can be combined with other payment methods",
                  "Delivered via email instantly"
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-600" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Form */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customize Your Gift Card</h2>

              <form onSubmit={handlePurchase} className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Select Amount</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {denominations.map(denom => (
                      <button
                        key={denom}
                        type="button"
                        onClick={() => { setAmount(denom); setCustomAmount(''); }}
                        className={`p-3 rounded-lg border-2 text-center font-bold transition-colors ${
                          amount === denom && !customAmount
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        ${denom}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="2000"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter $1 - $2,000</p>
                </div>

                {/* Design */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Choose a Design</label>
                  <div className="grid grid-cols-3 gap-2">
                    {designs.map(design => (
                      <button
                        key={design.id}
                        type="button"
                        onClick={() => setSelectedDesign(design.id)}
                        className={`p-3 rounded-lg bg-gradient-to-br ${design.color} text-white text-center transition-all ${
                          selectedDesign === design.id ? 'ring-2 ring-orange-500 ring-offset-2 scale-105' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <span className="text-2xl">{design.emoji}</span>
                        <p className="text-xs mt-1">{design.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 block">Recipient Details</label>
                  <input
                    type="text"
                    placeholder="Recipient's name *"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Recipient's email *"
                    value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Sender */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 block">From (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    className="input-field"
                  />
                  <textarea
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="input-field h-20 resize-none"
                  />
                </div>

                <button type="submit" className="btn-cart text-lg py-3 flex items-center justify-center gap-2">
                  <Gift size={20} /> Buy Gift Card — ${finalAmount}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
