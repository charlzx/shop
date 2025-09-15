import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO.jsx';

const FAQ = () => {
  const navigate = useNavigate();
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12">
      <SEO title="FAQ — CRWN3" description="Frequently asked questions about orders, shipping, returns, and support." />
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Ordering</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>How long does it take to process my order?</strong>
            <p className="mt-1">Orders are usually processed within 1–2 business days. During sale periods processing can take up to 3 business days.</p>
          </div>
          <div>
            <strong>Can I change or cancel my order?</strong>
            <p className="mt-1">If your order hasn't shipped yet we can usually update or cancel it. Contact support right away with your order number to request a change.</p>
          </div>
          <div>
            <strong>What payment methods do you accept?</strong>
            <p className="mt-1">We accept major credit and debit cards, mobile payments (where supported), and select local payment options. You can also apply promo codes at checkout.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Shipping & Tracking</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>Do you ship to Nigeria and internationally?</strong>
            <p className="mt-1">Yes — we ship domestically within Nigeria and to many international destinations. Shipping options and rates appear at checkout based on your shipping address.</p>
          </div>
          <div>
            <strong>How long does delivery take?</strong>
            <p className="mt-1">Typical delivery times:
              <ul className="list-disc ml-5 mt-2">
                <li>Domestic (Nigeria) standard: 2–6 business days</li>
                <li>Domestic expedited: 1–3 business days</li>
                <li>International: 7–21 business days (varies by country)</li>
              </ul>
            </p>
          </div>
          <div>
            <strong>How do I track my order?</strong>
            <p className="mt-1">Once your order ships we'll send an email with tracking information and a link to the carrier's tracking page.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Returns & Exchanges</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>What is your returns policy?</strong>
            <p className="mt-1">We accept returns within 30 days of delivery for eligible items in original condition with tags. Certain items (final sale, swimwear, underwear) may be excluded. Return shipping costs may apply unless the return is due to our error.</p>
          </div>
          <div>
            <strong>How do I start a return?</strong>
            <p className="mt-1">Start a return from your order page or contact support with your order number. We'll provide a return authorization and instructions.</p>
          </div>
          <div>
            <strong>How long until I receive a refund?</strong>
            <p className="mt-1">Refunds are issued after we receive and inspect the returned item. Processing typically takes 3–7 business days depending on your payment method and bank.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Products & Sizing</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>How do I choose the right size?</strong>
            <p className="mt-1">Use our <button onClick={() => navigate('/size-guide')} className="underline text-blue-600 dark:text-blue-400">Size Guide</button> for detailed measurements and conversions between Nigeria, US and UK sizes. If you're between sizes we recommend sizing up for relaxed fits and down for slim fits depending on the product description.</p>
          </div>
          <div>
            <strong>Are your product images accurate?</strong>
            <p className="mt-1">We aim for accurate photography and descriptions. Slight color variation can occur due to screen settings.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Sourcing & Quality</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>Where do you source your products?</strong>
            <p className="mt-1">We work with a curated network of manufacturers and small ateliers. Our sourcing focuses on suppliers who meet our quality standards and ethical practices. For many styles we collaborate directly with local designers and verified factories to ensure consistent quality.</p>
          </div>
          <div>
            <strong>Do you perform quality checks?</strong>
            <p className="mt-1">Yes — every batch goes through quality inspection. We check stitching, materials, trims, and sizing accuracy before items are shipped to customers.</p>
          </div>
          <div>
            <strong>Can I request product origin details?</strong>
            <p className="mt-1">If you need origin or material details for a specific product, contact support with the product SKU and we'll provide the available information.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Payments & Security</h2>
        <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <strong>Which payment methods do you accept?</strong>
            <p className="mt-1">We accept major credit and debit cards (Visa, Mastercard), local card schemes such as Verve and Afrigo where supported, and selected mobile/payment gateways. Available options depend on your country at checkout.</p>
          </div>
          <div>
            <strong>Is payment information secure?</strong>
            <p className="mt-1">Yes — we use industry-standard HTTPS and partner with PCI-compliant payment processors. We do not store full card numbers on our servers; card information is handled by the payment provider.</p>
          </div>
          <div>
            <strong>What happens if my payment fails?</strong>
            <p className="mt-1">If a payment fails you'll receive an error message with an explanation (insufficient funds, incorrect details, or 3D Secure failure). Try another card, check your billing details, or contact your bank. If you need help, contact our support with the order reference.</p>
          </div>
          <div>
            <strong>When will I be charged?</strong>
            <p className="mt-1">Charges are usually authorized at checkout. Your card may show an authorization hold before the order ships; final capture occurs when the order is processed or shipped depending on the payment provider.</p>
          </div>
          <div>
            <strong>How are refunds processed?</strong>
            <p className="mt-1">Refunds are issued to the original payment method once we receive and inspect returned items. The length of time until funds appear depends on your bank and payment method (typically 3–10 business days).</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Support</h2>
        <div className="mt-3 text-gray-700 dark:text-gray-300">
          <p>If you can't find the answer here, contact our support team:</p>
          <ul className="mt-3">
            <li>Email: <a href="mailto:support@crwn3.example" className="text-blue-600 dark:text-blue-400 underline">support@crwn3.example</a></li>
            <li>Phone (Nigeria): <a href="tel:+234800000000" className="text-blue-600 dark:text-blue-400 underline">+234 800 000 000</a></li>
            <li>Customer hours: Mon–Fri, 9:00–18:00 WAT</li>
          </ul>
          <p className="mt-3">When contacting support please include your order number (if applicable) and a brief description of the issue.</p>
        </div>
      </section>

    </main>
  );
}

export default FAQ;
