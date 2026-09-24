import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'school-admin-secret-key';
const TOKEN_EXPIRES = '24h';

export function signToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES }
  );
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供驗證權杖' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: '無效或過期的權杖' });
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: '權限不足，拒絕存取' });
    }
    next();
  };
}