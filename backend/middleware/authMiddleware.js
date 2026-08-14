const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rs_heritage_secret_key_2026';

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authentication token.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Expired or invalid token.'
    });
  }
};

// Middleware to enforce Admin Role-Based Access Control (RBAC)
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Access restricted to Admin users only.'
    });
  }
  next();
};

module.exports = {
  verifyToken,
  requireAdmin,
  JWT_SECRET
};
