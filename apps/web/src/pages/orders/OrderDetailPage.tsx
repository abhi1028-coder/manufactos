import { useParams, Link } from 'react-router-dom';

const mockOrder = {
  id: '1',
  orderNumber: 'ORD-2024-0142',
  customerName: 'Bharat Steel Pvt Ltd',
  customerGstin: '27AABCS1429B1Z5',
  status: 'IN_PRODUCTION',
  createdAt: '2024-05-10',
  expectedDelivery: '2024-05-20',
  notes: 'Priority order — deliver before Eid holiday.',
  items: [
    { id: '1', productName: 'MS Angle 40×40×5',  quantity: 200, unit: 'kg', pricePerUnit: 72,  taxPercent: 18, totalAmount: 16992 },
    { id: '2', productName: 'Flat Bar 50×6',      quantity: 150, unit: 'kg', pricePerUnit: 68,  taxPercent: 18, totalAmount: 12036 },
    { id: '3', productName: 'Channel 100×50',     quantity: 500, unit: 'kg', pricePerUnit: 75,  taxPercent: 18, totalAmount: 44250 },
  ],
  subtotal: 62000,
  taxAmount: 11160,
  totalAmount: 248000,
};

const statusBg: Record<string, string> = {
  IN_PRODUCTION: 'badge-yellow',
  DELIVERED: 'badge-green',
  CONFIRMED: 'badge-blue',
  READY: 'badge bg-purple-50 text-purple-700',
  DISPATCHED: 'badge bg-sky-50 text-sky-700',
  DRAFT: 'badge-slate',
  CANCELLED: 'badge-red',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = { ...mockOrder, id: id ?? '1' };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <nav className="breadcrumb">
          <Link to="/orders" className="hover:text-slate-700">Orders</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">{order.orderNumber}</span>
        </nav>
        <div className="flex items-center gap-4">
          <h1 className="page-title">{order.orderNumber}</h1>
          <span className={statusBg[order.status]}>{order.status.replace('_', ' ')}</span>
        </div>
        <p className="page-subtitle">Created {order.createdAt} · Expected {order.expectedDelivery}</p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="section-header">Customer</h3>
          <p className="font-semibold text-slate-800">{order.customerName}</p>
          <p className="text-sm text-slate-500 mt-1">GSTIN: {order.customerGstin}</p>
        </div>
        <div className="card">
          <h3 className="section-header">Notes</h3>
          <p className="text-sm text-slate-600">{order.notes || '—'}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="section-header mb-0">Line Items</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Product', 'Qty', 'Unit', 'Rate', 'GST %', 'Total'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-3 font-medium text-slate-800">{item.productName}</td>
                <td className="px-5 py-3 tabular-nums">{item.quantity}</td>
                <td className="px-5 py-3 text-slate-500">{item.unit}</td>
                <td className="px-5 py-3 tabular-nums">{fmt(item.pricePerUnit)}</td>
                <td className="px-5 py-3">{item.taxPercent}%</td>
                <td className="px-5 py-3 font-semibold tabular-nums">{fmt(item.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-100">
            <tr>
              <td colSpan={5} className="px-5 py-3 text-right text-sm font-medium text-slate-600">Subtotal</td>
              <td className="px-5 py-3 font-semibold tabular-nums">{fmt(order.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={5} className="px-5 py-3 text-right text-sm font-medium text-slate-600">GST (18%)</td>
              <td className="px-5 py-3 font-semibold tabular-nums">{fmt(order.taxAmount)}</td>
            </tr>
            <tr className="bg-indigo-50">
              <td colSpan={5} className="px-5 py-3 text-right text-sm font-bold text-indigo-900">Grand Total</td>
              <td className="px-5 py-3 text-base font-bold text-indigo-900 tabular-nums">{fmt(order.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="btn-primary">Generate Invoice</button>
        <button className="btn-secondary">Update Status</button>
        <button className="btn-secondary">Print Order</button>
      </div>
    </div>
  );
}
