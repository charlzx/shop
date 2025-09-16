import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const Checkout = () => {
  const { cart, clearCart, navigate, appliedCoupon, removeCoupon } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  // Payment fields
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBrand, setCardBrand] = useState('');

  // Input helpers: keep formatted values
  const formatPhone = (v) => {
    // allow leading + then digits only
    const cleaned = v.replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('+')) return '+' + cleaned.slice(1).replace(/\+/g, '');
    return cleaned.replace(/\+/g, '');
  };

  const formatCardNumber = (v) => {
    // allow only digits and spaces, group into 4s
    const digits = v.replace(/[^0-9]/g, '');
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  // Max card digits and computed input max length (includes spaces)
  const CARD_DIGITS_MAX = 19;
  const CARD_INPUT_MAX_LENGTH = CARD_DIGITS_MAX + Math.ceil(CARD_DIGITS_MAX / 4) - 1; // e.g. 19 digits + 4 spaces = 23

  const formatExpiry = (v) => {
    const digits = v.replace(/[^0-9]/g, '');
    if (digits.length === 0) return '';
    // clamp month to 01-12 when two digits present
    if (digits.length <= 2) {
      const mm = parseInt(digits.slice(0, 2), 10);
      if (!isNaN(mm)) {
        if (mm === 0) return '01';
        if (mm > 12) return '12';
        return digits;
      }
      return digits;
    }
    const mmDigits = digits.slice(0, 2);
    const mm = parseInt(mmDigits, 10);
    const mmStr = (!isNaN(mm) ? (mm === 0 ? '01' : (mm > 12 ? '12' : (mm < 10 ? '0' + mm : '' + mm))) : mmDigits);
    return mmStr + '/' + digits.slice(2, 4);
  };

  const subtotal = useMemo(() => cart.reduce((s, item) => {
    const price = item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price;
    return s + price * item.quantity;
  }, 0), [cart]);

  // Shipping fee logic: default 5000 unless coupon 'FREE' was applied
  const shippingFee = useMemo(() => {
    if (appliedCoupon === 'FREE') return 0;
    return cart.length > 0 ? 5000 : 0;
  }, [appliedCoupon, cart]);

  const total = useMemo(() => Math.max(0, subtotal + shippingFee), [subtotal, shippingFee]);

  const [msg, setMsg] = useState(null);

  const placeOrder = (e) => {
    e && e.preventDefault();
    if (!firstName || !lastName || !phone || !street || !city || !state) {
      setMsg({ type: 'error', text: 'Please fill out required address fields' });
      return;
    }
    // basic card validation when cart has items
    if (cart.length > 0) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        setMsg({ type: 'error', text: 'Please fill out your card details' });
        return;
      }
      // card number digits check
      const digits = cardNumber.replace(/\s+/g, '');
      if (!/^\d{12,19}$/.test(digits)) {
        setMsg({ type: 'error', text: 'Please enter a valid card number (12-19 digits)' });
        return;
      }
        // expiry format MM/YY and basic ranges + not expired
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
          setMsg({ type: 'error', text: 'Expiry must be in MM/YY format' });
          return;
        }
        const [mmStr, yyStr] = cardExpiry.split('/');
        const mm = parseInt(mmStr, 10);
        const yy = parseInt(yyStr, 10);
        if (isNaN(mm) || isNaN(yy) || mm < 1 || mm > 12) {
          setMsg({ type: 'error', text: 'Expiry month must be between 01 and 12' });
          return;
        }
        // convert two-digit year to full year (assume 2000-2099)
        const expiryYear = 2000 + yy;
        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1; // 1-12
        if (expiryYear < nowYear || (expiryYear === nowYear && mm < nowMonth)) {
          setMsg({ type: 'error', text: `Card has expired (must be ${String(nowMonth).padStart(2,'0')}/${String(nowYear).slice(2)} or later)` });
          return;
        }
      // cvv 3 or 4 digits
      if (!/^\d{3,4}$/.test(cardCvv)) {
        setMsg({ type: 'error', text: 'CVV must be 3 or 4 digits' });
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsg({ type: 'success', text: 'Order placed — thank you!' });
      // clear cart and coupon so next order requires re-entry
      // Build order object and persist to localStorage
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingId = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
      const placedAt = new Date();
      const orderObj = {
        id: orderId,
        trackingId,
        date: placedAt.toISOString().slice(0,10),
        time: placedAt.toTimeString().slice(0,5),
        status: 'Processing',
        total: total,
        items: cart.map(i => ({ id: i.id, name: i.name, qty: i.quantity, price: (i.discountPrice && new Date(i.saleEndDate) > new Date() ? i.discountPrice : i.price) })),
        shippingAddress: { firstName, lastName, phone, street, apartment, landmark, city, state },
        // small simulated location trail for tracking visual
        trackingPath: [
          { lat: 9.0765, lon: 7.3986, label: 'Warehouse', when: placedAt.toISOString() },
          { lat: 9.0765 + 0.2, lon: 7.3986 + 0.05, label: 'Sorting Hub', when: new Date(placedAt.getTime() + 1000*60*60).toISOString() }
        ]
      };
      try {
        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        existing.unshift(orderObj);
        localStorage.setItem('orders', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to persist order', err);
      }
      clearCart();
      removeCoupon();
      // mark order placed, but stay on checkout so user can see confirmation
      setOrderPlaced(true);
      // reset form fields for cleanliness
      setFirstName(''); setLastName(''); setPhone(''); setStreet(''); setApartment(''); setLandmark(''); setCity(''); setState('');
    }, 1000);
  };

  return (
    <>
      <SEO title={`Checkout — CRWN3`} description={`Complete your purchase.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        {cart.length === 0 ? (
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded">Your cart is empty.</div>
        ) : orderPlaced ? (
          <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded">
            <h2 className="text-xl font-semibold">Thanks — your order is confirmed</h2>
            <p className="text-sm text-gray-600 mt-2">We've received your order. If you need to place another order, your cart has been cleared and coupons removed. </p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { setOrderPlaced(false); }} className="px-4 py-2 border rounded-md">Place another order</button>
              <button onClick={() => navigate('/orders')} className="px-4 py-2 bg-black text-white rounded-md">View orders</button>
              <button onClick={() => navigate('/')} className="px-4 py-2 border rounded-md">Home</button>
              <button onClick={() => navigate('/shop' )} className="px-4 py-2 border rounded-md">Continue shopping</button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <form onSubmit={placeOrder} className="space-y-4 order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">First name</span>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Last name</span>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-gray-600 dark:text-gray-300">Phone number</span>
                <input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} inputMode="tel" placeholder="e.g. +2348012345678" className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600 dark:text-gray-300">Street</span>
                <input value={street} onChange={e => setStreet(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Apartment / Suite (optional)</span>
                  <input value={apartment} onChange={e => setApartment(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Landmark (optional)</span>
                  <input value={landmark} onChange={e => setLandmark(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 city-state-row">
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">City</span>
                  <input value={city} onChange={e => setCity(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600 dark:text-gray-300">State / FCT</span>
                  <select value={state} onChange={e => setState(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none">
                    <option value="">Select state</option>
                    <option value="FCT">FCT</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
                </label>
              </div>
              {/* Payment inputs — moved into main form so they're submitted with the order */}
              <div className="mt-4 mb-4">
                <h4 className="font-semibold text-sm mb-2">Payment</h4>
                <div className="space-y-2">
                  <label className="block">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Cardholder name</span>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" placeholder="Name on card" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Card number</span>
                    <div className="flex items-center gap-2">
                      <input value={cardNumber} onChange={e => { const raw = e.target.value.replace(/[^0-9]/g, ''); const limited = raw.slice(0, CARD_DIGITS_MAX); const v = formatCardNumber(limited); setCardNumber(v); const brand = detectCardBrand(limited); setCardBrand(brand); }} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength={CARD_INPUT_MAX_LENGTH} />
                      <div className="w-20 text-right text-sm text-gray-500">{cardBrand}</div>
                    </div>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Expiry (MM/YY)</span>
                      <input value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={5} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" placeholder="MM/YY" inputMode="numeric" />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-600 dark:text-gray-300">CVV</span>
                      <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/[^0-9]/g, '').slice(0,4))} maxLength={4} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" placeholder="123" inputMode="numeric" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">{loading ? 'Placing...' : 'Place order'}</button>
                <button type="button" onClick={() => navigate('/cart')} className="px-4 py-2 border rounded-md">Back to cart</button>
              </div>

              {msg && <div className={`mt-2 text-sm ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>}

            </form>

            <aside className="p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800 order-1 md:order-2">
              <h3 className="font-semibold mb-2">Order summary</h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.cartItemId} className="flex justify-between text-sm">
                    <div>{item.name} × {item.quantity}</div>
                    <div>₦{(item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex justify-between"> <span>Subtotal</span> <span>₦{subtotal.toLocaleString()}</span> </div>
                <div className="flex justify-between"> <span>Shipping</span> <span>₦{shippingFee.toLocaleString()}</span> </div>
                <div className="flex justify-between font-semibold mt-2"> <span>Total</span> <span>₦{total.toLocaleString()}</span> </div>
                {appliedCoupon && (
                  <div className="mt-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div>Coupon: <span className="font-medium">{appliedCoupon}</span></div>
                      <button onClick={() => { removeCoupon(); setMsg({ type: 'success', text: 'Coupon removed' }); setTimeout(() => setMsg(null), 2000); }} className="text-sm text-gray-500 hover:underline">Remove coupon</button>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>
    </>
  );
};

export default Checkout;

// Simple card brand detection based on prefix
function detectCardBrand(value) {
  const v = (value || '').replace(/\s+/g, '');
  if (/^4/.test(v)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(v)) return 'Mastercard';
  if (/^506(0|1|2)/.test(v) || /^5078/.test(v) || /^650/.test(v)) return 'Verve';
  if (/^6/.test(v)) return 'Afrigo';
  return '';
}
