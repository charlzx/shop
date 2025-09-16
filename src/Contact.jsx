import React, { useState, useContext } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const Contact = () => {
  const { navigate } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setMsg({ type: 'error', text: 'Please fill out all fields' });
      return;
    }
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      setMsg({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    // Simulate async send
    setTimeout(() => {
      setLoading(false);
      setMsg({ type: 'success', text: 'Thanks — your message has been sent!' });
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => navigate('home'), 900);
    }, 900);
  };

  return (
    <>
      <SEO title={`Contact — CRWN3`} description={`Get in touch with CRWN3 Collective for support, partnerships, or press inquiries.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button type="submit" disabled={loading} className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-md font-semibold w-full sm:w-auto">
            {loading ? 'Sending...' : 'Send message'}
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">Or email us at <a href="mailto:hello@crwn3.example" className="underline">hello@crwn3.example</a></div>
        </div>
        {msg && <div className={`mt-2 text-sm ${msg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</div>}
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
      </>
    );
};

export default Contact;
