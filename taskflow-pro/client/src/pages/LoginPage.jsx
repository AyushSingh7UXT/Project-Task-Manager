import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (values) => {
    try {
      const user = await login(values);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 md:grid-cols-2">
        <div className="hidden p-10 md:block bg-gradient-to-br from-brand-600 via-blue-500 to-indigo-600 text-white">
          <h2 className="text-4xl font-bold leading-tight">Boost your productivity with clean task workflows.</h2>
          <p className="mt-4 text-white/85">Modern minimal workspace for teams and solo builders.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10 space-y-4">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-sm text-slate-500">Sign in to continue to TaskFlow Pro.</p>
          <input {...register('email')} className="input-modern" placeholder="Email" />
          <input type="password" {...register('password')} className="input-modern" placeholder="Password" />
          <div className="flex justify-between text-sm text-slate-500">
            <label><input type="checkbox" className="mr-2" />Remember me</label>
            <Link to="/forgot-password" className="text-brand-600">Forgot password?</Link>
          </div>
          <button className="btn-primary w-full">Login</button>
          <p className="text-sm">New user? <Link to="/register" className="text-brand-600">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
