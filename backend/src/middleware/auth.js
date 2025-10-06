const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT secret from environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT tokens and attach user to request
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Fetch current user data to ensure user still exists and token is valid
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token: user not found' });
    }

    // Attach user to request object for use in route handlers
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Generate JWT token for user
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    JWT_SECRET, 
    { 
      expiresIn: '24h' // Token expires in 24 hours for security
    }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET
};