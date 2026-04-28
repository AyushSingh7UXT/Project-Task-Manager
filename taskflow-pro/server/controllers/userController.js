import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, users });
};

export const createUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ success: true, user });
};

export const updateUser = async (req, res) => {
  const target = await User.findById(req.params.id);
  if (!target) return res.status(404).json({ message: 'User not found' });

  if (req.user.role !== 'admin' && req.user._id.toString() !== target._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (target.role === 'admin' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Cannot edit admin account' });
  }

  target.name = req.body.name ?? target.name;
  target.email = req.body.email ?? target.email;
  if (req.user.role === 'admin') {
    target.role = req.body.role ?? target.role;
  }

  const updated = await target.save();
  res.json({ success: true, user: updated });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User deleted' });
};

export const blockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.blocked = !user.blocked;
  await user.save();
  res.json({ success: true, user, message: `User ${user.blocked ? 'blocked' : 'unblocked'}` });
};

export const resetUserPassword = async (req, res) => {
  const user = await User.findById(req.params.id).select('+password');
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = req.body.newPassword || 'Temp@12345';
  await user.save();
  res.json({ success: true, message: 'User password reset' });
};
