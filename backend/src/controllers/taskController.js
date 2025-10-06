const Task = require('../models/Task');

class TaskController {
  // Get all tasks for the authenticated user with optional filtering
  static async getTasks(req, res) {
    try {
      const userId = req.user.id;
      const { status, due_date, sortBy, sortOrder } = req.query;

      // Build filters object from query parameters
      const filters = {};
      if (status) filters.status = status;
      if (due_date) filters.due_date = due_date;
      if (sortBy) filters.sortBy = sortBy;
      if (sortOrder) filters.sortOrder = sortOrder;

      const tasks = await Task.findByUserId(userId, filters);

      res.json({
        tasks,
        count: tasks.length
      });

    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
  }

  // Get a specific task by ID
  static async getTask(req, res) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Ensure user can only access their own tasks
      if (!task.belongsToUser(req.user.id)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json({ task });

    } catch (error) {
      console.error('Get task error:', error);
      res.status(500).json({ error: 'Failed to retrieve task' });
    }
  }

  // Create a new task
  static async createTask(req, res) {
    try {
      const { title, description, status, due_date } = req.body;
      const userId = req.user.id;

      const task = await Task.create({
        title,
        description,
        status,
        due_date,
        user_id: userId
      });

      res.status(201).json({
        message: 'Task created successfully',
        task
      });

    } catch (error) {
      console.error('Create task error:', error);
      
      if (error.message === 'Invalid status value') {
        return res.status(400).json({ error: 'Invalid status value' });
      }

      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // Update an existing task
  static async updateTask(req, res) {
    try {
      const taskId = parseInt(req.params.id);
      const updates = req.body;

      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Ensure user can only update their own tasks
      if (!task.belongsToUser(req.user.id)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const updatedTask = await task.update(updates);

      res.json({
        message: 'Task updated successfully',
        task: updatedTask
      });

    } catch (error) {
      console.error('Update task error:', error);
      
      if (error.message === 'Invalid status value') {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      
      if (error.message === 'No valid fields to update') {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  // Delete a task
  static async deleteTask(req, res) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Ensure user can only delete their own tasks
      if (!task.belongsToUser(req.user.id)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await task.delete();

      res.json({ message: 'Task deleted successfully' });

    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  // Get task statistics for the user
  static async getTaskStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await Task.getStats(userId);

      res.json({ stats });

    } catch (error) {
      console.error('Get task stats error:', error);
      res.status(500).json({ error: 'Failed to retrieve task statistics' });
    }
  }
}

module.exports = TaskController;