import React from 'react';
import { useParams } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import TaskCard from '../components/TaskCard';

const PriorityPage = ({ onTaskSelect, onAddNewTask }) => {
  const { priority } = useParams();
  const { getTasksByPriority, lists, tags } = useTodo();
  
  const tasks = priority ? getTasksByPriority(priority) : [];


  const getPriorityConfig = (priorityLevel) => {
    switch (priorityLevel) {
      case 'high':
        return { color: 'text-red-600', bgColor: 'bg-red-500', icon: '⚠️' };
      case 'medium':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-500', icon: '⏰' };
      case 'low':
        return { color: 'text-green-600', bgColor: 'bg-green-500', icon: '⬇️' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-500', icon: '📋' };
    }
  };

  const priorityConfig = getPriorityConfig(priority);

  if (!priority || !['high', 'medium', 'low'].includes(priority)) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invalid Priority</h2>
        <p className="text-gray-600 dark:text-gray-400">Please select a valid priority level.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-10 h-10 rounded-2xl ${priorityConfig.bgColor.replace('bg-', 'bg-gradient-to-br from-').replace('-500', '-400 to-').replace('500', '600')} flex items-center justify-center text-white shadow-lg`}>
            <span className="text-lg">{priorityConfig.icon}</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent tracking-tight">
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </h2>
          <div className="relative">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-blue-500/20 text-violet-700 dark:text-violet-300 rounded-2xl text-lg font-bold border border-violet-200/50 dark:border-violet-700/50 shadow-lg backdrop-blur-sm">
              {tasks.length}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
            </span>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <button 
            onClick={onAddNewTask}
            className="relative flex items-center px-6 py-4 bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 hover:from-violet-600 hover:via-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 border border-white/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
            <svg className="relative w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="relative font-semibold text-lg tracking-wide">Add New Task</span>
            <div className="ml-3 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div>
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-violet-500 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">All caught up!</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">No {priority} priority tasks. Time to relax or create something new.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskSelect={onTaskSelect} lists={lists} tags={tags} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityPage;