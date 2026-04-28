import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-6xl font-black">404</h1><p>Page not found</p><Link className="text-brand-600" to="/dashboard">Go Home</Link></div></div>;
}
