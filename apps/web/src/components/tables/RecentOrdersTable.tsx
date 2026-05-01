import { Link } from 'react-router-dom';
import type { Order, OrderStatus } from '../../types';

const mockOrders: Partial<Order>[] = [
  {
    id: '1', orderNumber: 'ORD-2024-0142', customerName: 'Bharat Steel Pvt Ltd',
    status: 'IN_PRODUCTION', totalAmount: 248000, createdAt: '2024-05-10',
  },
  {
    id: '2', orderNumber: 'ORD-2024-0141', customerName: 'Apex Auto Components',
    status: 'DELIVERED', totalAmount: 187500, createdAt: '2024-05-09',
  },
  {
    id: '3', orderNumber: 'ORD-2024-0140', customerName: 'Sunrise Fabricators',
    status: 'CONFIRMED', totalAmount: 320000, createdAt: '2024-05-08',
  },
  {
    id: '4', orderNumber: 'ORD-2024-0139', customerName: 'Kaveri Castings',
    status: 'READY', totalAmount: 95000, createdAt: '2024-05-07',
  },
  {
    id: '5', orderNumber: 'ORD-2024-0138', customerName: 'Prakash Machinery',
    status: 'DISPATCHED', totalAmount: 412000, createdAt: '2024-05-06',
  },
];

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  DRAFT:         { label: 'Draft',         className: 'badge-slate' },
  CONFIRMED:     { label: 'Confirmed',     className: 'badge-blue' },
  IN_PRODUCTION: { label: 'In Production', className: 'badge-yellow' },
  READY:         { label: 'Ready',         className: 'badge bg-purple-50 text-purple-700' },
  DISPATCHED:    { label: 'Dispatched',    className: 'badge bg-sky-50 text-sky-700' },
  DELIVERED:     { label: 'Delivered',     className: 'badge-green' },
  CANCELLED:     { label: 'Cancelled',     className: 'badge-red' },
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-base font-semibold text-slate-800">Recent Orders</h3>
        <Link to="/orders" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
          View all →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order #</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockOrders.map((order) => {
              const cfg = statusConfig[order.status as OrderStatus];
              return (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{order.customerName}</td>
                  <td className="px-5 py-3">
                    <span className={cfg.className}>{cfg.label}</span>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-800 tabular-nums">
                    {formatCurrency(order.totalAmount!)}
                  </td>
                  <td className="px-5 py-3 text-slate-500">{order.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
