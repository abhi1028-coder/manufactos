import { Link } from 'react-router-dom';

const payroll = [
  { id: 'W001', name: 'Suresh Patil',   presentDays: 26, absentDays: 0, grossAmount: 16900, deductions: 0,    netAmount: 16900, status: 'PROCESSED' },
  { id: 'W002', name: 'Ramesh Shinde',  presentDays: 25, absentDays: 1, grossAmount: 17500, deductions: 700,  netAmount: 16800, status: 'PAID'      },
  { id: 'W003', name: 'Prashant Yadav', presentDays: 20, absentDays: 6, grossAmount: 9000,  deductions: 2700, netAmount: 6300,  status: 'PENDING'   },
  { id: 'W004', name: 'Kavita More',    presentDays: 26, absentDays: 0, grossAmount: 15600, deductions: 0,    netAmount: 15600, status: 'PROCESSED' },
  { id: 'W005', name: 'Anil Jadhav',    presentDays: 13, absentDays: 13,grossAmount: 9360,  deductions: 9360, netAmount: 0,     status: 'PENDING'   },
];

const statusCls: Record<string, string> = {
  PENDING: 'badge-yellow', PROCESSED: 'badge-blue', PAID: 'badge-green',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const totalNet = payroll.reduce((s, p) => s + p.netAmount, 0);

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <Link to="/workforce" className="hover:text-slate-700">Workforce</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Payroll</span>
          </nav>
          <h1 className="page-title">Payroll — May 2024</h1>
          <p className="page-subtitle">
            Calculate and process monthly wages based on attendance records. Approve and mark as paid.
          </p>
        </div>
        <button className="btn-primary">Process All Pending</button>
      </div>

      {/* Summary */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Payroll — May 2024</p>
            <p className="text-3xl font-bold text-slate-900">{fmt(totalNet)}</p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="text-center">
              <p className="font-semibold text-amber-600">{payroll.filter((p) => p.status === 'PENDING').length}</p>
              <p className="text-slate-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-blue-600">{payroll.filter((p) => p.status === 'PROCESSED').length}</p>
              <p className="text-slate-500">Processed</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-emerald-600">{payroll.filter((p) => p.status === 'PAID').length}</p>
              <p className="text-slate-500">Paid</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Employee', 'Name', 'Present Days', 'Absent Days', 'Gross', 'Deductions', 'Net Pay', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payroll.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{p.id}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{p.name}</td>
                <td className="px-5 py-3 tabular-nums text-emerald-600">{p.presentDays}</td>
                <td className="px-5 py-3 tabular-nums text-red-500">{p.absentDays}</td>
                <td className="px-5 py-3 tabular-nums">{fmt(p.grossAmount)}</td>
                <td className="px-5 py-3 tabular-nums text-red-500">-{fmt(p.deductions)}</td>
                <td className="px-5 py-3 tabular-nums font-bold text-slate-900">{fmt(p.netAmount)}</td>
                <td className="px-5 py-3"><span className={statusCls[p.status]}>{p.status}</span></td>
                <td className="px-5 py-3">
                  {p.status === 'PENDING' && (
                    <button className="text-xs btn-secondary py-1">Process</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
