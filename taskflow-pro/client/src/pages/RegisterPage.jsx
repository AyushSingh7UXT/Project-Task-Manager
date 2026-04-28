import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, handleSubmit, watch } = useForm({ defaultValues: { role: 'user' } });
  const role = watch('role');
  const [loading, setLoading] = useState(false);
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) return toast.error('Passwords do not match');
    try {
      setLoading(true);
      if (values.role === 'admin' && values.adminSecretToken !== 'ADMIN2026') return toast.error('Invalid Admin Token');
      const user = await doRegister(values);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-xl p-8 space-y-3">
        <h2 className="text-3xl font-bold">Create account</h2>
        <p className="text-sm text-slate-500">Start your workspace in less than a minute.</p>
        <input {...register('name')} className="input-modern" placeholder="Full Name" />
        <input {...register('email')} className="input-modern" placeholder="Email Address" />
        <div className="grid sm:grid-cols-2 gap-3">
          <input type="password" {...register('password')} className="input-modern" placeholder="Password" />
          <input type="password" {...register('confirmPassword')} className="input-modern" placeholder="Confirm Password" />
        </div>
        <select {...register('role')} className="input-modern">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {role === 'admin' && <input {...register('adminSecretToken')} className="input-modern" placeholder="Admin Secret Token" />}
        <button disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Register'}</button>
        <p className="text-sm">Already have account? <Link to="/login" className="text-brand-600">Login</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
