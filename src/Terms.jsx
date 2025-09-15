import React from 'react';
import SEO from './SEO.jsx';

const Terms = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12">
      <SEO title="Terms of Service — CRWN3" description="Terms governing the use of our site and services." />
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">1. Acceptance</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">By accessing or using our website and services you agree to be bound by these terms. If you do not agree, please do not use the services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">2. Account</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized use.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3. Orders & Pricing</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">We aim for accurate product information and pricing, but errors can occur. We reserve the right to cancel orders resulting from pricing or product information errors. Prices are shown at checkout and may include taxes and shipping where applicable.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">4. Shipping & Returns</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Shipping times and return policies are described on our Shipping & Returns page. We are not responsible for delays caused by carriers or customs clearance.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">All content on the site (text, images, logos) is owned or licensed by us. You may not copy or use our content without permission.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the site or products.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">7. Governing Law</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">These terms are governed by the laws of the jurisdiction where our business is registered. Disputes should be resolved in the competent courts of that jurisdiction.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">If you have questions about these terms please contact: <a href="mailto:legal@crwn3.example" className="text-blue-600 dark:text-blue-400 underline">legal@crwn3.example</a></p>
      </section>
    </main>
  );
}

export default Terms;
