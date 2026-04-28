import Task from '../models/Task.js';
import User from '../models/User.js';

export const getAnalytics = async (req, res) => {
  const [totalUsers, blockedUsers, totalTasks, completedTasks, overdueTasks, byStatus] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ blocked: true }),
    Task.countDocuments(),
    Task.countDocuments({ completed: true }),
    Task.countDocuments({ dueDate: { $lt: new Date() }, completed: false }),
    Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
  ]);

  res.json({
    success: true,
    analytics: {
      totalUsers,
      activeUsers: totalUsers - blockedUsers,
      blockedUsers,
      totalTasks,
      completedTasks,
      completionRate: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
      overdueTasks,
      byStatus
    }
  });
};

export const exportCSV = async (req, res) => {
  const tasks = await Task.find().populate('owner', 'name email');
  const header = 'Title,Status,Priority,Owner,DueDate,Completed\n';
  const rows = tasks
    .map((t) => `${t.title},${t.status},${t.priority},${t.owner?.email || ''},${t.dueDate?.toISOString() || ''},${t.completed}`)
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="taskflow-report.csv"');
  res.send(header + rows);
};

export const exportPDF = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ completed: true });
  const content = `TaskFlow Pro Report\n\nTotal Users: ${totalUsers}\nTotal Tasks: ${totalTasks}\nCompleted Tasks: ${completedTasks}\n`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="taskflow-report.pdf"');
  res.send(Buffer.from(content));
};
