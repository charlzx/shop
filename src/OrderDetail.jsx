import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SEO from './SEO.jsx';

// Example detail data — in real app fetch by ID
const ORDER_DETAILS = {
  'ORD-1001': {
    id: 'ORD-1001',
    date: '2025-09-12',
    time: '14:32',
    status: 'Delivered',
    total: 14500,
    trackingId: 'TRK-88291',
    history: [
      { stage: 'Ordered', when: '2025-09-12 14:32' },
      { stage: 'Packed', when: '2025-09-13 09:12' },
      { stage: 'Shipped', when: '2025-09-13 18:30' },
      { stage: 'Out for delivery', when: '2025-09-14 08:45' },
      { stage: 'Delivered', when: '2025-09-14 12:10' }
    ],
    items: [
      { id: 'P-21', name: 'Classic Tee', qty: 2, price: 3500 },
      { id: 'P-33', name: 'Canvas Sneakers', qty: 1, price: 7500 }
    ]
  }
};

// format ISO timestamps (e.g. 2025-09-10T11:12:00Z) without seconds
const formatWhen = (iso) => {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    // format without seconds
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  } catch (e) {
    return iso;
  }
};

const OrderDetail = () => {
  const { id } = useParams();
  const persisted = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('orders') || '[]') : [];
  const persistedOrder = persisted.find(o => o.id === id);
  const baseOrder = ORDER_DETAILS[id];
  const order = persistedOrder || baseOrder;

  if (!order) return (
    <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
      <h1 className="text-2xl font-semibold">Order not found</h1>
      <p className="mt-4">We couldn't find that order. <Link to="/orders" className="underline">Back to orders</Link></p>
    </main>
  );

  

  const history = order.history || (order.trackingPath ? order.trackingPath.map((p, i) => ({ stage: p.label || p.name || `Location update ${i+1}`, when: formatWhen(p.when || p.time || p.timestamp || '') })) : []);

  return (
    <>
      <SEO title={`Order ${order.id} — CRWN3`} description={`Order details`} />
      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
          <div className="text-sm text-gray-500">{order.date} • {order.time}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="space-y-3">
                {order.items.map((it, idx) => (
                  <div key={it.id || idx} className="flex justify-between">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-sm text-gray-500">Qty: {it.qty}</div>
                    </div>
                    <div className="font-semibold">₦{(it.price * it.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold mb-3">Tracking</h3>
              <div className="text-sm text-gray-500 mb-3">Tracking ID: <span className="font-medium">{order.trackingId || order.trackingId}</span></div>
              <div className="mb-4 w-full h-40 bg-gray-50 dark:bg-gray-900 rounded-md p-2">
                <DetailMap path={order.trackingPath || []} />
              </div>
              <div className="space-y-4">
                {history.length === 0 && <div className="text-sm text-gray-500">No tracking updates yet.</div>}
                {history.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full mt-1 bg-black dark:bg-white"></div>
                    <div>
                      <div className="font-medium">{h.stage}</div>
                      <div className="text-sm text-gray-500">{h.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-3">Summary</h3>
            <div className="flex justify-between"> <span>Subtotal</span> <span>₦{(order.items || []).reduce((s,i) => s + (i.price || 0) * (i.qty || 1), 0).toLocaleString()}</span> </div>
            <div className="flex justify-between mt-2"> <span>Shipping</span> <span>₦{((order.total || 0) - (order.items || []).reduce((s,i) => s + (i.price || 0) * (i.qty || 1), 0)).toLocaleString()}</span> </div>
            <div className="flex justify-between font-semibold mt-4"> <span>Total</span> <span>₦{(order.total || 0).toLocaleString()}</span> </div>
          </aside>
        </div>
      </main>
    </>
  );
};

const DetailMap = ({ path = [] }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;
    // clean up previous map if any
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (!path || path.length === 0) return;

    const initial = path[0];
    const map = L.map(containerRef.current, { attributionControl: false }).setView([initial.lat, initial.lon], 11);
    mapRef.current = map;

    // Minimal styled tiles (Stamen Toner Lite) — public tiles suitable for light minimal design
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; Stamen Design, OpenStreetMap contributors'
    }).addTo(map);

    // smooth path using Catmull-Rom spline for gentle bends
    const raw = path.map(p => [p.lat, p.lon]);
    const smoothPath = (points, segments = 8) => {
      if (!points || points.length < 2) return points.slice();
      // duplicate endpoints for spline endpoints
      const pts = [];
      pts.push(points[0]);
      for (let i = 0; i < points.length; i++) pts.push(points[i]);
      pts.push(points[points.length - 1]);

      const out = [];
      for (let i = 1; i < pts.length - 2; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2];
        for (let t = 0; t < segments; t++) {
          const tt = t / segments;
          const tt2 = tt * tt;
          const tt3 = tt2 * tt;
          const q1 = -tt3 + 2*tt2 - tt;
          const q2 = 3*tt3 - 5*tt2 + 2;
          const q3 = -3*tt3 + 4*tt2 + tt;
          const q4 = tt3 - tt2;
          const lat = 0.5 * (p0[0]*q1 + p1[0]*q2 + p2[0]*q3 + p3[0]*q4);
          const lon = 0.5 * (p0[1]*q1 + p1[1]*q2 + p2[1]*q3 + p3[1]*q4);
          out.push([lat, lon]);
        }
      }
      out.push(points[points.length - 1]);
      return out;
    };

    const latlngs = smoothPath(raw, 12);
    const poly = L.polyline(latlngs, { color: '#111827', weight: 4, opacity: 0.95, smoothFactor: 1 }).addTo(map);

    // mark original stops as small markers (use original path indices for labels)
  path.forEach((p, i) => {
      const circle = L.circleMarker([p.lat, p.lon], {
        radius: 5,
        color: i === path.length - 1 ? '#10b981' : '#111827',
        fillColor: i === path.length - 1 ? '#10b981' : '#111827',
        weight: 1,
        fillOpacity: 1
      }).addTo(map);
      if (p) {
        const label = p.label || p.name || `Location ${i+1}`;
        const when = formatWhen(p.when || p.time || p.timestamp || '');
        if (label || when) circle.bindPopup(`<strong>${label}</strong>${when ? `<br/>${when}` : ''}`);
      }
    });

    try {
      map.fitBounds(poly.getBounds(), { padding: [20, 20] });
      // zoom in one level for a tighter view (but cap it)
      const currentZoom = map.getZoom();
      map.setZoom(Math.min(currentZoom + 1.5, 15));
    } catch (err) {
      // ignore if bounds calculation fails
    }

    // no playback marker — map is static by default

    return () => {
      try { map.remove(); } catch (e) { /* ignore */ }
      mapRef.current = null;
    };
  }, [JSON.stringify(path)]);

  if (!path || path.length === 0) return <div className="text-sm text-gray-500">No tracking path available</div>;

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default OrderDetail;
