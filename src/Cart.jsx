import React, { useState, useMemo, useContext } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, showToast, navigate, appliedCoupon, applyCoupon, removeCoupon, COUPON_DEFINITIONS } = useContext(AppContext);
  const [coupon, setCoupon] = useState('');

  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const price = item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price;
    return sum + price * item.quantity;
  }, 0), [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const def = COUPON_DEFINITIONS[appliedCoupon];
    if (!def) return 0;
    if (def.type === 'percent') return Math.round(subtotal * (def.value / 100));
    return def.value;
  }, [appliedCoupon, subtotal, COUPON_DEFINITIONS]);

  const total = Math.max(0, subtotal - discountAmount);

  const handleApply = (e) => {
    e && e.preventDefault();
    const code = (coupon || '').toUpperCase().trim();
    if (!code) return showToast('Enter a coupon code', 'error');
    const ok = applyCoupon(code);
    if (!ok) return showToast('Invalid coupon code', 'error');
    showToast(`${COUPON_DEFINITIONS[code].description} applied!`);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCoupon('');
    showToast('Coupon removed');
  };

  return (
    <>
      <SEO title={`Your cart — CRWN3`} description={`Review items in your cart, apply coupons, and proceed to checkout.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Your cart</h1>
        {cart.length === 0 ? (
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
            <p className="text-gray-500">Your cart is empty. Browse the shop to add items.</p>
            <div className="mt-4">
              <button onClick={() => navigate('/shop')} className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">Go to shop</button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex gap-4 bg-white dark:bg-black p-4 rounded-md border border-gray-100 dark:border-gray-800">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.cartItemId)} className="text-sm text-red-500">Remove</button>
                    </div>
                    <p className="text-xs text-gray-500">{item.options.size} / <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: item.options.color}}></span></p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-2">-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-2">+</button>
                      </div>
                      <div className="font-semibold">₦{(item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white dark:bg-black p-6 rounded-md border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between font-semibold mb-4">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>

              {appliedCoupon ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 p-3 rounded">
                    <div>
                      <div className="text-sm font-medium">Coupon: {appliedCoupon}</div>
                      <div className="text-xs text-gray-500">{COUPON_DEFINITIONS[appliedCoupon]?.description}</div>
                    </div>
                    <div className="text-sm font-semibold">-₦{discountAmount.toLocaleString()}</div>
                  </div>
                  <button onClick={handleRemoveCoupon} className="mt-2 text-sm text-gray-500 hover:underline">Remove coupon</button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="mb-4">
                  <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">Have a coupon?</label>
                  <div className="flex gap-2">
                    <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code" className="flex-1 px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none" />
                    <button className="bg-black text-white dark:bg-white dark:text-black px-4 rounded-md">Apply</button>
                  </div>
                </form>
              )}

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-md font-semibold mb-2">Proceed to checkout</button>
              <button onClick={() => navigate('/shop')} className="w-full border border-gray-200 dark:border-gray-700 py-2 rounded-md">Continue shopping</button>
            </aside>
          </div>
        )}
      </main>
    </>
  );
};

export default CartPage;
