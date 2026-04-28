import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

export default function ReportsPage() {
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => { api.get('/reports/analytics').then((res) => setAnalytics(res.data.analytics)); }, []);
  if (!analytics) return <p>Loading...</p>;

  const data = [
    { name: 'Users', value: analytics.totalUsers },
    { name: 'Tasks', value: analytics.totalTasks },
    { name: 'Completed', value: analytics.completedTasks },
    { name: 'Overdue', value: analytics.overdueTasks }
  ];

  return <div className="space-y-4"><h2 className="text-2xl font-bold">Reports & Analytics</h2><div className="glass p-4 h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line dataKey="value" stroke="#5b7cff" strokeWidth={3}/></LineChart></ResponsiveContainer></div><div className="flex gap-3"><a className="px-4 py-2 rounded bg-brand-600 text-white" href="/api/reports/export/csv">Download CSV</a><a className="px-4 py-2 rounded bg-slate-800 text-white" href="/api/reports/export/pdf">Download PDF</a></div></div>;
}
