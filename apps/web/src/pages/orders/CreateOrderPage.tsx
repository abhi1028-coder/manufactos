import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LineItem {
  id: number;
  productName: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  taxPercent: string;
}

const defaultItem = (): LineItem => ({
  id: Date.now(),
  productName: '',
  quantity: '',
  unit: 'kg',
  pricePerUnit: '',
  taxPercent: '18',
});

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState('');
  const [delivery, setDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LineItem[]>([defaultItem()]);

  const updateItem = (id: number, field: keyof LineItem, value: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => setItems((prev) => [...prev, defaultItem()]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.pricePerUnit) || 0;
    return sum + qty * rate;
  }, 0);

  const tax = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const rate = parseFloat(item.pricePerUnit) || 0;
    const pct = parseFloat(item.taxPercent) || 0;
    return sum + (qty * rate * pct) / 100;
  }, 0);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would call the API
    alert('Order created (mock)! Redirecting to orders list.');
    navigate('/orders');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <nav className="breadcrumb">
          <Link to="/orders" className="hover:text-slate-700">Orders</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">New Order</span>
        </nav>
        <h1 className="page-title">Create Order</h1>
        <p className="page-subtitle">Fill in customer details and line items to create a new production order.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer & details */}
        <div className="card">
          <h3 className="section-header">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer *</label>
              <select
                className="input-field"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                required
              >
                <option value="">Select customer…</option>
                <option>Bharat Steel Pvt Ltd</option>
                <option>Apex Auto Components</option>
                <option>Sunrise Fabricators</option>
                <option>Kaveri Castings</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected Delivery</label>
              <input
                type="date"
                className="input-field"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Special instructions, priority notes…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="section-header mb-0">Line Items</h3>
            <button type="button" onClick={addItem} className="btn-secondary text-xs">
              + Add Item
            </button>
          </div>
          <div className="p-5 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-4">
                  <input
                    className="input-field"
                    placeholder="Product name"
                    value={item.productName}
                    onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    className="input-field"
                    type="number"
                    placeholder="Qty"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <select
                    className="input-field"
                    value={item.unit}
                    onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                  >
                    {['kg', 'pcs', 'mtr', 'lt', 'nos'].map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    className="input-field"
                    type="number"
                    placeholder="Rate ₹"
                    min="0"
                    value={item.pricePerUnit}
                    onChange={(e) => updateItem(item.id, 'pricePerUnit', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <select
                    className="input-field"
                    value={item.taxPercent}
                    onChange={(e) => updateItem(item.id, 'taxPercent', e.target.value)}
                  >
                    {['0', '5', '12', '18', '28'].map((t) => (
                      <option key={t}>{t}%</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 flex justify-end pt-2">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 space-y-1 text-sm text-right">
            <div className="flex justify-end gap-24">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold tabular-nums w-28">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-end gap-24">
              <span className="text-slate-500">Tax (GST)</span>
              <span className="font-semibold tabular-nums w-28">{fmt(tax)}</span>
            </div>
            <div className="flex justify-end gap-24 text-base font-bold text-indigo-900">
              <span>Grand Total</span>
              <span className="tabular-nums w-28">{fmt(subtotal + tax)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">Create Order</button>
          <Link to="/orders" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
