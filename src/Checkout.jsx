import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const Checkout = () => {
  const { cart, showToast, clearCart, navigate, appliedCoupon, removeCoupon } = useContext(AppContext);
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

  const placeOrder = (e) => {
    e && e.preventDefault();
    if (!firstName || !lastName || !phone || !street || !city || !state) return showToast('Please fill out required address fields', 'error');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Order placed — thank you!');
      // clear cart and coupon so next order requires re-entry
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
            <div className="mt-4">
              <button onClick={() => { setOrderPlaced(false); }} className="px-4 py-2 border rounded-md">Place another order</button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <form onSubmit={placeOrder} className="space-y-4">
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
                <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
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

              <div className="grid grid-cols-2 gap-4">
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
              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">{loading ? 'Placing...' : 'Place order'}</button>
                <button type="button" onClick={() => navigate('/cart')} className="px-4 py-2 border rounded-md">Back to cart</button>
              </div>
            </form>

            <aside className="p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">
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
                      <button onClick={() => { removeCoupon(); showToast('Coupon removed'); }} className="text-sm text-gray-500 hover:underline">Remove coupon</button>
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
