import Task from '../models/Task.js';
import Notification from '../models/Notification.js';

export const createTask = async (req, res) => {
  const payload = { ...req.body, owner: req.user._id };
  const task = await Task.create(payload);
  res.status(201).json({ success: true, task });
};

export const getTasks = async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { $or: [{ owner: req.user._id }, { assignedTo: req.user._id }] };
  const tasks = await Task.find(filter).populate('owner', 'name email').populate('assignedTo', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, tasks });
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('owner', 'name email').populate('assignedTo', 'name email');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ success: true, task });
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const isOwner = task.owner.toString() === req.user._id.toString();
  if (req.user.role !== 'admin' && !isOwner) return res.status(403).json({ message: 'Forbidden' });

  Object.assign(task, req.body);
  if (req.body.completed === true && !task.completed) {
    task.completed = true;
  }

  const updated = await task.save();

  if (Array.isArray(updated.assignedTo) && updated.assignedTo.length) {
    await Notification.insertMany(
      updated.assignedTo.map((userId) => ({
        user: userId,
        title: 'Task updated',
        message: `${updated.title} has been updated`
      }))
    );
  }

  res.json({ success: true, task: updated });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const isOwner = task.owner.toString() === req.user._id.toString();
  if (req.user.role !== 'admin' && !isOwner) return res.status(403).json({ message: 'Forbidden' });

  await task.deleteOne();
  res.json({ success: true, message: 'Task removed' });
};
