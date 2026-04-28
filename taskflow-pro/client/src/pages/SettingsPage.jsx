import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function SettingsPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    try {
      await api.put('/auth/change-password', values);
      toast.success('Password changed');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed');
    }
  };

  return <div className="space-y-4"><h2 className="text-2xl font-bold">Settings</h2><form onSubmit={handleSubmit(onSubmit)} className="glass p-4 space-y-3 max-w-lg"><input type="password" {...register('currentPassword')} placeholder="Current Password" className="w-full p-2 rounded bg-white/60 dark:bg-slate-800"/><input type="password" {...register('newPassword')} placeholder="New Password" className="w-full p-2 rounded bg-white/60 dark:bg-slate-800"/><button className="px-4 py-2 rounded bg-brand-600 text-white">Change Password</button></form></div>;
}
