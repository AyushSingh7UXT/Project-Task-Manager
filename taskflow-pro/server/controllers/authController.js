import crypto from 'crypto';
import { body } from 'express-validator';
import User from '../models/User.js';
import { sendTokenResponse } from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
];

export const register = async (req, res) => {
  const { name, email, password, role = 'user', adminSecretToken } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  if (role === 'admin' && adminSecretToken !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(400).json({ message: 'Invalid Admin Token' });
  }

  const user = await User.create({ name, email, password, role: role === 'admin' ? 'admin' : 'user' });
  sendTokenResponse(user, 201, res);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.blocked) return res.status(403).json({ message: 'Account blocked' });

  const matched = await user.matchPassword(password);
  if (!matched) return res.status(401).json({ message: 'Invalid credentials' });

  sendTokenResponse(user, 200, res);
};

export const logout = async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out' });
};

export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.avatar = req.body.avatar || user.avatar;
  const updated = await user.save();
  res.json({ success: true, user: updated });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  const matched = await user.matchPassword(currentPassword);
  if (!matched) return res.status(400).json({ message: 'Current password is incorrect' });

  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: 'Password changed successfully' });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: 'TaskFlow Pro Password Reset',
    html: `<p>Reset your password by clicking <a href="${resetUrl}">here</a>. Link valid for 15 minutes.</p>`
  });

  res.json({ success: true, message: 'Reset email sent' });
};

export const resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.body.token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successful' });
};
