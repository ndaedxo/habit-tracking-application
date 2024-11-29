import { Link, Outlet, useLocation } from 'react-router-dom';
import { List, LineChart, Calendar, Trophy } from 'lucide-react';

const navItems = [
  { to: '/', icon: List, label: 'Habits' },
  { to: '/progress', icon: LineChart, label: 'Progress' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-3xl pb-24">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-around py-2">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center p-2 ${
                    isActive ? 'text-rose-500' : 'text-gray-500'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}