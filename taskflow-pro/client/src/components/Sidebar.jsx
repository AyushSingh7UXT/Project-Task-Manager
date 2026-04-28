import { LayoutDashboard, ShieldCheck, CheckSquare, KanbanSquare, CalendarDays, FileText, Users, Settings, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const links = [
    { to: user?.role === 'admin' ? '/admin/dashboard' : '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tasks', label: 'My Tasks', icon: CheckSquare },
    { to: '/kanban', label: 'Kanban', icon: KanbanSquare },
    { to: '/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/reports', label: 'Reports', icon: FileText },
    { to: '/profile', label: 'Profile', icon: UserCircle },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  if (user?.role === 'admin') links.splice(1, 0, { to: '/manage-users', label: 'Manage Users', icon: Users }, { to: '/admin/dashboard', label: 'Admin Center', icon: ShieldCheck });

  return (
    <aside className="hidden lg:block lg:w-72 lg:p-6">
      <div className="surface sticky top-6 h-[calc(100vh-3rem)] p-5">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-blue-500 font-black text-white">T</div>
          <div>
            <p className="text-sm font-semibold">TaskFlow Pro</p>
            <p className="text-xs text-slate-500">Productivity SaaS</p>
          </div>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to + label}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-blue-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
