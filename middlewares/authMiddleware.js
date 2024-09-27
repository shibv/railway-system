import { verifyToken } from '../config/auth.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export { authMiddleware };
