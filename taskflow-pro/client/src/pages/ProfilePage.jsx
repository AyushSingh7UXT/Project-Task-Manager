import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: { name: user?.name, avatar: user?.avatar } });

  const onSubmit = async (values) => {
    const { data } = await api.put('/auth/profile', values);
    setUser(data.user);
    toast.success('Profile updated');
  };

  return <div className="space-y-4"><h2 className="text-2xl font-bold">Profile</h2><form onSubmit={handleSubmit(onSubmit)} className="glass p-4 space-y-3 max-w-lg"><input {...register('name')} className="w-full p-2 rounded bg-white/60 dark:bg-slate-800"/><input {...register('avatar')} placeholder="Avatar URL" className="w-full p-2 rounded bg-white/60 dark:bg-slate-800"/><button className="px-4 py-2 rounded bg-brand-600 text-white">Save</button></form></div>;
}
