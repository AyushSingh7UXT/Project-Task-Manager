import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserX, Activity, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import StatCard from '../components/ui/StatCard';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/reports/analytics').then((res) => setAnalytics(res.data.analytics));
  }, []);

  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="surface p-6">
        <h2 className="text-3xl font-bold">Admin Control Center</h2>
        <p className="mt-2 text-sm text-slate-500">Monitor team performance, user lifecycle, and platform health from a single workspace.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={analytics.totalUsers} icon={Users} />
        <StatCard title="Blocked Users" value={analytics.blockedUsers} icon={UserX} color="from-rose-500 to-pink-400" />
        <StatCard title="Total Tasks" value={analytics.totalTasks} icon={Briefcase} color="from-indigo-500 to-blue-400" />
        <StatCard title="Completion Rate" value={`${analytics.completionRate}%`} icon={Activity} color="from-emerald-500 to-green-400" />
      </div>

      <div className="surface p-4 h-80">
        <h3 className="font-semibold mb-3">Task Status Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analytics.byStatus.map((s) => ({ status: s._id, count: s.count }))}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#5b7cff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
