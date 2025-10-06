const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateUserRegistration, 
  validateUserLogin 
} = require('../middleware/validation');

// Public routes (no authentication required)
router.post('/register', validateUserRegistration, AuthController.register);
router.post('/login', validateUserLogin, AuthController.login);

// Protected routes (authentication required)
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, AuthController.updateProfile);
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;