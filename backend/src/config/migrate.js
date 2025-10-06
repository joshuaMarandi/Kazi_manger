const db = require('./database');

const createTables = async () => {
  try {
    // Create users table with proper constraints and indexing
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tasks table with foreign key relationship to users
    await db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
        due_date DATE,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // Create indexes for better query performance
    await db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await db.run('CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id)');
    await db.run('CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)');
    await db.run('CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date)');

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  }
};

// Run migrations immediately when the module is required
createTables();

module.exports = { createTables };