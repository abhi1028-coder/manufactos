import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import { useAppSelector } from '../store';

export default function MainLayout() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-200 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
