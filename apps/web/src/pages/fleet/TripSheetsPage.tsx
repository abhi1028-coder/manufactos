import { Link } from 'react-router-dom';

const trips = [
  { id: 'T001', tripNumber: 'TRIP-0058', vehicle: 'MH-12-AB-1234', driver: 'Anil Jadhav',      from: 'Pune Plant', to: 'Mumbai Warehouse', startTime: '2024-05-10 06:00', endTime: '2024-05-10 10:30', km: 164, fuel: 1800, toll: 220, status: 'COMPLETED' },
  { id: 'T002', tripNumber: 'TRIP-0057', vehicle: 'MH-12-CD-5678', driver: 'Ravi Pawar',        from: 'Pune Plant', to: 'Nashik Depot',      startTime: '2024-05-09 14:00', endTime: null,               km: null, fuel: null, toll: null, status: 'IN_PROGRESS' },
  { id: 'T003', tripNumber: 'TRIP-0056', vehicle: 'MH-14-EF-9101', driver: 'Sanjay Kulkarni',   from: 'Pune Plant', to: 'Solapur Factory',   startTime: '2024-05-09 08:00', endTime: '2024-05-09 14:00', km: 245, fuel: 2600, toll: 310, status: 'COMPLETED' },
];

const statusCls: Record<string, string> = {
  PLANNED:     'badge-blue',
  IN_PROGRESS: 'badge-yellow',
  COMPLETED:   'badge-green',
  CANCELLED:   'badge-red',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function TripSheetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <Link to="/fleet" className="hover:text-slate-700">Fleet</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Trip Sheets</span>
          </nav>
          <h1 className="page-title">Trip Sheets</h1>
          <p className="page-subtitle">
            Log and monitor every vehicle trip — track distance, fuel consumption, and toll expenses for cost control.
          </p>
        </div>
        <button className="btn-primary">+ New Trip</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Trips This Month', value: '14' },
          { label: 'Total KMs',        value: '2,847 km' },
          { label: 'Fuel Cost (MTD)',   value: '₹31,400' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Trip #', 'Vehicle', 'Driver', 'Route', 'Start', 'Distance', 'Fuel', 'Tolls', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {trips.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-indigo-600">{t.tripNumber}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">{t.vehicle}</td>
                <td className="px-4 py-3 text-slate-700">{t.driver}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">{t.from} → {t.to}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{t.startTime}</td>
                <td className="px-4 py-3 tabular-nums">{t.km ? `${t.km} km` : '—'}</td>
                <td className="px-4 py-3 tabular-nums">{t.fuel ? fmt(t.fuel) : '—'}</td>
                <td className="px-4 py-3 tabular-nums">{t.toll ? fmt(t.toll) : '—'}</td>
                <td className="px-4 py-3"><span className={statusCls[t.status]}>{t.status.replace('_', ' ')}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
