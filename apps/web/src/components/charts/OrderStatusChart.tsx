import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const mockData = [
  { name: 'Delivered',     value: 148, color: '#10b981' },
  { name: 'In Production', value: 43,  color: '#6366f1' },
  { name: 'Confirmed',     value: 27,  color: '#f59e0b' },
  { name: 'Ready',         value: 18,  color: '#3b82f6' },
  { name: 'Cancelled',     value: 9,   color: '#f43f5e' },
];

export default function OrderStatusChart() {
  const total = mockData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
      <h3 className="text-base font-semibold text-slate-800 mb-4">Order Status Breakdown</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {mockData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        {/* Centre label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center mt-2">
            <p className="text-2xl font-bold text-slate-800">{total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
