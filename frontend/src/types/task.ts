export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  overdue: number;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
}