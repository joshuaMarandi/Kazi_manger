import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdateStatus: (status: 'Pending' | 'In Progress' | 'Completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Pending':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case 'In Progress':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        };
      case 'Completed':
        return {
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
        };
    }
  };

  const isOverdue = () => {
    if (!task.due_date || task.status === 'Completed') return false;
    return new Date(task.due_date) < new Date();
  };

  const getDaysUntilDue = () => {
    if (!task.due_date) return null;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const statusConfig = getStatusConfig(task.status);
  const daysUntilDue = getDaysUntilDue();

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Status indicator stripe */}
      <div className={`h-1 w-full ${statusConfig.color.split(' ')[0]}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-navy line-clamp-2 group-hover:text-blue transition-colors duration-200">
            {task.title}
          </h3>
          
          {/* Actions dropdown */}
          <div className="relative">
            <button
              className={`p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 ${
                showActions ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setShowActions(!showActions)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => onEdit(task)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-navy/70 text-sm mb-4 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
            {statusConfig.icon}
            <span>{task.status}</span>
          </span>
        </div>

        {/* Quick Status Change Buttons */}
        <div className="flex flex-wrap gap-1 mb-4">
          {task.status !== 'Pending' && (
            <button
              onClick={() => onUpdateStatus('Pending')}
              className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors duration-200"
            >
              → Pending
            </button>
          )}
          {task.status !== 'In Progress' && (
            <button
              onClick={() => onUpdateStatus('In Progress')}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
            >
              → In Progress
            </button>
          )}
          {task.status !== 'Completed' && (
            <button
              onClick={() => onUpdateStatus('Completed')}
              className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 transition-colors duration-200"
            >
              → Complete
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          {task.due_date && (
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={`${isOverdue() ? 'text-red-600 font-medium' : ''}`}>
                {formatDate(task.due_date)}
                {daysUntilDue !== null && (
                  <span className="ml-1">
                    {isOverdue() 
                      ? `(${Math.abs(daysUntilDue)} days overdue)`
                      : daysUntilDue === 0 
                        ? '(Today)'
                        : `(${daysUntilDue} days left)`
                    }
                  </span>
                )}
              </span>
            </div>
          )}
          
          <div className="text-xs text-gray-400">
            {formatDate(task.created_at)}
          </div>
        </div>
      </div>

      {/* Overdue indicator */}
      {isOverdue() && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default TaskCard;