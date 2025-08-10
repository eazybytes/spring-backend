import React from 'react';
import { useTodo } from '../context/TodoContext';
import TaskCard from './TaskCard';

const OverduePage = () => {
  const { overdueTasks, handleTaskSelect, lists, tags } = useTodo();


  const handleTaskClick = (task) => {
    handleTaskSelect(task);
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-600 dark:from-red-400 dark:via-red-300 dark:to-pink-400 bg-clip-text text-transparent tracking-tight">
            Overdue Tasks
          </h2>
          <div className="relative">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500/10 via-red-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-red-500/20 dark:to-pink-500/20 text-red-700 dark:text-red-300 rounded-2xl text-lg font-bold border border-red-200/50 dark:border-red-700/50 shadow-lg backdrop-blur-sm">
              {overdueTasks.length}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            </span>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          {overdueTasks.length} {overdueTasks.length === 1 ? 'task' : 'tasks'} past due date - let's get these done!
        </p>
      </div>

      <div>
        {overdueTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-3">Excellent!</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">No overdue tasks! Great job staying on track.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskSelect={handleTaskClick} lists={lists} tags={tags} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverduePage;