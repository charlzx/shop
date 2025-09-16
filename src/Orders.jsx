import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO.jsx';

// Mock orders for demo — in a real app this would come from an API
const MOCK_ORDERS = [
  { id: 'ORD-1001', date: '2025-09-12', time: '14:32', status: 'Delivered', total: 14500, trackingPath: [{lat:9.0765, lon:7.3986}, {lat:9.25, lon:7.45}] },
  { id: 'ORD-1002', date: '2025-09-08', time: '09:10', status: 'In transit', total: 8200, trackingPath: [{lat:9.0765, lon:7.3986}, {lat:9.18, lon:7.42}] },
  { id: 'ORD-1003', date: '2025-08-20', time: '18:05', status: 'Cancelled', total: 12000, trackingPath: [{lat:9.0765, lon:7.3986}] }
];

const Orders = () => {
  // read persisted orders from localStorage and merge with mock orders
  const persisted = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('orders') || '[]') : [];
  // if no persisted orders, seed demo ones automatically (safe for dev/demo only)
  if (typeof window !== 'undefined' && (!persisted || persisted.length === 0)) {
    try {
      // lazy import to avoid SSR issues
      // eslint-disable-next-line global-require
      const seed = require('./seedOrders.js').default;
      if (typeof seed === 'function') {
        seed();
        // reload the persisted variable after seeding
      }
    } catch (e) {
      // ignore in environments where require isn't available
    }
  }
  const merged = [...persisted, ...MOCK_ORDERS];

  return (
    <>
      <SEO title={`Orders — CRWN3`} description={`Your recent orders`} />
      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="space-y-4">
          {merged.map(o => (
            <div key={o.id} className="p-4 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full md:w-2/3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Order ID: <span className="font-medium">{o.id}</span></div>
                    <div className="text-sm text-gray-500">{o.date} • {o.time}</div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{o.items && o.items.length ? `${o.items.length} item${o.items.length>1?'s':''} • ${o.items.map(it => it.name).slice(0,2).join(', ')}` : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : o.status === 'In transit' ? 'bg-yellow-100 text-yellow-700' : o.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      <span className="w-2 h-2 rounded-full" style={{ background: o.status === 'Delivered' ? '#10b981' : o.status === 'In transit' ? '#f59e0b' : o.status === 'Cancelled' ? '#ef4444' : '#3b82f6' }}></span>
                      <span>{o.status}</span>
                    </div>
                    <div className="text-sm font-semibold mt-2">₦{(o.total || 0).toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <Link to={`/orders/${o.id}`} className="text-sm font-medium underline">View details</Link>
                </div>
              </div>
              {/* simplified: no preview to keep list clean */}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

// no inline preview in list — keep Orders page focused and fast

export default Orders;
