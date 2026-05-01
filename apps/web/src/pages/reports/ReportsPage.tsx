const reports = [
  {
    title: 'Sales Register',
    description: 'Month-wise sales register with customer-level breakdowns. Export as Excel or PDF for GSTR-1 preparation.',
    category: 'Finance',
    icon: '📊',
    available: true,
  },
  {
    title: 'Outstanding Receivables Ageing',
    description: 'Categorise pending receivables into 0–30, 31–60, 61–90, and 90+ day buckets for collection prioritisation.',
    category: 'Finance',
    icon: '⏳',
    available: true,
  },
  {
    title: 'Order Fulfilment Report',
    description: 'On-time delivery rate, average production cycle time, and stage-wise order count for a date range.',
    category: 'Operations',
    icon: '📦',
    available: true,
  },
  {
    title: 'Expense Summary',
    description: 'Category-wise expense breakdown with month-on-month comparison. Includes top vendors by spend.',
    category: 'Finance',
    icon: '💰',
    available: true,
  },
  {
    title: 'Payroll Register',
    description: 'Monthly payroll register with individual worker-level gross, deductions, and net-pay. Compliant with MahaRera format.',
    category: 'Workforce',
    icon: '👷',
    available: false,
  },
  {
    title: 'Fleet Cost Analysis',
    description: 'Vehicle-wise fuel and toll costs, kilometre tracking, and cost-per-km calculations for fleet efficiency.',
    category: 'Fleet',
    icon: '🚛',
    available: false,
  },
  {
    title: 'Customer Profitability',
    description: 'Gross margin per customer after deducting direct costs. Identify high-value vs low-margin accounts.',
    category: 'Strategy',
    icon: '📈',
    available: false,
  },
  {
    title: 'AI Daily Briefing',
    description: 'Automated morning summary: yesterday\'s orders, today\'s dispatches, overdue collections, and top anomalies.',
    category: 'AI',
    icon: '✦',
    available: false,
  },
];

const categoryColor: Record<string, string> = {
  Finance:    'badge bg-indigo-50 text-indigo-700',
  Operations: 'badge bg-emerald-50 text-emerald-700',
  Workforce:  'badge bg-sky-50 text-sky-700',
  Fleet:      'badge bg-amber-50 text-amber-700',
  Strategy:   'badge bg-purple-50 text-purple-700',
  AI:         'badge bg-pink-50 text-pink-700',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <nav className="breadcrumb">
          <span>ManufactOS</span>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">Reports</span>
        </nav>
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">
          Downloadable and shareable reports across finance, operations, workforce, and fleet.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Finance', 'Operations', 'Workforce', 'Fleet', 'Strategy', 'AI'].map((cat) => (
          <button key={cat} className="btn-secondary text-xs py-1 px-3">
            {cat}
          </button>
        ))}
      </div>

      {/* Report grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.title} className={`card flex flex-col gap-3 ${r.available ? '' : 'opacity-60'}`}>
            <div className="flex items-start justify-between">
              <span className="text-2xl">{r.icon}</span>
              <span className={categoryColor[r.category]}>{r.category}</span>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">{r.title}</p>
              <p className="text-sm text-slate-500">{r.description}</p>
            </div>
            <div className="mt-auto flex gap-2">
              {r.available ? (
                <>
                  <button className="btn-primary text-xs py-1.5">Generate PDF</button>
                  <button className="btn-secondary text-xs py-1.5">Export Excel</button>
                </>
              ) : (
                <span className="badge-slate">Coming in future phase</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
