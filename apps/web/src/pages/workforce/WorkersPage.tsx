const workers = [
  { id: 'W001', name: 'Suresh Patil',    role: 'Welder',      department: 'Fabrication', dailyWage: 650, joiningDate: '2021-03-15', isActive: true },
  { id: 'W002', name: 'Ramesh Shinde',   role: 'Machinist',   department: 'Machining',   dailyWage: 700, joiningDate: '2020-07-01', isActive: true },
  { id: 'W003', name: 'Prashant Yadav',  role: 'Helper',      department: 'General',     dailyWage: 450, joiningDate: '2023-01-10', isActive: true },
  { id: 'W004', name: 'Kavita More',     role: 'QC Inspector',department: 'Quality',     dailyWage: 600, joiningDate: '2019-11-20', isActive: true },
  { id: 'W005', name: 'Anil Jadhav',     role: 'Crane Oper.', department: 'Logistics',   dailyWage: 720, joiningDate: '2022-05-05', isActive: false },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function WorkersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <span>ManufactOS</span>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Workforce</span>
          </nav>
          <h1 className="page-title">Workers</h1>
          <p className="page-subtitle">
            Manage your plant workforce — roles, wages, and departments. Attendance and payroll are tracked separately.
          </p>
        </div>
        <button className="btn-primary">+ Add Worker</button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Workers', value: workers.length },
          { label: 'Active',        value: workers.filter((w) => w.isActive).length },
          { label: 'Inactive',      value: workers.filter((w) => !w.isActive).length },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Employee #', 'Name', 'Role', 'Department', 'Daily Wage', 'Joining Date', 'Status'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {workers.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{w.id}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{w.name}</td>
                <td className="px-5 py-3 text-slate-600">{w.role}</td>
                <td className="px-5 py-3 text-slate-600">{w.department}</td>
                <td className="px-5 py-3 tabular-nums font-semibold">{fmt(w.dailyWage)}/day</td>
                <td className="px-5 py-3 text-slate-500">{w.joiningDate}</td>
                <td className="px-5 py-3">
                  <span className={w.isActive ? 'badge-green' : 'badge-slate'}>
                    {w.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
