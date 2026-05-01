import { Link } from 'react-router-dom';

const today = '2024-05-10';

const attendance = [
  { id: 'W001', name: 'Suresh Patil',   status: 'PRESENT',  checkIn: '08:02', checkOut: '17:15', overtime: 0   },
  { id: 'W002', name: 'Ramesh Shinde',  status: 'PRESENT',  checkIn: '07:55', checkOut: '18:30', overtime: 1.5 },
  { id: 'W003', name: 'Prashant Yadav', status: 'ABSENT',   checkIn: null,    checkOut: null,    overtime: 0   },
  { id: 'W004', name: 'Kavita More',    status: 'PRESENT',  checkIn: '08:10', checkOut: '17:05', overtime: 0   },
  { id: 'W005', name: 'Anil Jadhav',    status: 'HALF_DAY', checkIn: '13:00', checkOut: '17:00', overtime: 0   },
];

const statusCls: Record<string, string> = {
  PRESENT:  'badge-green',
  ABSENT:   'badge-red',
  HALF_DAY: 'badge-yellow',
  LEAVE:    'badge-blue',
  HOLIDAY:  'badge-slate',
};

const statusLabel: Record<string, string> = {
  PRESENT: 'Present', ABSENT: 'Absent', HALF_DAY: 'Half Day', LEAVE: 'Leave', HOLIDAY: 'Holiday',
};

export default function AttendancePage() {
  const presentCount = attendance.filter((a) => a.status === 'PRESENT').length;

  return (
    <div className="space-y-6">
      <div>
        <nav className="breadcrumb">
          <Link to="/workforce" className="hover:text-slate-700">Workforce</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">Attendance</span>
        </nav>
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          Daily attendance log with check-in / check-out times and overtime tracking. Date: {today}.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Present',  value: presentCount, cls: 'text-emerald-600' },
          { label: 'Absent',   value: attendance.filter((a) => a.status === 'ABSENT').length,   cls: 'text-red-500' },
          { label: 'Half Day', value: attendance.filter((a) => a.status === 'HALF_DAY').length, cls: 'text-amber-600' },
          { label: 'On Leave', value: attendance.filter((a) => a.status === 'LEAVE').length,    cls: 'text-blue-600' },
        ].map((s) => (
          <div key={s.label} className="card text-center">
            <p className={`text-3xl font-bold ${s.cls}`}>{s.value}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Date selector */}
      <div className="flex gap-3 items-center">
        <label className="text-sm font-medium text-slate-600">Date:</label>
        <input type="date" defaultValue={today} className="input-field w-40" />
        <button className="btn-secondary text-xs">Mark Bulk</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {['Employee', 'Name', 'Status', 'Check-In', 'Check-Out', 'OT Hours'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {attendance.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-mono text-xs text-slate-500">{a.id}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{a.name}</td>
                <td className="px-5 py-3">
                  <span className={statusCls[a.status]}>{statusLabel[a.status]}</span>
                </td>
                <td className="px-5 py-3 tabular-nums text-slate-600">{a.checkIn ?? '—'}</td>
                <td className="px-5 py-3 tabular-nums text-slate-600">{a.checkOut ?? '—'}</td>
                <td className="px-5 py-3 tabular-nums text-slate-600">
                  {a.overtime > 0 ? `${a.overtime}h` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
