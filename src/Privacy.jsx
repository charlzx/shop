import React from 'react';
import SEO from './SEO.jsx';

const Privacy = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-12">
      <SEO title="Privacy Policy — CRWN3" description="How we collect, use, and protect personal data." />
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">This policy explains what personal data we collect, why we collect it, and how we use and protect it. By using our services you consent to the practices described here.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <ul className="list-disc ml-5 mt-3 text-gray-700 dark:text-gray-300">
          <li><strong>Account information:</strong> name, email, shipping addresses, phone number.</li>
          <li><strong>Order information:</strong> products ordered, payment method (limited card data), order history.</li>
          <li><strong>Device & usage data:</strong> IP address, browser, pages visited, and analytics data.</li>
          <li><strong>Communications:</strong> messages exchanged with support and marketing preferences.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">How We Use Your Data</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">We use personal data to process orders, provide customer support, improve our services, and send order-related or promotional communications where you have consented.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Sharing & Third Parties</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">We share data with service providers necessary to operate our business (payment processors, carriers, analytics providers). We do not sell personal data to third parties.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Cookies & Tracking</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">We use cookies and similar technologies to remember preferences, enable the shopping cart, and for analytics. You can control cookies via your browser settings; disabling some cookies may affect site functionality.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Security</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">We use reasonable technical and organizational measures to protect personal data. However, no system is completely secure — if you suspect a breach contact support immediately.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Your Rights</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data, or to object to certain processing. Contact support to request changes to your data.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Questions about this policy or requests relating to your personal data: <a href="mailto:privacy@crwn3.example" className="text-blue-600 dark:text-blue-400 underline">privacy@crwn3.example</a></p>
      </section>
    </main>
  );
}

export default Privacy;
