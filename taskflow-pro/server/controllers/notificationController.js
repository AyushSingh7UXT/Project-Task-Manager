import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, notifications });
};

export const markNotificationRead = async (req, res) => {
  const notif = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!notif) return res.status(404).json({ message: 'Notification not found' });
  notif.read = true;
  await notif.save();
  res.json({ success: true, notification: notif });
};
