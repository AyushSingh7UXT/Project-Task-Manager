import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AppLayout = ({ children }) => (
  <div className="min-h-screen lg:flex">
    <Sidebar />
    <div className="flex-1 pb-8">
      <Navbar />
      <main className="px-4 lg:px-0 lg:pr-6">{children}</main>
    </div>
  </div>
);

export default AppLayout;
