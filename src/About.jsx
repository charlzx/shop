import React from 'react';
import SEO from './SEO.jsx';

const About = () => {
  return (
    <>
      <SEO title={`About — CRWN3`} description={`Learn about CRWN3 Collective — our story, mission, and commitment to quality.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
      <main className="container mx-auto px-4 sm:px-6 py-16">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About CRWN3</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">CRWN3 is a collective making thoughtfully designed, durable apparel — built to last and loved for years.</p>
      </section>

      {/* Our Story */}
      <section className="mt-12 max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-bold mb-3">Our Story</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Born from a desire to simplify wardrobes, CRWN3 began when a few designers and makers decided to focus on the essentials: quality materials, honest pricing, and timeless design. We work with partners who share our values and make thoughtful choices to reduce waste and increase longevity.</p>
        <p className="text-gray-600 dark:text-gray-300">We design with purpose — every seam, fabric choice, and fit is considered so the products you buy become staples in your daily life.</p>
      </section>

      {/* Values / Features */}
      <section className="mt-12">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm flex flex-col items-start gap-3">
            <h3 className="font-semibold text-lg">Sustainability</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">We choose materials and partners that reduce environmental impact.</p>
          </div>
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm flex flex-col items-start gap-3">
            <h3 className="font-semibold text-lg">Quality</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Attention to detail and durable construction are at the heart of every product.</p>
          </div>
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm flex flex-col items-start gap-3">
            <h3 className="font-semibold text-lg">Community</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">We support local initiatives and aim to give back to the communities we work with.</p>
          </div>
        </div>
      </section>

      <section className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-3">Join Our Newsletter</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Get product drops, behind-the-scenes, and exclusive offers.</p>
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          <input type="email" placeholder="Email address" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600" />
          <button className="bg-black text-white dark:bg-white dark:text-black px-4 rounded-r-md font-semibold">Subscribe</button>
        </div>
      </section>

    </main>
    </>
  );
};

export default About;
