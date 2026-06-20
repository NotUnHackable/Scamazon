import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, MessageCircle, Clock, MapPin, Send } from 'lucide-react';
import { useToast } from '../components/Toast';

const contactMethods = [
  { icon: Phone, title: "Phone", detail: "1-800-SCAMAZON", desc: "Available 24/7", color: "bg-blue-100 text-blue-600" },
  { icon: Mail, title: "Email", detail: "support@scamazon.com", desc: "Response within 24 hours", color: "bg-green-100 text-green-600" },
  { icon: MessageCircle, title: "Live Chat", detail: "Chat with us now", desc: "Average wait: 2 minutes", color: "bg-purple-100 text-purple-600" },
];

const faqs = [
  { q: "How do I track my order?", a: "Go to Your Orders and click 'Track Package' next to your order. You'll see real-time shipping updates." },
  { q: "How do I return an item?", a: "Go to Your Orders, select the item, and click 'Return or Replace Items'. Follow the prompts to print a return label." },
  { q: "How do I get a refund?", a: "Refunds are processed within 3-5 business days after we receive your return. The refund goes to your original payment method." },
  { q: "What is Scamazon Prime?", a: "Prime gives you free 2-day shipping, streaming video, and exclusive deals. Try it free for 30 days." },
  { q: "How do I cancel an order?", a: "You can cancel orders that haven't shipped yet from Your Orders. Click 'Cancel Items' next to the order." },
  { q: "How do I change my shipping address?", a: "Go to Account > Your Addresses to add, edit, or remove shipping addresses." },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    setSubmitted(true);
    toast('Message sent successfully! We\'ll get back to you soon.');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="amazon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-300">We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Contact Us</span>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map(method => {
            const Icon = method.icon;
            return (
              <div key={method.title} className="card p-6 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${method.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-sm font-medium text-gray-700 mb-1">{method.detail}</p>
                <p className="text-xs text-gray-500">{method.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">Thank you for reaching out. We'll respond within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setSubject(''); setMessage(''); }} className="btn-secondary">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} className="input-field">
                    <option value="">Select a topic</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Return or Refund</option>
                    <option value="account">Account Problem</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="product">Product Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Message *</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} className="input-field h-32 resize-none" placeholder="Tell us how we can help..." />
                </div>
                <button type="submit" className="btn-cart flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="card overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                    <ChevronRight
                      size={18}
                      className={`text-gray-400 transition-transform shrink-0 ${expandedFaq === index ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="card p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={24} className="text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Business Hours</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Customer Service</p>
              <p className="text-gray-600">24/7</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Live Chat</p>
              <p className="text-gray-600">Mon-Fri, 8am-10pm EST</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Phone Support</p>
              <p className="text-gray-600">Mon-Sun, 8am-11pm EST</p>
            </div>
          </div>
        </div>

        {/* Office Location */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={24} className="text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Corporate Office</h2>
          </div>
          <p className="text-sm text-gray-600">123 Commerce Street, Suite 100<br/>Seattle, WA 98101<br/>United States</p>
          <p className="text-xs text-gray-500 mt-2">* Visit by appointment only</p>
        </div>
      </div>
    </div>
  );
}
