import jwt from 'jsonwebtoken';

export const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });

export const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken({ id: user._id, email: user.email, role: user.role });
  const cookieDays = Number(process.env.COOKIE_EXPIRES_DAYS || 7);

  res
    .status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: cookieDays * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        blocked: user.blocked,
        avatar: user.avatar
      }
    });
};
