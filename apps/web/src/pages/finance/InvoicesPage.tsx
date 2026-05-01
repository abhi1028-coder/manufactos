import { Link } from 'react-router-dom';

const invoices = [
  { id: 'INV-0089', orderId: 'ORD-2024-0142', customer: 'Bharat Steel Pvt Ltd',  amount: 248000, cgst: 22320, sgst: 22320, dueDate: '2024-05-25', status: 'SENT'    },
  { id: 'INV-0088', orderId: 'ORD-2024-0141', customer: 'Apex Auto Components',  amount: 187500, cgst: 16875, sgst: 16875, dueDate: '2024-05-20', status: 'PAID'    },
  { id: 'INV-0087', orderId: 'ORD-2024-0139', customer: 'Kaveri Castings',        amount: 95000,  cgst: 8550,  sgst: 8550,  dueDate: '2024-04-15', status: 'OVERDUE' },
  { id: 'INV-0086', orderId: 'ORD-2024-0138', customer: 'Prakash Machinery',      amount: 412000, cgst: 37080, sgst: 37080, dueDate: '2024-05-30', status: 'DRAFT'   },
];

const statusCls: Record<string, string> = {
  SENT: 'badge-blue', PAID: 'badge-green', OVERDUE: 'badge-red', DRAFT: 'badge-slate',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <Link to="/finance" className="hover:text-slate-700">Finance</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Invoices</span>
          </nav>
          <h1 className="page-title">Invoices</h1>
          <p className="page-subtitle">
            Manage GST-compliant tax invoices. Send to customers, record payments, and track overdue amounts.
          </p>
        </div>
        <button className="btn-primary">+ Create Invoice</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input type="search" placeholder="Search invoices…" className="input-field max-w-xs" />
        <select className="input-field w-36">
          <option value="">All statuses</option>
          {['DRAFT','SENT','PAID','OVERDUE'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Invoice #', 'Order', 'Customer', 'CGST', 'SGST', 'Total', 'Due', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-indigo-600">{inv.id}</td>
                <td className="px-5 py-3 text-slate-500 text-xs">{inv.orderId}</td>
                <td className="px-5 py-3 text-slate-700">{inv.customer}</td>
                <td className="px-5 py-3 tabular-nums text-slate-600">{fmt(inv.cgst)}</td>
                <td className="px-5 py-3 tabular-nums text-slate-600">{fmt(inv.sgst)}</td>
                <td className="px-5 py-3 tabular-nums font-semibold text-slate-800">{fmt(inv.amount)}</td>
                <td className="px-5 py-3 text-slate-500">{inv.dueDate}</td>
                <td className="px-5 py-3"><span className={statusCls[inv.status]}>{inv.status}</span></td>
                <td className="px-5 py-3">
                  <button className="text-xs text-slate-400 hover:text-indigo-600">PDF ↓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
