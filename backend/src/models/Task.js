const db = require('../config/database');

class Task {
  constructor(data = {}) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.due_date = data.due_date;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Create a new task for a specific user
  static async create({ title, description, status = 'Pending', due_date, user_id }) {
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status value');
    }

    try {
      const result = await db.run(
        `INSERT INTO tasks (title, description, status, due_date, user_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [title, description, status, due_date, user_id]
      );

      return await Task.findById(result.id);
    } catch (error) {
      // Handle foreign key constraint violation
      if (error.message.includes('FOREIGN KEY constraint failed')) {
        throw new Error('Invalid user ID');
      }
      throw error;
    }
  }

  // Find task by ID
  static async findById(id) {
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    return task ? new Task(task) : null;
  }

  // Find all tasks for a specific user with optional filtering and sorting
  static async findByUserId(userId, filters = {}) {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];

    // Add status filter if provided
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    // Add due date filter if provided
    if (filters.due_date) {
      query += ' AND due_date = ?';
      params.push(filters.due_date);
    }

    // Add sorting - default to created_at DESC for newest first
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'DESC';
    
    // Validate sort field to prevent SQL injection
    const allowedSortFields = ['title', 'status', 'due_date', 'created_at', 'updated_at'];
    if (allowedSortFields.includes(sortBy)) {
      query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    const tasks = await db.all(query, params);
    return tasks.map(task => new Task(task));
  }

  // Get all tasks for admin purposes (if needed in future)
  static async findAll() {
    const tasks = await db.all('SELECT * FROM tasks ORDER BY created_at DESC');
    return tasks.map(task => new Task(task));
  }

  // Update task information
  async update(updates) {
    const allowedUpdates = ['title', 'description', 'status', 'due_date'];
    const updateFields = [];
    const values = [];

    // Validate status if being updated
    if (updates.status) {
      const validStatuses = ['Pending', 'In Progress', 'Completed'];
      if (!validStatuses.includes(updates.status)) {
        throw new Error('Invalid status value');
      }
    }

    // Only allow updates to specific fields
    for (const field of allowedUpdates) {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }

    // Add updated_at timestamp and task ID
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(this.id);

    await db.run(
      `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    // Return updated task data
    return await Task.findById(this.id);
  }

  // Delete task
  async delete() {
    await db.run('DELETE FROM tasks WHERE id = ?', [this.id]);
  }

  // Check if task belongs to specific user for authorization
  belongsToUser(userId) {
    return this.user_id === userId;
  }

  // Get task statistics for a user
  static async getStats(userId) {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN due_date < DATE('now') AND status != 'Completed' THEN 1 ELSE 0 END) as overdue
      FROM tasks 
      WHERE user_id = ?
    `, [userId]);

    return stats;
  }
}

module.exports = Task;