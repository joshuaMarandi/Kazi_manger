import React from 'react';
import { TaskStats } from '../types/task';

interface TaskStatsCardProps {
  stats: TaskStats;
  onFilterClick: (status: string) => void;
}

const TaskStatsCard: React.FC<TaskStatsCardProps> = ({ stats, onFilterClick }) => {
  const statItems = [
    {
      label: 'Total Tasks',
      value: stats.total,
      color: 'bg-gradient-to-br from-navy to-navy-600',
      textColor: 'text-white',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      hoverColor: 'hover:bg-slate-100',
      status: '',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'bg-gradient-to-br from-amber-500 to-orange-500',
      textColor: 'text-white',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverColor: 'hover:bg-amber-100',
      status: 'Pending',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'In Progress',
      value: stats.in_progress,
      color: 'bg-gradient-to-br from-blue to-blue-600',
      textColor: 'text-white',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      status: 'In Progress',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      textColor: 'text-white',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:bg-emerald-100',
      status: 'Completed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
      textColor: 'text-white',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      hoverColor: 'hover:bg-red-100',
      status: '',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`
            relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer transform hover:scale-105
            ${item.bgColor} ${item.borderColor} ${item.hoverColor}
            ${item.status ? 'hover:shadow-lg' : 'hover:shadow-md'}
          `}
          onClick={() => item.status && onFilterClick(item.status)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${item.color} ${item.textColor}`}>
                {item.icon}
              </div>
              {item.status && (
                <div className="text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-navy">
                {item.value}
              </div>
              <div className="text-sm font-medium text-navy/70">
                {item.label}
              </div>
            </div>

            {item.status && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </div>

          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50" />
        </div>
      ))}
    </div>
  );
};

export default TaskStatsCard;