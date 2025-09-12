import React, { useState, useContext } from 'react';
import SEO from './SEO.jsx';
import { AppContext } from './AppContext.js';

const Login = () => {
  const { showToast, navigate } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter email and password', 'error');
      return;
    }
    // Simulate success
    showToast('Logged in successfully');
    navigate('home');
  };

  const handleReset = (e) => {
    e.preventDefault();
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(resetEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('If this email exists, a reset link has been sent.');
    setShowReset(false);
    setResetEmail('');
  };

  return (
    <>
      <SEO title={`Login — CRWN3`} description={`Sign in to your CRWN3 account to view orders, manage your wishlist, and checkout faster.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Sign in to your account</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-md font-semibold">Sign in</button>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setShowReset(s => !s)} className="text-sm text-gray-500 hover:underline">Forgot password?</button>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('signup'); }} className="text-sm text-gray-500 hover:underline">Create an account</a>
          </div>
        </div>
      </form>

      {showReset && (
        <form onSubmit={handleReset} className="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Reset your password</h3>
          <p className="text-sm text-gray-500 mb-3">Enter your email and we'll send a password reset link.</p>
          <div className="flex gap-2">
            <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="Email address" className="flex-grow px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
            <button type="submit" className="bg-black text-white dark:bg-white dark:text-black px-4 rounded-md font-semibold">Send</button>
          </div>
        </form>
      )}
    </main>
    </>
  );
};

export default Login;
