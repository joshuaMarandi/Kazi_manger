const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

class AuthController {
  // User registration endpoint
  static async register(req, res) {
    try {
      const { email, password, first_name, last_name } = req.body;

      // Create new user with hashed password
      const user = await User.create({
        email,
        password,
        first_name,
        last_name
      });

      // Generate JWT token for immediate login after registration
      const token = generateToken(user.id);

      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON(), // Exclude password from response
        token
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message === 'Email already exists') {
        return res.status(409).json({ error: 'Email already registered' });
      }

      res.status(500).json({ error: 'Registration failed' });
    }
  }

  // User login endpoint
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isValidPassword = await user.verifyPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = generateToken(user.id);

      res.json({
        message: 'Login successful',
        user: user.toJSON(),
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  // Get current user profile (requires authentication)
  static async getProfile(req, res) {
    try {
      // User is already attached to req by auth middleware
      res.json({
        user: req.user.toJSON()
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get user profile' });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { first_name, last_name, email } = req.body;
      
      const updatedUser = await req.user.update({
        first_name,
        last_name,
        email
      });

      res.json({
        message: 'Profile updated successfully',
        user: updatedUser.toJSON()
      });

    } catch (error) {
      console.error('Update profile error:', error);
      
      if (error.message === 'Email already exists') {
        return res.status(409).json({ error: 'Email already in use by another account' });
      }

      res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  // Logout endpoint (client-side token removal, server Marandisn't track tokens)
  static async logout(req, res) {
    // Since we're using stateless JWT, logout is handled client-side
    // This endpoint can be used for logging or future token blacklisting
    res.json({ message: 'Logout successful' });
  }
}

module.exports = AuthController;