interface ReceivableRow {
  customer: string;
  amount: number;
  overdueDays: number;
}

const mockReceivables: ReceivableRow[] = [
  { customer: 'Bharat Steel Pvt Ltd',  amount: 248000,  overdueDays: 0  },
  { customer: 'Sunrise Fabricators',   amount: 187500,  overdueDays: 12 },
  { customer: 'Apex Auto Components',  amount: 320000,  overdueDays: 0  },
  { customer: 'Kaveri Castings',        amount: 95000,   overdueDays: 45 },
  { customer: 'Prakash Machinery',      amount: 412000,  overdueDays: 7  },
];

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function ReceivablesWidget() {
  const total = mockReceivables.reduce((s, r) => s + r.amount, 0);
  const overdue = mockReceivables
    .filter((r) => r.overdueDays > 0)
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">Receivables</h3>
        <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
          {formatCurrency(overdue)} overdue
        </span>
      </div>

      {/* Summary bars */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500">Total Outstanding</p>
          <p className="text-lg font-bold text-slate-800">{formatCurrency(total)}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-red-500">Overdue (&gt;30d)</p>
          <p className="text-lg font-bold text-red-600">{formatCurrency(overdue)}</p>
        </div>
      </div>

      {/* Top customers */}
      <div className="space-y-2">
        {mockReceivables.map((row) => (
          <div key={row.customer} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-slate-700">{row.customer}</p>
              {row.overdueDays > 0 && (
                <p className="text-xs text-red-500">{row.overdueDays}d overdue</p>
              )}
            </div>
            <span className={`text-sm font-semibold ${row.overdueDays > 30 ? 'text-red-600' : 'text-slate-800'}`}>
              {formatCurrency(row.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
