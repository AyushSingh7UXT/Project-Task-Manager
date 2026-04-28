import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const load = () => api.get('/users').then((res) => setUsers(res.data.users));
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <div className="grid gap-3">
        {users.map((u) => (
          <div key={u._id} className="glass p-3 flex justify-between items-center">
            <div><p>{u.name}</p><p className="text-xs text-slate-500">{u.email} • {u.role}</p></div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-amber-500 text-white" onClick={async () => { await api.patch(`/users/block/${u._id}`); load(); }}>{u.blocked ? 'Unblock' : 'Block'}</button>
              <button className="px-3 py-1 rounded bg-rose-500 text-white" onClick={async () => { await api.delete(`/users/${u._id}`); load(); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
