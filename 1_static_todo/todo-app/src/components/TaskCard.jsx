import React from 'react';
import { formatDateWithoutYear } from '../utils/dateUtils';

const TaskCard = ({ task, onTaskSelect, lists, tags }) => {
  const getListColor = (listName) => {
    const list = lists.find(l => l.name === listName);
    return list ? list.color : '#6B7280';
  };

  const getTagColor = (tagName) => {
    const tag = tags.find(t => t.name === tagName);
    return tag ? tag.color : '#6B7280';
  };

  return (
    <div 
      onClick={() => onTaskSelect(task)}
      className="group relative bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-slate-800/95 dark:via-slate-700/90 dark:to-slate-800/95 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] backdrop-blur-sm overflow-hidden hover:bg-gradient-to-br hover:from-violet-50/80 hover:via-white/90 hover:to-purple-50/80 dark:hover:from-slate-700/95 dark:hover:via-slate-600/90 dark:hover:to-slate-700/95"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-5 flex-1">
          <button className="relative w-6 h-6 border-2 border-slate-300 dark:border-slate-500 rounded-full hover:border-violet-400 dark:hover:border-violet-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <div className="flex-1">
            <h3 className="text-slate-800 dark:text-white font-semibold text-lg tracking-wide group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">{task.title}</h3>
            
            {/* Task details */}
            <div className="flex items-center space-x-6 mt-4 text-sm">
              {task.dueDate && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-blue-700 dark:text-blue-300">{formatDateWithoutYear(task.dueDate)}</span>
                </div>
              )}
              
              {task.status && (
                <div className="flex items-center">
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-300 ${
                    (task.status || 'new') === 'new' ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200/50 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-200 dark:border-blue-700/50' :
                    (task.status || 'new') === 'in_progress' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200/50 dark:from-yellow-900/30 dark:to-yellow-800/30 dark:text-yellow-200 dark:border-yellow-700/50' :
                    (task.status || 'new') === 'closed' ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200/50 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-200 dark:border-green-700/50' :
                    (task.status || 'new') === 'cancelled' ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200/50 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-200 dark:border-red-700/50' :
                    'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border-slate-200/50 dark:from-slate-900/30 dark:to-slate-800/30 dark:text-slate-200 dark:border-slate-700/50'
                  }`}>
                    {(task.status || 'new').replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              )}
              
              <div 
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: getListColor(task.list) }}
              >
                {task.list}
              </div>
              
              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex space-x-2">
                  {task.tags.slice(0, 2).map(tagName => (
                    <div 
                      key={tagName}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md border border-white/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: getTagColor(tagName) }}
                    >
                      {tagName}
                    </div>
                  ))}
                  {task.tags.length > 2 && (
                    <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-md border border-white/20">
                      +{task.tags.length - 2}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button className="relative opacity-0 group-hover:opacity-100 p-3 text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 rounded-2xl hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/30 dark:hover:to-purple-900/30 hover:shadow-lg transform hover:scale-110">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;