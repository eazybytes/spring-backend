import React from 'react';
import { useTodo } from '../context/TodoContext';
import StickyWall from './StickyWall';
import UpcomingPage from './UpcomingPage';
import OverduePage from './OverduePage';
import TaskCard from './TaskCard';

const MainContent = () => {
  const { 
    todayTasks, 
    upcomingTasks,
    overdueTasks,
    currentView, 
    handleTaskSelect, 
    handleAddNewTask, 
    sidebarOpen, 
    toggleSidebar,
    selectedList,
    selectedTag,
    selectedPriority,
    getTasksByList,
    getTasksByTag,
    getTasksByPriority,
    lists,
    tags
  } = useTodo();


  const getCurrentTasks = () => {
    switch (currentView) {
      case 'upcoming':
        return upcomingTasks;
      case 'overdue':
        return overdueTasks;
      case 'sticky-wall':
        return [];
      case 'list':
        return selectedList ? getTasksByList(selectedList) : [];
      case 'tag':
        return selectedTag ? getTasksByTag(selectedTag) : [];
      case 'priority':
        return selectedPriority ? getTasksByPriority(selectedPriority) : [];
      case 'today':
      default:
        return todayTasks;
    }
  };

  const getCurrentTitle = () => {
    switch (currentView) {
      case 'upcoming':
        return 'Upcoming';
      case 'overdue':
        return 'Overdue';
      case 'sticky-wall':
        return 'Sticky Wall';
      case 'list':
        return selectedList || 'List';
      case 'tag':
        return selectedTag || 'Tag';
      case 'priority':
        return `${(selectedPriority || 'Priority').charAt(0).toUpperCase() + (selectedPriority || 'Priority').slice(1)} Priority`;
      case 'today':
      default:
        return 'Today';
    }
  };

  const currentTasks = getCurrentTasks();
  const currentTitle = getCurrentTitle();

  // If we're viewing sticky wall, render the sticky wall component
  if (currentView === 'sticky-wall') {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button 
                  onClick={toggleSidebar}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentTitle}</h1>
            </div>
          </div>
        </div>

        {/* Sticky Wall Content */}
        <div className="flex-1 overflow-auto">
          <StickyWall />
        </div>
      </div>
    );
  }

  // If we're viewing upcoming, render the upcoming page
  if (currentView === 'upcoming') {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button 
                  onClick={toggleSidebar}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentTitle}</h1>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-lg font-medium">
                {upcomingTasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Content */}
        <div className="flex-1 overflow-auto">
          <UpcomingPage />
        </div>
      </div>
    );
  }

  // If we're viewing overdue, render the overdue page
  if (currentView === 'overdue') {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button 
                  onClick={toggleSidebar}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentTitle}</h1>
              <span className={`px-3 py-1 rounded-full text-lg font-medium ${
                overdueTasks.length > 0 
                  ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}>
                {overdueTasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Overdue Content */}
        <div className="flex-1 overflow-auto">
          <OverduePage />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-r from-white/90 via-white/70 to-white/90 dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-800/90 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {!sidebarOpen && (
              <button 
                onClick={toggleSidebar}
                className="p-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-all duration-300 rounded-2xl hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-700 dark:hover:to-slate-600 hover:shadow-lg hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent tracking-tight">{currentTitle}</h1>
              <div className="relative">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-blue-500/20 text-violet-700 dark:text-violet-300 rounded-2xl text-lg font-bold border border-violet-200/50 dark:border-violet-700/50 shadow-lg backdrop-blur-sm">
                  {currentTasks.length}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="p-6 pb-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <button 
            onClick={handleAddNewTask}
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
      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {currentTasks.map((task) => (
            <TaskCard key={task.id} task={task} onTaskSelect={handleTaskSelect} lists={lists} tags={tags} />
          ))}
        </div>

        {/* Empty state */}
        {currentTasks.length === 0 && (
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
            <p className="text-slate-600 dark:text-slate-400 text-lg">No tasks for {currentTitle.toLowerCase()}. Time to relax or create something new.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;