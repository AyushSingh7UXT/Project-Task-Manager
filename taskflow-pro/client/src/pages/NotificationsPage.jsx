import { useEffect, useState } from 'react';
import api from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const load = () => api.get('/notifications').then((res) => setNotifications(res.data.notifications));
  useEffect(() => { load(); }, []);

  return <div className="space-y-3"><h2 className="text-2xl font-bold">Notifications</h2>{notifications.map((n) => <div key={n._id} className="glass p-3 flex justify-between"><div><p>{n.title}</p><p className="text-xs">{n.message}</p></div>{!n.read && <button onClick={async ()=>{await api.patch(`/notifications/${n._id}/read`);load();}} className="text-brand-600">Mark read</button>}</div>)}</div>;
}
