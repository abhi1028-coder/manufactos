const portalFeatures = [
  {
    title: 'Order Placement',
    description: 'Customers can browse your product catalogue and place orders directly through the self-serve portal, reducing phone and email back-and-forth.',
    icon: '📦',
    phase: 'Phase 4',
    status: 'Planned',
  },
  {
    title: 'Invoice Downloads',
    description: 'Customers can view and download GST-compliant PDF invoices for any of their orders without needing to contact your team.',
    icon: '📄',
    phase: 'Phase 4',
    status: 'Planned',
  },
  {
    title: 'Payment Tracking',
    description: 'Real-time visibility into invoice status, due dates, and payment confirmations — reducing collection calls.',
    icon: '💳',
    phase: 'Phase 4',
    status: 'Planned',
  },
  {
    title: 'Order Tracking',
    description: 'Customers can track their order through each production stage: Confirmed → In Production → Ready → Dispatched → Delivered.',
    icon: '🔍',
    phase: 'Phase 4',
    status: 'Planned',
  },
];

export default function PortalHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <nav className="breadcrumb">
          <span>ManufactOS</span>
          <span className="breadcrumb-sep">›</span>
          <span className="text-slate-800 font-medium">Customer Portal</span>
        </nav>
        <h1 className="page-title">Customer Portal</h1>
        <p className="page-subtitle">
          Self-serve interface for your customers — order placement, invoice downloads, and payment tracking.
        </p>
      </div>

      {/* Status banner */}
      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-indigo-900">Phase 4 — Planned</p>
          <p className="text-sm text-indigo-700 mt-1">
            The Customer Portal is scoped for Phase 4 of the ManufactOS roadmap. The portal-service backend
            (port 8086) is already scaffolded and ready for sprint-by-sprint feature development.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portalFeatures.map((f) => (
          <div key={f.title} className="card opacity-80">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-800">{f.title}</p>
                  <span className="badge-slate text-xs">{f.phase}</span>
                </div>
                <p className="text-sm text-slate-600">{f.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Setup instructions */}
      <div className="card">
        <h3 className="section-header">Portal Preview URL</h3>
        <p className="text-sm text-slate-600">
          When Phase 4 development begins, customers will access the portal at:
        </p>
        <code className="mt-2 block bg-slate-100 rounded-lg px-4 py-2 text-sm text-indigo-700 font-mono">
          https://portal.yourdomain.com/&lt;plant-slug&gt;
        </code>
        <p className="text-sm text-slate-500 mt-2">
          Each plant will have its own branded sub-path with logo and contact details.
        </p>
      </div>
    </div>
  );
}
