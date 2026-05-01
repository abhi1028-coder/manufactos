import KPICard from '../../components/ui/KPICard';
import SalesTrendChart from '../../components/charts/SalesTrendChart';
import OrderStatusChart from '../../components/charts/OrderStatusChart';
import ReceivablesWidget from '../../components/charts/ReceivablesWidget';
import RecentOrdersTable from '../../components/tables/RecentOrdersTable';

const kpiData = [
  {
    title: 'Revenue (MTD)',
    value: '₹14.9L',
    delta: '+12.8% vs last month',
    deltaType: 'up' as const,
    subtitle: 'May 2024',
    accentColor: 'bg-indigo-50 text-indigo-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Active Orders',
    value: '68',
    delta: '+11 this week',
    deltaType: 'up' as const,
    subtitle: 'Across all stages',
    accentColor: 'bg-emerald-50 text-emerald-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: 'Pending Receivables',
    value: '₹12.6L',
    delta: '₹95K overdue',
    deltaType: 'down' as const,
    subtitle: '5 customers',
    accentColor: 'bg-amber-50 text-amber-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Workers Present',
    value: '42 / 50',
    delta: '84% attendance',
    deltaType: 'neutral' as const,
    subtitle: 'Today',
    accentColor: 'bg-sky-50 text-sky-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <nav className="breadcrumb">
          <span>ManufactOS</span>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">Dashboard</span>
        </nav>
        <h1 className="page-title">Operations Overview</h1>
        <p className="page-subtitle">Real-time snapshot of your plant's performance — May 2024</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesTrendChart />
        </div>
        <div>
          <OrderStatusChart />
        </div>
      </div>

      {/* Bottom row: Receivables + Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div>
          <ReceivablesWidget />
        </div>
        <div className="xl:col-span-2">
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
}
