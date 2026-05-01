import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Lazy-loaded pages
const LoginPage              = lazy(() => import('./pages/auth/LoginPage'));
const DashboardPage          = lazy(() => import('./pages/dashboard/DashboardPage'));
const OrdersListPage         = lazy(() => import('./pages/orders/OrdersListPage'));
const OrderDetailPage        = lazy(() => import('./pages/orders/OrderDetailPage'));
const CreateOrderPage        = lazy(() => import('./pages/orders/CreateOrderPage'));
const FinanceDashboard       = lazy(() => import('./pages/finance/FinanceDashboard'));
const InvoicesPage           = lazy(() => import('./pages/finance/InvoicesPage'));
const ExpensesPage           = lazy(() => import('./pages/finance/ExpensesPage'));
const WorkersPage            = lazy(() => import('./pages/workforce/WorkersPage'));
const AttendancePage         = lazy(() => import('./pages/workforce/AttendancePage'));
const PayrollPage            = lazy(() => import('./pages/workforce/PayrollPage'));
const FleetPage              = lazy(() => import('./pages/fleet/FleetPage'));
const TripSheetsPage         = lazy(() => import('./pages/fleet/TripSheetsPage'));
const PortalHomePage         = lazy(() => import('./pages/portal/PortalHomePage'));
const AIBoardPage            = lazy(() => import('./pages/ai-board/AIBoardPage'));
const ReportsPage            = lazy(() => import('./pages/reports/ReportsPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* App routes */}
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/orders/new" element={<CreateOrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />

            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/finance/invoices" element={<InvoicesPage />} />
            <Route path="/finance/expenses" element={<ExpensesPage />} />

            <Route path="/workforce" element={<WorkersPage />} />
            <Route path="/workforce/attendance" element={<AttendancePage />} />
            <Route path="/workforce/payroll" element={<PayrollPage />} />

            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/fleet/trips" element={<TripSheetsPage />} />

            <Route path="/portal" element={<PortalHomePage />} />
            <Route path="/ai-board" element={<AIBoardPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
