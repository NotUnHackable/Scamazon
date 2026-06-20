import { Link } from 'react-router-dom';
import { ChevronRight, Globe, Users, Shield, Zap, Heart, TrendingUp, Award, Truck } from 'lucide-react';

const stats = [
  { value: "300M+", label: "Active Customers", icon: Users },
  { value: "150+", label: "Countries Served", icon: Globe },
  { value: "35M+", label: "Products Available", icon: TrendingUp },
  { value: "99.9%", label: "Uptime", icon: Zap },
];

const values = [
  { icon: Heart, title: "Customer Obsession", desc: "We start with the customer and work backwards. Every decision we make is driven by what's best for our customers." },
  { icon: Shield, title: "Trust & Safety", desc: "We protect customer data, ensure product authenticity, and maintain the highest standards of security." },
  { icon: Zap, title: "Innovation", desc: "We constantly push boundaries to invent on behalf of our customers. From same-day delivery to AI-powered recommendations." },
  { icon: Award, title: "Quality", desc: "We curate millions of products to ensure quality, and our A-to-Z guarantee protects every purchase." },
  { icon: Truck, title: "Speed", desc: "We deliver faster than anyone. Prime members get free two-day shipping, and many items ship same-day." },
  { icon: TrendingUp, title: "Sustainability", desc: "We're committed to net-zero carbon by 2040 and investing in renewable energy and electric delivery vehicles." },
];

const timeline = [
  { year: "2024", title: "Scamazon Today", desc: "Serving hundreds of millions of customers worldwide with cutting-edge technology." },
  { year: "2023", title: "Global Expansion", desc: "Expanded to 150+ countries and launched Scamazon AI-powered shopping assistant." },
  { year: "2022", title: "Sustainability Milestone", desc: "Reached 100% renewable energy for all operations." },
  { year: "2021", title: "Prime Growth", desc: "Prime membership surpassed 200 million members globally." },
  { year: "2020", title: "Essential Service", desc: "Delivered essential goods to millions during unprecedented times." },
  { year: "2018", title: "Scamazon Go", desc: "Opened first cashierless store with Just Walk Out technology." },
  { year: "2015", title: "Prime Day Born", desc: "Created the biggest shopping event in history." },
  { year: "2005", title: "Prime Launched", desc: "Revolutionized e-commerce with free two-day shipping." },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Earth's Most <span className="text-orange-400">Customer-Centric</span> Company
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            We began as an online bookstore, but we're much more today. Scamazon is a place where you can find anything you want to buy — and we're just getting started.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">About Scamazon</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card p-6 text-center">
                <Icon size={32} className="text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission */}
        <div className="card p-8 md:p-12 mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 italic">
            "To be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online, and endeavors to offer its customers the lowest possible prices."
          </p>
        </div>

        {/* Values */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map(value => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="card p-6">
                <Icon size={32} className="text-orange-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={event.year} className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2 z-10 mt-1" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-orange-500 font-bold text-lg">{event.year}</span>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to start shopping?</h2>
          <Link to="/" className="btn-primary inline-block text-lg px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
