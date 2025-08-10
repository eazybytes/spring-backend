import React from 'react';
import { Plus, Calendar, Clock, ChevronRight, CheckCircle2, Tag } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { formatDateWithoutYear } from '../utils/dateUtils';

const TodayPage = ({ onTaskSelect, onAddNewTask }) => {
  const { todayTasks, lists, tags } = useTodo();

  const getListColor = (listName) => {
    const list = lists.find(l => l.name === listName);
    return list ? list.color : '#6B7280';
  };

  const getTagColor = (tagName) => {
    const tag = tags.find(t => t.name === tagName);
    return tag ? tag.color : '#6B7280';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
          Today's Tasks
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {todayTasks.length === 0 ? "No tasks scheduled" : `${todayTasks.length} task${todayTasks.length === 1 ? '' : 's'} to complete`}
        </p>
        
        {/* Add Task Button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <button
            onClick={onAddNewTask}
            className="relative flex items-center px-6 py-4 bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 hover:from-violet-600 hover:via-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 border border-white/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
            <Plus className="relative w-5 h-5 mr-3" />
            <span className="relative font-semibold text-lg tracking-wide">Add New Task</span>
            <div className="ml-3 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {todayTasks.map((task, index) => (
          <div 
            key={task.id} 
            onClick={() => onTaskSelect(task)}
            className={`modern-card group cursor-pointer overflow-hidden animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button className="mt-1 w-5 h-5 border-2 border-slate-300 dark:border-slate-500 rounded-full hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center justify-center group/check">
                    <CheckCircle2 className="w-3 h-3 text-transparent group-hover/check:text-blue-500 transition-colors duration-200" />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 leading-tight">
                      {task.title}
                    </h3>
                    
                    {/* Task metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      {task.dueDate && (
                        <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{formatDateWithoutYear(task.dueDate)}</span>
                        </div>
                      )}
                      
                      {task.status && (
                        <div className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wide ${
                          (task.status || 'new') === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' :
                          (task.status || 'new') === 'in_progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                          (task.status || 'new') === 'closed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                          (task.status || 'new') === 'cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {(task.status || 'new').replace('_', ' ')}
                        </div>
                      )}
                      
                      <div 
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: getListColor(task.list) }}
                      >
                        {task.list}
                      </div>
                      
                      {/* Priority indicator */}
                      {task.priority && (
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                          'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        }`}>
                          {task.priority}
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {task.tags.slice(0, 3).map(tagName => (
                          <div 
                            key={tagName}
                            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-sm backdrop-blur-sm"
                            style={{ backgroundColor: getTagColor(tagName) }}
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tagName}</span>
                          </div>
                        ))}
                        {task.tags.length > 3 && (
                          <div className="flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-400 dark:bg-slate-600 text-white">
                            +{task.tags.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-110">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {todayTasks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">All caught up!</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">No tasks scheduled for today. Take a well-deserved break or plan ahead for tomorrow.</p>
          <button 
            onClick={onAddNewTask}
            className="modern-button-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TodayPage;