import bcrypt from 'bcryptjs';
import { getDb } from '../config/database.js';
import { signToken } from '../middlewares/auth.js';

const db = getDb();

export async function login(username, password) {
  const user = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);

  if (!user) {
    const err = new Error('帳號或密碼錯誤');
    err.status = 401;
    throw err;
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    const err = new Error('帳號或密碼錯誤');
    err.status = 401;
    throw err;
  }

  const token = signToken(user);
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      role: user.role,
    },
  };
}

export async function resetPassword(userId, oldPassword, newPassword) {
  const user = db
    .prepare('SELECT * FROM users WHERE id = ?')
    .get(userId);

  if (!user) {
    const err = new Error('使用者不存在');
    err.status = 404;
    throw err;
  }

  const valid = bcrypt.compareSync(oldPassword, user.password_hash);
  if (!valid) {
    const err = new Error('目前密碼錯誤');
    err.status = 400;
    throw err;
  }

  if (!newPassword || newPassword.length < 6) {
    const err = new Error('新密碼長度至少 6 碼');
    err.status = 400;
    throw err;
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, userId);
  return { message: '密碼重設成功' };
}