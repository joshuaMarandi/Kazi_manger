require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Initialize database (runs migrations)
require('./config/migrate');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware - helmet adds various HTTP headers for security
app.use(helmet());

// CORS configuration - allows frontend to communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  const db = require('./config/database');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  const db = require('./config/database');
  await db.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: SQLite`);
});

module.exports = app;