import * as authService from '../services/auth.service.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: '請提供帳號與密碼' });
    }
    const result = await authService.login(username, password);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || '伺服器內部錯誤' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body || {};
    const result = await authService.resetPassword(req.user.userId, oldPassword, newPassword);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || '伺服器內部錯誤' });
  }
}

export async function me(req, res) {
  return res.status(200).json({ user: req.user });
}