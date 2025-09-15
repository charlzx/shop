import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const Signup = () => {
  const { navigate } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg({ type: 'error', text: 'Please fill out all fields' });
      return;
    }
    if (password !== confirm) {
      setMsg({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    setMsg({ type: 'success', text: 'Account created!' });
    setTimeout(() => navigate('home'), 700);
  };

  // Google sign-up currently disabled

  return (
    <>
      <SEO title={`Sign up — CRWN3`} description={`Create an account at CRWN3 to save favorites, track orders, and get exclusive offers.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Create an account</h1>

      <div className="mb-6">
        <button disabled title="Google sign-up not enabled" className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 rounded-md opacity-60 cursor-not-allowed">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-sm">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.63-.06-1.24-.18-1.82H9v3.44h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.59z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.26C11.17 13.07 10.14 13.5 9 13.5c-2.3 0-4.25-1.55-4.95-3.64H1.07v2.28C2.56 15.98 5.56 18 9 18z" fill="#34A853"/>
              <path d="M4.05 9.86A5.4 5.4 0 013.78 9c0-.32.03-.64.07-.95V5.77H1.07A8.98 8.98 0 000 9c0 1.45.35 2.82.97 4.02l3.08-3.16z" fill="#FBBC05"/>
              <path d="M9 3.5c1.32 0 2.5.45 3.43 1.34l2.57-2.56C13.47.99 11.43 0 9 0 5.56 0 2.56 2.02 1.07 4.73l3.08 2.28C4.75 5.05 6.7 3.5 9 3.5z" fill="#EA4335"/>
            </svg>
          </span>
          <span className="text-sm font-medium">Sign up with Google</span>
        </button>
      </div>

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
        {msg && <div className={`mt-2 text-sm ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>}
      </form>

      {/* Google sign-up is currently disabled; duplicate bottom button removed */}
    </main>
    </>
  );
};

export default Signup;
