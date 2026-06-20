import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Award, Gift, TrendingUp, Zap, Crown, Check } from 'lucide-react';
import { useUserStore } from '../store/useStore';
import { useToast } from '../components/Toast';

const tiers = [
  { name: "Bronze", minPoints: 0, icon: Award, color: "from-amber-600 to-amber-800", benefits: ["1x points on all purchases", "Free standard shipping", "Birthday reward"] },
  { name: "Silver", minPoints: 1000, icon: Star, color: "from-gray-400 to-gray-600", benefits: ["1.5x points on all purchases", "Free 2-day shipping", "Early access to deals", "Exclusive discounts"] },
  { name: "Gold", minPoints: 5000, icon: Crown, color: "from-yellow-400 to-yellow-600", benefits: ["2x points on all purchases", "Free next-day shipping", "Priority customer service", "Free returns", "Exclusive products"] },
  { name: "Platinum", minPoints: 15000, icon: Zap, color: "from-purple-500 to-indigo-600", benefits: ["3x points on all purchases", "Free same-day delivery", "Dedicated account manager", "VIP access to all events", "Annual gift", "Custom rewards"] },
];

const waysToEarn = [
  { action: "Purchase ($1 = 1 point)", points: "1x", icon: TrendingUp },
  { action: "Write a review", points: "50 pts", icon: Star },
  { action: "Refer a friend", points: "200 pts", icon: Gift },
  { action: "Complete your profile", points: "25 pts", icon: Check },
  { action: "First purchase of the month", points: "100 pts", icon: Zap },
  { action: "Subscribe & Save", points: "2x pts", icon: Crown },
];

const rewards = [
  { name: "$5 Scamazon Credit", points: 500, icon: "🛒" },
  { name: "$10 Scamazon Credit", points: 1000, icon: "💰" },
  { name: "$25 Scamazon Credit", points: 2500, icon: "💎" },
  { name: "$50 Scamazon Credit", points: 5000, icon: "🎁" },
  { name: "Free Prime Month", points: 7500, icon: "⭐" },
  { name: "Limited Edition T-Shirt", points: 3000, icon: "👕" },
];

export default function RewardsPage() {
  const user = useUserStore(s => s.user);
  const toast = useToast();
  const [pointsBalance] = useState(2450); // Demo balance
  const currentTier = [...tiers].reverse().find(t => pointsBalance >= t.minPoints) || tiers[0];
  const currentTierIndex = tiers.indexOf(currentTier);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  const progress = nextTier ? ((pointsBalance - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Crown size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">Scamazon Rewards</h1>
          </div>
          <p className="text-lg text-purple-100 mb-6">Earn points on every purchase and unlock exclusive perks.</p>
          <div className="flex gap-6">
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <p className="text-sm text-purple-200">Your Points</p>
              <p className="text-3xl font-bold">{pointsBalance.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <p className="text-sm text-purple-200">Your Tier</p>
              <p className="text-3xl font-bold">{currentTier.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Rewards</span>
        </div>

        {/* Tier Progress */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Tier Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">{currentTier.name}</span>
            {nextTier && (
              <span className="text-sm text-gray-500">{nextTier.minPoints.toLocaleString()} pts to {nextTier.name}</span>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`bg-gradient-to-r ${currentTier.color} rounded-full h-3 transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            {tiers.map(t => (
              <span key={t.name} className={t.name === currentTier.name ? 'font-bold text-gray-900' : ''}>
                {t.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ways to Earn */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ways to Earn Points</h2>
            <div className="space-y-4">
              {waysToEarn.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.action} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{item.points}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Redeem Points */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Redeem Your Points</h2>
            <div className="space-y-3">
              {rewards.map(reward => (
                <div key={reward.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{reward.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{reward.name}</p>
                    <p className="text-xs text-gray-500">{reward.points.toLocaleString()} points</p>
                  </div>
                  <button
                    onClick={() => {
                      if (pointsBalance >= reward.points) {
                        toast(`Redeemed ${reward.name}!`);
                      } else {
                        toast(`You need ${(reward.points - pointsBalance).toLocaleString()} more points`, 'error');
                      }
                    }}
                    disabled={pointsBalance < reward.points}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      pointsBalance >= reward.points
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier Benefits */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tier Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(tier => {
            const Icon = tier.icon;
            return (
              <div key={tier.name} className={`card p-6 ${tier.name === currentTier.name ? 'ring-2 ring-purple-500' : ''}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{tier.minPoints.toLocaleString()}+ points</p>
                <ul className="space-y-2">
                  {tier.benefits.map(benefit => (
                    <li key={benefit} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check size={12} className="text-green-600 mt-0.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
