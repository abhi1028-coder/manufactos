import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const mockData = [
  { month: 'Nov', revenue: 820000, orders: 34 },
  { month: 'Dec', revenue: 940000, orders: 41 },
  { month: 'Jan', revenue: 780000, orders: 29 },
  { month: 'Feb', revenue: 1050000, orders: 47 },
  { month: 'Mar', revenue: 1180000, orders: 53 },
  { month: 'Apr', revenue: 1320000, orders: 61 },
  { month: 'May', revenue: 1490000, orders: 68 },
];

const formatCurrency = (value: number) =>
  `₹${(value / 100000).toFixed(1)}L`;

export default function SalesTrendChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
      <h3 className="text-base font-semibold text-slate-800 mb-4">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={mockData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(value: number, name: string) =>
              name === 'revenue' ? [formatCurrency(value), 'Revenue'] : [value, 'Orders']
            }
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)',
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#34d399"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#34d399', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
            yAxisId={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
