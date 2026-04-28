import { CheckCircle2, Clock3, Flame, ListTodo } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import useTasks from '../hooks/useTasks';
import StatCard from '../components/ui/StatCard';

export default function DashboardPage() {
  const { tasks } = useTasks();
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;

  const data = [
    { name: 'Mon', score: 40 },
    { name: 'Tue', score: 62 },
    { name: 'Wed', score: 55 },
    { name: 'Thu', score: 74 },
    { name: 'Fri', score: 81 },
    { name: 'Sat', score: 68 },
    { name: 'Sun', score: 88 }
  ];

  return (
    <div className="space-y-6">
      <div className="surface p-6">
        <p className="text-sm text-slate-500">Welcome back 👋</p>
        <h2 className="mt-1 text-3xl font-bold">Drive growth with focused execution</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">Track your daily goals, improve consistency, and finish meaningful work faster.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={tasks.length} icon={ListTodo} />
        <StatCard title="Pending" value={pending} icon={Clock3} color="from-amber-500 to-orange-400" />
        <StatCard title="Completed" value={completed} icon={CheckCircle2} color="from-emerald-500 to-green-400" />
        <StatCard title="Daily Streak" value={Math.max(1, Math.min(14, completed))} icon={Flame} color="from-rose-500 to-pink-400" />
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <div className="surface p-4 xl:col-span-2 h-80">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Weekly Productivity</h3>
            <span className="rounded-lg bg-brand-50 px-2 py-1 text-xs text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">+8.2%</span>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4d6cf0" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#4d6cf0" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#4d6cf0" strokeWidth={3} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="surface p-4">
          <h3 className="font-semibold">Insights</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Pomodoro recommendation: 4 deep-focus sessions.</li>
            <li>• Smart priority: {overdue > 0 ? 'Address overdue items first.' : 'Workload is healthy.'}</li>
            <li>• Habit score: {completed > 2 ? 'Strong momentum.' : 'Build daily consistency.'}</li>
            <li>• Upcoming deadlines: {overdue} overdue flagged.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
