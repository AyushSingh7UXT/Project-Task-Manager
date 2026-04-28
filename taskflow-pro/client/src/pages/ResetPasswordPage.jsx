import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function ResetPasswordPage() {
  const { register, handleSubmit } = useForm();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) return toast.error('Passwords do not match');
    try {
      await api.post('/auth/reset-password', { token: params.get('token'), password: values.password });
      toast.success('Password reset complete');
      navigate('/login');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed');
    }
  };

  return <div className="min-h-screen grid place-items-center p-4"><form onSubmit={handleSubmit(onSubmit)} className="glass p-6 w-full max-w-md space-y-3"><h2 className="text-2xl font-bold">Reset Password</h2><input type="password" {...register('password')} placeholder="New password" className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800"/><input type="password" {...register('confirmPassword')} placeholder="Confirm password" className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800"/><button className="w-full py-3 rounded-xl bg-brand-600 text-white">Reset</button></form></div>;
}
