import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, CreditCard, Truck, Check } from 'lucide-react';
import { useCartStore, useUserStore, useOrderStore } from '../store/useStore';

export default function CheckoutPage() {
  const items = useCartStore(s => s.items);
  const getTotal = useCartStore(s => s.getTotal);
  const getItemCount = useCartStore(s => s.getItemCount);
  const clearCart = useCartStore(s => s.clearCart);
  const user = useUserStore(s => s.user);
  const addOrder = useOrderStore(s => s.addOrder);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const [shipping, setShipping] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getTotal();
  const shippingCost = subtotal > 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/" className="btn-cart inline-block max-w-xs">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (orderComplete && completedOrder) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-600 mb-4">Thank you for your order</p>
            <p className="text-sm text-gray-500 mb-2">Order ID: <span className="font-mono font-medium">{completedOrder.id}</span></p>
            <p className="text-sm text-gray-500 mb-8">
              Estimated delivery: {new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>

            <div className="card p-6 mb-6 text-left max-w-sm mx-auto">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({getItemCount()})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/orders" className="btn-primary">View Orders</Link>
              <Link to="/" className="btn-secondary">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const order = addOrder({
      items: [...items],
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      shippingAddress: shipping,
    });
    clearCart();
    setCompletedOrder(order);
    setOrderComplete(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight size={14} />
          <Link to="/cart" className="hover:text-orange-600">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">Checkout</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 1 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-600'
            }`}>1</div>
            <span className="ml-2 text-sm font-medium hidden sm:block">Shipping</span>
          </div>
          <div className={`w-16 sm:w-24 h-1 mx-2 ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 2 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-600'
            }`}>2</div>
            <span className="ml-2 text-sm font-medium hidden sm:block">Payment</span>
          </div>
          <div className={`w-16 sm:w-24 h-1 mx-2 ${step >= 3 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 3 ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-600'
            }`}>3</div>
            <span className="ml-2 text-sm font-medium hidden sm:block">Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={24} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 block">Address</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="input-field"
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">City</label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="input-field"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">State</label>
                    <input
                      type="text"
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="input-field"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">ZIP Code</label>
                    <input
                      type="text"
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                      className="input-field"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Phone</label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={24} className="text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 block">Card Number</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="input-field"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 block">Name on Card</label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">Expiry Date</label>
                    <input
                      type="text"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className="input-field"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">CVV</label>
                    <input
                      type="text"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className="input-field"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                  <Lock size={16} className="text-gray-600" />
                  <p className="text-xs text-gray-600">Your payment info is encrypted and secure. We never store your full card details.</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-primary"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Shipping Summary */}
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
                  <p className="text-sm text-gray-600">{shipping.fullName}</p>
                  <p className="text-sm text-gray-600">{shipping.address}</p>
                  <p className="text-sm text-gray-600">{shipping.city}, {shipping.state} {shipping.zip}</p>
                  <button onClick={() => setStep(1)} className="text-sm text-blue-600 hover:underline mt-2">Change</button>
                </div>

                {/* Payment Summary */}
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Payment Method</h3>
                  <p className="text-sm text-gray-600">
                    Card ending in ••••{payment.cardNumber.slice(-4) || '0000'}
                  </p>
                  <button onClick={() => setStep(2)} className="text-sm text-blue-600 hover:underline mt-2">Change</button>
                </div>

                {/* Items */}
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="btn-secondary">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
                    <Lock size={16} /> Place Your Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="card p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({getItemCount()})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Order Total</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>

              {step === 3 && (
                <button onClick={handlePlaceOrder} className="btn-cart mb-3">
                  Place Your Order
                </button>
              )}

              <div className="text-xs text-gray-500 space-y-2">
                <p>🔒 Secure 256-bit SSL encryption</p>
                <p>📦 Free returns within 30 days</p>
                <p>💳 We accept all major credit cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
