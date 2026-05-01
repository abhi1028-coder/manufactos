import { Link } from 'react-router-dom';
import KPICard from '../../components/ui/KPICard';

const kpis = [
  { title: 'Total Revenue (YTD)', value: '₹84.2L', delta: '+18% vs last year', deltaType: 'up' as const, accentColor: 'bg-emerald-50 text-emerald-600' },
  { title: 'Pending Invoices', value: '₹12.6L', delta: '23 invoices', deltaType: 'neutral' as const, accentColor: 'bg-amber-50 text-amber-600' },
  { title: 'Overdue (>30d)', value: '₹95K', delta: '3 customers', deltaType: 'down' as const, accentColor: 'bg-red-50 text-red-600' },
  { title: 'Expenses (MTD)', value: '₹4.2L', delta: '+5% vs last month', deltaType: 'down' as const, accentColor: 'bg-slate-100 text-slate-600' },
];

const recentInvoices = [
  { id: 'INV-0089', customer: 'Bharat Steel',     amount: 248000, dueDate: '2024-05-25', status: 'SENT'    },
  { id: 'INV-0088', customer: 'Apex Auto',         amount: 187500, dueDate: '2024-05-20', status: 'PAID'    },
  { id: 'INV-0087', customer: 'Kaveri Castings',   amount: 95000,  dueDate: '2024-04-15', status: 'OVERDUE' },
];

const statusCls: Record<string, string> = {
  SENT: 'badge-blue', PAID: 'badge-green', OVERDUE: 'badge-red', DRAFT: 'badge-slate',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <nav className="breadcrumb">
          <span>ManufactOS</span>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">Finance</span>
        </nav>
        <h1 className="page-title">Finance Overview</h1>
        <p className="page-subtitle">GST invoicing, receivables tracking, and expense management for your plant.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Quick nav cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/finance/invoices" className="card hover:shadow-card-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Invoices</p>
              <p className="text-sm text-slate-500">Create & send GST-compliant invoices, track payments</p>
            </div>
          </div>
        </Link>
        <Link to="/finance/expenses" className="card hover:shadow-card-md transition-shadow group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Expenses</p>
              <p className="text-sm text-slate-500">Log, categorise, and approve plant expenses</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent invoices */}
      <div className="card">
        <h3 className="section-header">Recent Invoices</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-100">
              {['Invoice', 'Customer', 'Amount', 'Due Date', 'Status'].map((h) => (
                <th key={h} className="pb-2 text-xs font-semibold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-3 font-medium text-indigo-600">{inv.id}</td>
                <td className="py-3 text-slate-700">{inv.customer}</td>
                <td className="py-3 font-semibold tabular-nums">{fmt(inv.amount)}</td>
                <td className="py-3 text-slate-500">{inv.dueDate}</td>
                <td className="py-3"><span className={statusCls[inv.status]}>{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
