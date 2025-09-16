// Lightweight demo seeder for orders — call `seedDemoOrders()` in the console during development
export function seedDemoOrders() {
  const demo = [
    {
      id: 'ORD-3001', trackingId: 'TRK-300100', date: '2025-09-08', time: '09:10', status: 'Delivered', total: 22500,
      items: [{ id: 'P-21', name: 'Classic Tee', qty: 2, price: 3500 }, { id: 'P-44', name: 'Denim Jeans', qty: 1, price: 15500 }],
      // Abuja -> Warri (multi-stop)
      trackingPath: [
        { lat:9.0765, lon:7.3986, label: 'Abuja (Warehouse)', when: '2025-09-08T09:10:00Z' },
        { lat:8.9806, lon:7.4200, label: 'Lokoja Sorting', when: '2025-09-08T15:30:00Z' },
        { lat:7.5169, lon:6.1667, label: 'Benin Hub', when: '2025-09-09T08:45:00Z' },
        { lat:5.5160, lon:5.7500, label: 'Warri Delivery', when: '2025-09-09T18:20:00Z' }
      ]
    },
    {
      id: 'ORD-3002', trackingId: 'TRK-300201', date: '2025-09-11', time: '07:05', status: 'In transit', total: 16500,
      items: [{ id: 'P-09', name: 'Cap', qty: 3, price: 5500 }],
      // Abuja -> Lagos (multi-stop)
      trackingPath: [
        { lat:9.0765, lon:7.3986, label: 'Abuja (Warehouse)', when: '2025-09-11T07:05:00Z' },
        { lat:8.9806, lon:7.4200, label: 'Ilorin Sorting', when: '2025-09-11T12:10:00Z' },
        { lat:7.1615, lon:5.3857, label: 'Ibadan Hub', when: '2025-09-11T20:30:00Z' },
        { lat:6.5244, lon:3.3792, label: 'Lagos Delivery', when: '2025-09-12T08:50:00Z' }
      ]
    },
    {
      id: 'ORD-3003', trackingId: 'TRK-300302', date: '2025-09-12', time: '16:45', status: 'Processing', total: 9800,
      items: [{ id: 'P-55', name: 'Hoodie', qty: 1, price: 9800 }],
      // Abuja -> Edo -> Asaba -> Ughelli (multi-stop)
      trackingPath: [
        { lat:9.0765, lon:7.3986, label: 'Abuja (Warehouse)', when: '2025-09-12T16:45:00Z' },
        { lat:7.0000, lon:5.2230, label: 'Edo Hub', when: '2025-09-13T06:30:00Z' },
        { lat:6.2026, lon:6.1428, label: 'Asaba Sorting', when: '2025-09-13T12:10:00Z' },
        { lat:5.4581, lon:5.9587, label: 'Ughelli Delivery', when: '2025-09-13T18:20:00Z' }
      ]
    }
  ];

  try {
    const existing = JSON.parse(localStorage.getItem('orders') || '[]');
    // prepend demo items but avoid duplicates
    const ids = new Set(existing.map(o => o.id));
    const merged = [...demo.filter(d => !ids.has(d.id)), ...existing];
    localStorage.setItem('orders', JSON.stringify(merged));
    // eslint-disable-next-line no-console
    console.info('Seeded demo orders into localStorage.orders');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to seed demo orders', err);
  }
}

export default seedDemoOrders;
