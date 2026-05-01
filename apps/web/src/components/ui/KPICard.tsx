interface KPICardProps {
  title: string;
  value: string;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
  accentColor?: string;
}

export default function KPICard({
  title,
  value,
  delta,
  deltaType = 'neutral',
  icon,
  subtitle,
  accentColor = 'bg-indigo-50 text-indigo-600',
}: KPICardProps) {
  const deltaColor =
    deltaType === 'up'
      ? 'text-emerald-600'
      : deltaType === 'down'
      ? 'text-red-500'
      : 'text-slate-500';

  const deltaIcon =
    deltaType === 'up' ? '↑' : deltaType === 'down' ? '↓' : '→';

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 flex items-start gap-4">
      {icon && (
        <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${accentColor}`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
        <div className="mt-1 flex items-center gap-2">
          {delta && (
            <span className={`text-xs font-semibold ${deltaColor}`}>
              {deltaIcon} {delta}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-slate-400">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
