import React from 'react';
import SEO from './SEO.jsx';

const Shipping = () => (
  <main className="container mx-auto px-4 sm:px-6 py-12">
    <SEO title="Shipping & Returns — CRWN3" description="Shipping options, delivery times, international shipping and our returns process." />
    <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>

    <section className="mb-8">
      <h2 className="text-xl font-semibold">Shipping Options & Costs</h2>
      <p className="mt-3 text-gray-700 dark:text-gray-300">We offer multiple shipping options at checkout — costs are calculated based on the destination address, package weight and chosen speed.</p>
      <ul className="list-disc ml-5 mt-3 text-gray-700 dark:text-gray-300">
        <li><strong>Standard (Domestic):</strong> Affordable, 2–6 business days within Nigeria.</li>
        <li><strong>Expedited (Domestic):</strong> Faster delivery within 1–3 business days.</li>
        <li><strong>International:</strong> Economy and Express options available (7–21 business days, depending on destination).</li>
      </ul>
      <p className="mt-3 text-gray-700 dark:text-gray-300">Free standard shipping for orders over ₦10,000 (domestic only).</p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold">Carriers & Tracking</h2>
      <p className="mt-3 text-gray-700 dark:text-gray-300">We work with reliable carriers and provide tracking information via email once your order ships. Tracking updates depend on the carrier's system.</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">If your tracking shows an unexpected delay, contact support with your order number and we’ll investigate.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold">International Shipping, Duties & Customs</h2>
      <p className="mt-3 text-gray-700 dark:text-gray-300">International shipments may be subject to import taxes, duties or customs fees levied by the destination country. These charges are the responsibility of the recipient unless otherwise stated at checkout.</p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">Customs clearance can cause additional delays; estimated delivery windows do not include potential customs hold times.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-xl font-semibold">Returns & Exchanges</h2>
      <p className="mt-3 text-gray-700 dark:text-gray-300">We accept returns of eligible items within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached. Some items are final sale and not eligible for return — these are indicated on the product page.</p>
      <ol className="list-decimal ml-5 mt-3 text-gray-700 dark:text-gray-300">
        <li>Request a return from your order page or contact support with your order number.</li>
        <li>Pack the item securely and follow the return instructions provided.</li>
        <li>Ship the package using the carrier and method you choose (return shipping costs may apply).</li>
      </ol>
      <p className="mt-3 text-gray-700 dark:text-gray-300">Refunds are issued to the original payment method after we receive and inspect the returned item. Allow up to 7 business days for your bank to post the refund.</p>
    </section>

    <section>
      <h2 className="text-xl font-semibold">Need help?</h2>
      <p className="mt-3 text-gray-700 dark:text-gray-300">For questions about shipping, international delivery or returns, contact support:</p>
      <ul className="mt-3 text-gray-700 dark:text-gray-300">
        <li>Email: <a href="mailto:support@crwn3.example" className="text-blue-600 dark:text-blue-400 underline">support@crwn3.example</a></li>
        <li>Phone (Nigeria): <a href="tel:+234800000000" className="text-blue-600 dark:text-blue-400 underline">+234 800 000 000</a></li>
      </ul>
    </section>
  </main>
);

export default Shipping;
