import { Link } from 'react-router-dom';
import { ChevronRight, Store, TrendingUp, Package, Truck, BarChart3, Shield, Zap, Globe } from 'lucide-react';

const benefits = [
  { icon: Globe, title: "Reach Millions", desc: "Access hundreds of millions of active customers worldwide." },
  { icon: Truck, title: "Fulfillment by Scamazon", desc: "Let us handle storage, packing, and shipping with FBA." },
  { icon: BarChart3, title: "Powerful Analytics", desc: "Gain insights into sales, traffic, and customer behavior." },
  { icon: Shield, title: "Brand Protection", desc: "Tools to protect your brand and fight counterfeit products." },
  { icon: Zap, title: "Fast Payments", desc: "Get paid every two weeks with reliable, on-time payments." },
  { icon: TrendingUp, title: "Growth Tools", desc: "Advertising, promotions, and marketing to grow your business." },
];

const plans = [
  {
    name: "Individual",
    price: "$0.99",
    period: "per sale",
    desc: "Best for sellers with fewer than 40 items/month",
    features: [
      "List up to 40 items/month",
      "$0.99 per item sold",
      "Standard payment processing",
      "Basic seller support",
      "Access to Scamazon marketplace",
    ],
    cta: "Start Selling",
    featured: false,
  },
  {
    name: "Professional",
    price: "$39.99",
    period: "per month",
    desc: "Best for growing businesses and high-volume sellers",
    features: [
      "Unlimited listings",
      "No per-item fee",
      "Advanced analytics & reports",
      "FBA eligibility",
      "Advertising tools",
      "Brand Registry access",
      "API access",
      "Priority seller support",
    ],
    cta: "Start Professional Plan",
    featured: true,
  },
];

export default function SellPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Sell on <span className="text-orange-400">Scamazon</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Reach millions of customers. Grow your business. Start selling today with as little as $0.99 per item.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#plans" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-colors">
                Start Selling
              </a>
              <a href="#benefits" className="bg-white/20 hover:bg-white/30 font-bold py-3 px-8 rounded-full transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Sell on Scamazon</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "300M+", label: "Active Customers" },
            { value: "$4,500", label: "Average Monthly Sales" },
            { value: "175+", label: "Countries Reachable" },
            { value: "24/7", label: "Seller Support" },
          ].map(stat => (
            <div key={stat.label} className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div id="benefits" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Sell on Scamazon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(benefit => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="card p-6">
                  <Icon size={32} className="text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="card p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "Create Account", desc: "Sign up for a seller account" },
              { step: 2, title: "List Products", desc: "Add your inventory to the catalog" },
              { step: 3, title: "Set Prices", desc: "Choose competitive pricing" },
              { step: 4, title: "Ship Orders", desc: "Fulfill directly or use FBA" },
              { step: 5, title: "Get Paid", desc: "Receive payments every 2 weeks" },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div id="plans" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map(plan => (
              <div key={plan.name} className={`card p-8 ${plan.featured ? 'ring-2 ring-blue-500 relative' : ''}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-bold transition-colors ${
                  plan.featured
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Sellers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah K.", business: "Handmade Crafts", quote: "Scamazon helped me grow my small craft business into a full-time operation. The reach is incredible.", sales: "$15K/mo" },
              { name: "Mike R.", business: "Electronics Store", quote: "FBA changed everything. I focus on sourcing products and Scamazon handles the rest.", sales: "$50K/mo" },
              { name: "Lisa M.", business: "Home & Kitchen", quote: "The analytics tools are amazing. I know exactly what's selling and when to stock up.", sales: "$25K/mo" },
            ].map(testimonial => (
              <div key={testimonial.name} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-3">"{testimonial.quote}"</p>
                <p className="text-xs text-blue-600 font-bold">Avg. sales: {testimonial.sales}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start selling?</h2>
          <p className="text-gray-600 mb-6">Join over 2 million sellers already growing their business on Scamazon.</p>
          <a href="#plans" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-12 rounded-full transition-colors inline-block text-lg">
            Start Selling Today
          </a>
        </div>
      </div>
    </div>
  );
}
