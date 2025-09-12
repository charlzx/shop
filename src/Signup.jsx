import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const Signup = () => {
  const { showToast, navigate } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill out all fields', 'error');
      return;
    }
    if (password !== confirm) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Account created!');
    navigate('home');
  };

  return (
    <>
      <SEO title={`Sign up — CRWN3`} description={`Create an account at CRWN3 to save favorites, track orders, and get exclusive offers.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Create an account</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Confirm Password</span>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-md font-semibold">Create account</button>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('login'); }} className="text-sm text-gray-500 hover:underline">Already have an account?</a>
        </div>
      </form>
    </main>
    </>
  );
};

export default Signup;
