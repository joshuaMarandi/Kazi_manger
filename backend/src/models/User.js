const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Create a new user with hashed password
  static async create({ email, password, first_name, last_name }) {
    try {
      // Hash password with salt for security - using cost factor of 12 for good security/performance balance
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const result = await db.run(
        `INSERT INTO users (email, password, first_name, last_name) 
         VALUES (?, ?, ?, ?)`,
        [email, hashedPassword, first_name, last_name]
      );

      return await User.findById(result.id);
    } catch (error) {
      // Check for unique constraint violation on email
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return user ? new User(user) : null;
  }

  // Find user by email for authentication
  static async findByEmail(email) {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    return user ? new User(user) : null;
  }

  // Verify password for login authentication
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Update user information
  async update(updates) {
    const allowedUpdates = ['first_name', 'last_name', 'email'];
    const updateFields = [];
    const values = [];

    // Only allow updates to specific fields for security
    for (const field of allowedUpdates) {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }

    // Add updated_at timestamp and user ID
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(this.id);

    try {
      await db.run(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
        values
      );

      // Return updated user data
      return await User.findById(this.id);
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Delete user and cascade delete all associated tasks
  async delete() {
    await db.run('DELETE FROM users WHERE id = ?', [this.id]);
  }

  // Get user data without sensitive information for API responses
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;