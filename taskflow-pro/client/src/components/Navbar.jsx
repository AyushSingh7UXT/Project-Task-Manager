import { Bell, LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 p-4 lg:p-6">
      <div className="surface flex items-center justify-between gap-4 px-4 py-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-500 md:flex dark:border-slate-700 dark:bg-slate-900">
          <Search size={16} /> Search tasks, users, reports...
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => navigate('/notifications')} className="surface-muted grid h-10 w-10 place-items-center">
            <Bell size={16} />
          </button>
          <div className="hidden rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white dark:bg-white dark:text-slate-900 sm:block">
            {user?.name} · {user?.role}
          </div>
          <button
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="surface-muted grid h-10 w-10 place-items-center"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
