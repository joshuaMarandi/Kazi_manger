# Kazi Manager

A full-stack web application for managing tasks with user authentication, built with React, Node.js, and SQLite.

# Mockups Designs
The Mockups were designed on MockFlow Build mode Beta and exported as PDF writen Design in the repository

# Example of App images
Some screenshots on how app works are found in app screenshot folder on the root repository 


## Features

- **User Authentication**: Secure registration, login, and session management with JWT
- **Task Management**: Full CRUD operations for tasks with real-time updates
- **Task Status Tracking**: Pending, In Progress, and Completed status with visual indicators
- **Due Date Management**: Set and track task due dates with overdue notifications
- **Personalized Dashboard**: Welcome message with user's name and task statistics
- **Modern UI Design**: Clean interface with custom navy/blue color scheme (#132E60, #0C1D4E, #46ABE3)
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and shadcn/ui components
- **Data Persistence**: SQLite database with proper schema design
- **API-First Design**: RESTful API architecture for future extensibility

## 🛠 Technology Stack

### Frontend
- **React** (18.x) with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling with custom color scheme
- **shadcn/ui** components for consistent UI elements
- **Axios** for API communication
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **SQLite** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **CORS** for cross-origin requests

## 📁 Project Structure

```
task_mgt/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Database connection configuration
│   │   │   └── migrate.js           # Database schema and migrations
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── taskController.js    # Task management logic
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT authentication middleware
│   │   │   └── validation.js        # Input validation middleware
│   │   ├── models/
│   │   │   ├── User.js              # User data model
│   │   │   └── Task.js              # Task data model
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   └── tasks.js             # Task management routes
│   │   └── server.js                # Express server configuration
│   ├── .env.example                 # Environment variables template
│   └── package.json                 # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx        # Main dashboard with personalized welcome
│   │   │   ├── DashboardLayout.tsx  # Layout wrapper with navigation
│   │   │   ├── Login.tsx            # Login form with custom styling
│   │   │   ├── Register.tsx         # Registration form with validation
│   │   │   ├── ProtectedRoute.tsx   # Route protection component
│   │   │   ├── TaskList.tsx         # Task list with filtering and search
│   │   │   ├── TaskCard.tsx         # Individual task display component
│   │   │   ├── TaskForm.tsx         # Task creation/editing modal form
│   │   │   ├── TaskStatsCard.tsx    # Statistics display cards
│   │   │   └── ui/                  # shadcn/ui components
│   │   │       ├── alert.tsx        # Custom alert component
│   │   │       ├── card.tsx         # Reusable card component
│   │   │       └── tabs.tsx         # Tab navigation component
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # Authentication state management
│   │   ├── lib/
│   │   │   └── utils.ts             # Utility functions (cn, clsx)
│   │   ├── services/
│   │   │   └── api.ts               # API communication layer
│   │   ├── types/
│   │   │   └── task.ts              # TypeScript type definitions
│   │   ├── App.tsx                  # Main application component
│   │   └── index.css                # Global styles with Tailwind
│   ├── .env                         # Environment variables
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── package.json                 # Frontend dependencies
├── .gitignore                       # Git ignore patterns
└── README.md                        # This file
```

##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task_mgt
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables** (backend/.env)
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   DATABASE_PATH=./database.sqlite
   ```

2. **Frontend Environment Variables** (frontend/.env)
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # For development with auto-reload:
   npm run dev
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "first_name": "Joshua",
  "last_name": "Marandi",
  "email": "JoshuaMarandi@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "Joshua.Marandi@example.com",
  "password": "SecurePass123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "first_name": "Jane",
  "email": "jane.Marandi@example.com"
}
```

### Task Management Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <jwt_token>

# With filters:
GET /api/tasks?status=Pending&sortBy=due_date&sortOrder=ASC
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "Pending",
  "due_date": "2024-12-31"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "Completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats
Authorization: Bearer <jwt_token>
```

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  due_date DATE,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
```

##  Security Features

- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with token expiration
- **Input Validation**: Comprehensive server-side validation using express-validator
- **SQL Injection Protection**: Parameterized queries prevent SQL injection
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Security Headers**: Helmet middleware for security headers
- **Route Protection**: Authentication required for all task operations
- **Authorization**: Users can only access their own tasks

##  Frontend Features

### Authentication
- Responsive login and registration forms
- Real-time form validation
- Automatic token management
- Protected route handling
- Session persistence

### Task Management
- Interactive task cards with status indicators
- Modal-based task creation and editing
- Drag-and-drop status updates (quick actions)
- Real-time statistics dashboard
- Advanced filtering and sorting
- Due date tracking with overdue indicators

### User Experience
- Loading states and error handling
- Responsive design for all screen sizes
- Intuitive navigation and user feedback
- Clean, modern interface with custom navy/blue color scheme
- Personalized dashboard with user's name
- Custom authentication pages with branded background (#132E60)
- shadcn/ui components for consistent styling
- Accessibility considerations

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User registration with validation
- [ ] User login with correct credentials
- [ ] Invalid login attempts
- [ ] Token expiration handling
- [ ] Logout functionality

#### Task Management
- [ ] Create new tasks
- [ ] View task list
- [ ] Edit existing tasks
- [ ] Delete tasks
- [ ] Filter by status
- [ ] Sort by different fields
- [ ] Due date functionality

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Use process manager like PM2
3. Configure reverse proxy (nginx)
4. Enable HTTPS
5. Set up database backups

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Configure API URL for production
4. Set up CI/CD pipeline

## 🛠 Development

### Architecture Decisions

1. **JWT over Sessions**: Chosen for stateless authentication and API scalability
2. **SQLite Database**: Perfect for development and small-scale deployment
3. **React Context**: Simple state management suitable for app complexity
4. **Tailwind CSS + shadcn/ui**: Utility-first CSS with consistent component library
5. **TypeScript**: Type safety for better development experience
6. **Express.js**: Lightweight and flexible server framework
7. **Custom Color Scheme**: Navy/blue branding for professional appearance

### Code Organization

- **Separation of Concerns**: Clear separation between authentication, business logic, and data access
- **Model-View-Controller**: Backend follows MVC pattern for maintainability
- **Component-Based Architecture**: Frontend uses reusable React components
- **Service Layer**: API calls centralized in service layer
- **Type Safety**: TypeScript interfaces for data contracts

### Best Practices Implemented

- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Validation**: Client-side and server-side input validation
- **Security**: Password hashing, JWT tokens, input sanitization
- **Code Quality**: Consistent formatting and developer-style comments
- **Documentation**: Comprehensive API documentation and code comments

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Built with ❤️ by Joshua Marandi**
