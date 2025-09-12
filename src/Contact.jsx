import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext.js';

const Contact = () => {
  const { showToast, navigate } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all fields', 'error');
      return;
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      showToast('Thanks — your message has been sent!');
      setName('');
      setEmail('');
      setMessage('');
      navigate('home');
    }, 900);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Contact us</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Have a question about an order, product, or collaboration? Send us a message and we'll get back to you within 1-2 business days.</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-black p-6 rounded-lg shadow-sm">
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Your name</span>
          <input value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Message</span>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6} className="mt-1 block w-full px-3 py-2 border rounded-md bg-transparent border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </label>

        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-md font-semibold">
            {loading ? 'Sending...' : 'Send message'}
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">Or email us at <a href="mailto:hello@crwn3.example" className="underline">hello@crwn3.example</a></div>
        </div>
      </form>

      <section className="mt-10 grid sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
          <h4 className="font-semibold">Support</h4>
          <p className="text-sm text-gray-500">support@crwn3.example</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
          <h4 className="font-semibold">Wholesale</h4>
          <p className="text-sm text-gray-500">wholesale@crwn3.example</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
          <h4 className="font-semibold">Press</h4>
          <p className="text-sm text-gray-500">press@crwn3.example</p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
