import { Link } from 'react-router-dom';

const expenses = [
  { id: 'EXP-0041', category: 'Raw Material',  description: 'MS Billet purchase — Tata Steel',  amount: 185000, date: '2024-05-09', approvedBy: 'Rajesh K.' },
  { id: 'EXP-0040', category: 'Utilities',      description: 'Electricity bill — MSEDCL May',    amount: 42000,  date: '2024-05-08', approvedBy: 'Rajesh K.' },
  { id: 'EXP-0039', category: 'Labour',         description: 'Contract labour — welding team',   amount: 28000,  date: '2024-05-07', approvedBy: 'Priya M.'  },
  { id: 'EXP-0038', category: 'Logistics',      description: 'Transport to Pune warehouse',      amount: 8500,   date: '2024-05-06', approvedBy: 'Priya M.'  },
  { id: 'EXP-0037', category: 'Maintenance',    description: 'Lathe machine servicing',         amount: 12000,  date: '2024-05-05', approvedBy: 'Rajesh K.' },
];

const categoryColor: Record<string, string> = {
  'Raw Material': 'badge bg-indigo-50 text-indigo-700',
  Utilities:      'badge bg-sky-50 text-sky-700',
  Labour:         'badge bg-emerald-50 text-emerald-700',
  Logistics:      'badge bg-amber-50 text-amber-700',
  Maintenance:    'badge bg-purple-50 text-purple-700',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const total = expenses.reduce((s, e) => s + e.amount, 0);

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <Link to="/finance" className="hover:text-slate-700">Finance</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Expenses</span>
          </nav>
          <h1 className="page-title">Expenses</h1>
          <p className="page-subtitle">
            Log and categorise all plant expenditures. Approve entries and attach receipts for audit readiness.
          </p>
        </div>
        <button className="btn-primary">+ Add Expense</button>
      </div>

      {/* Summary */}
      <div className="card flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Total Expenses (This Month)</p>
          <p className="text-2xl font-bold text-slate-900">{fmt(total)}</p>
        </div>
        <div className="flex gap-6 text-sm">
          {['Raw Material', 'Utilities', 'Labour', 'Logistics', 'Maintenance'].map((cat) => {
            const amt = expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0);
            return (
              <div key={cat} className="text-center">
                <p className="text-slate-500 text-xs">{cat}</p>
                <p className="font-semibold text-slate-800">{fmt(amt)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['#', 'Category', 'Description', 'Amount', 'Date', 'Approved By'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-500 text-xs">{exp.id}</td>
                <td className="px-5 py-3">
                  <span className={categoryColor[exp.category] ?? 'badge-slate'}>{exp.category}</span>
                </td>
                <td className="px-5 py-3 text-slate-700">{exp.description}</td>
                <td className="px-5 py-3 font-semibold tabular-nums">{fmt(exp.amount)}</td>
                <td className="px-5 py-3 text-slate-500">{exp.date}</td>
                <td className="px-5 py-3 text-slate-600">{exp.approvedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
