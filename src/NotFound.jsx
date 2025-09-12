import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO.jsx';

const NotFound = () => {
  return (
    <>
        <SEO title={`Page not found — CRWN3`} description={`The page you're looking for could not be found. Browse our shop to find great products.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-2xl text-center px-6 py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mx-auto mb-6">▲</div>
        <h1 className="text-4xl font-extrabold mb-4">Page not found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Looks like the link you followed is broken or the page has been removed. Try returning to the shop or browse our collections.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-5 py-3 bg-black text-white rounded-md font-semibold">Home</Link>
          <Link to="/shop" className="px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-md">Shop</Link>
        </div>
      </div>
    </main>
    </>
  );
};

export default NotFound;
