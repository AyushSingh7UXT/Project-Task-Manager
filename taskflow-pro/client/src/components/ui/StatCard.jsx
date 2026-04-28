import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'from-brand-600 to-blue-500' }) => (
  <motion.div whileHover={{ y: -2 }} className="surface p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      </div>
      <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white ${color}`}>
        <Icon size={18} />
      </div>
    </div>
  </motion.div>
);

export default StatCard;
