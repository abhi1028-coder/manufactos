import { Link } from 'react-router-dom';
import type { OrderStatus } from '../../types';

const mockOrders = [
  { id: '1', orderNumber: 'ORD-2024-0142', customerName: 'Bharat Steel Pvt Ltd',   status: 'IN_PRODUCTION' as OrderStatus, totalAmount: 248000, createdAt: '2024-05-10', expectedDelivery: '2024-05-20' },
  { id: '2', orderNumber: 'ORD-2024-0141', customerName: 'Apex Auto Components',   status: 'DELIVERED'     as OrderStatus, totalAmount: 187500, createdAt: '2024-05-09', expectedDelivery: '2024-05-15' },
  { id: '3', orderNumber: 'ORD-2024-0140', customerName: 'Sunrise Fabricators',    status: 'CONFIRMED'     as OrderStatus, totalAmount: 320000, createdAt: '2024-05-08', expectedDelivery: '2024-05-22' },
  { id: '4', orderNumber: 'ORD-2024-0139', customerName: 'Kaveri Castings',         status: 'READY'         as OrderStatus, totalAmount: 95000,  createdAt: '2024-05-07', expectedDelivery: '2024-05-11' },
  { id: '5', orderNumber: 'ORD-2024-0138', customerName: 'Prakash Machinery',       status: 'DISPATCHED'    as OrderStatus, totalAmount: 412000, createdAt: '2024-05-06', expectedDelivery: '2024-05-12' },
  { id: '6', orderNumber: 'ORD-2024-0137', customerName: 'Nirmala Plastics',        status: 'DRAFT'         as OrderStatus, totalAmount: 78000,  createdAt: '2024-05-05', expectedDelivery: '2024-05-25' },
  { id: '7', orderNumber: 'ORD-2024-0136', customerName: 'Vimal Engineering',       status: 'CANCELLED'     as OrderStatus, totalAmount: 135000, createdAt: '2024-05-04', expectedDelivery: '2024-05-18' },
];

const statusBadge: Record<OrderStatus, string> = {
  DRAFT:         'badge-slate',
  CONFIRMED:     'badge-blue',
  IN_PRODUCTION: 'badge-yellow',
  READY:         'badge bg-purple-50 text-purple-700',
  DISPATCHED:    'badge bg-sky-50 text-sky-700',
  DELIVERED:     'badge-green',
  CANCELLED:     'badge-red',
};

const statusLabel: Record<OrderStatus, string> = {
  DRAFT: 'Draft', CONFIRMED: 'Confirmed', IN_PRODUCTION: 'In Production',
  READY: 'Ready', DISPATCHED: 'Dispatched', DELIVERED: 'Delivered', CANCELLED: 'Cancelled',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function OrdersListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <span>ManufactOS</span>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Orders</span>
          </nav>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">Track, manage, and create production orders for your plant.</p>
        </div>
        <Link to="/orders/new" className="btn-primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Order
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search orders, customers…"
          className="input-field max-w-xs"
        />
        <select className="input-field w-40">
          <option value="">All statuses</option>
          {Object.entries(statusLabel).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <input type="date" className="input-field w-40" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Order #', 'Customer', 'Status', 'Amount', 'Created', 'Delivery'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockOrders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <Link to={`/orders/${o.id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-700">{o.customerName}</td>
                <td className="px-5 py-3">
                  <span className={statusBadge[o.status]}>{statusLabel[o.status]}</span>
                </td>
                <td className="px-5 py-3 font-semibold tabular-nums text-slate-800">{fmt(o.totalAmount)}</td>
                <td className="px-5 py-3 text-slate-500">{o.createdAt}</td>
                <td className="px-5 py-3 text-slate-500">{o.expectedDelivery}</td>
                <td className="px-5 py-3">
                  <Link to={`/orders/${o.id}`} className="text-xs text-slate-400 hover:text-indigo-600">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
