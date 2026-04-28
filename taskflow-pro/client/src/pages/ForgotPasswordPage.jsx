import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (values) => {
    try {
      await api.post('/auth/forgot-password', values);
      toast.success('Reset link sent');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 w-full max-w-md space-y-3">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <input {...register('email')} placeholder="Enter email" className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800" />
        <button className="w-full py-3 rounded-xl bg-brand-600 text-white">Send Reset Link</button>
      </form>
    </div>
  );
}
