import { Link } from 'react-router-dom';

const vehicles = [
  { id: 'V001', reg: 'MH-12-AB-1234', make: 'Tata',   model: 'LPT 709',  type: 'TRUCK', driver: 'Anil Jadhav',   isActive: true  },
  { id: 'V002', reg: 'MH-12-CD-5678', make: 'Ashok',  model: 'Dost+',    type: 'TEMPO', driver: 'Ravi Pawar',    isActive: true  },
  { id: 'V003', reg: 'MH-14-EF-9101', make: 'Force',  model: 'Traveller',type: 'VAN',   driver: 'Sanjay Kulkarni',isActive: true },
  { id: 'V004', reg: 'MH-12-GH-1122', make: 'Tata',   model: 'Ultra 812',type: 'TRUCK', driver: null,            isActive: false },
];

const typeColor: Record<string, string> = {
  TRUCK: 'badge bg-indigo-50 text-indigo-700',
  TEMPO: 'badge bg-emerald-50 text-emerald-700',
  VAN:   'badge bg-sky-50 text-sky-700',
  OTHER: 'badge-slate',
};

export default function FleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <nav className="breadcrumb">
            <span>ManufactOS</span>
            <span className="breadcrumb-sep">›</span>
            <span className="text-slate-800 font-medium">Fleet</span>
          </nav>
          <h1 className="page-title">Fleet Management</h1>
          <p className="page-subtitle">
            Track your vehicles, driver assignments, and maintenance schedules. Trip sheets are logged separately.
          </p>
        </div>
        <Link to="/fleet/trips" className="btn-secondary">Trip Sheets</Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Vehicles', value: vehicles.length },
          { label: 'Active',         value: vehicles.filter((v) => v.isActive).length },
          { label: 'In Transit',     value: 2 },
          { label: 'Under Maintenance', value: 1 },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Vehicle cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={typeColor[v.type]}>{v.type}</span>
                  <span className={v.isActive ? 'badge-green' : 'badge-red'}>
                    {v.isActive ? 'Active' : 'Off Road'}
                  </span>
                </div>
                <p className="font-bold text-slate-800 text-lg">{v.reg}</p>
                <p className="text-sm text-slate-500">{v.make} {v.model}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{v.driver ?? 'Unassigned'}</p>
                <p className="text-xs text-slate-400">Driver</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-secondary text-xs py-1">Log Trip</button>
              <button className="btn-secondary text-xs py-1">Service</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
