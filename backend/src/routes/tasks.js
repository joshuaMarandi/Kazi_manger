const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');

// All task routes require authentication
router.use(authenticateToken);

// Task CRUD routes
router.get('/', TaskController.getTasks);
router.get('/stats', TaskController.getTaskStats);
router.get('/:id', TaskController.getTask);
router.post('/', validateTask, TaskController.createTask);
router.put('/:id', validateTaskUpdate, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;