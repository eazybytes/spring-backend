import React from 'react';
import { Search, Clock, Target, FileText, X, Plus } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import { useTodo } from '../context/TodoContext';

const SearchPage = () => {
  const { searchQuery, setSearchQuery, searchTasks, lists, tags, handleTaskSelect, handleAddNewTask } = useTodo();
  
  const searchResults = searchTasks(searchQuery);
  const hasQuery = searchQuery.trim().length > 0;
  
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                Search Results
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {hasQuery ? (
                  <>
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </>
                ) : (
                  'Enter a search term to find tasks'
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Add Task Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <button
                onClick={handleAddNewTask}
                className="relative flex items-center px-4 py-2.5 bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 hover:from-violet-600 hover:via-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 border border-white/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"></div>
                <Plus className="relative w-4 h-4 mr-2" />
                <span className="relative font-medium tracking-wide">Add Task</span>
              </button>
            </div>
            
            {hasQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-hidden">
          {!hasQuery ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-6 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-3xl mb-6">
                <Search className="w-16 h-16 text-violet-500 dark:text-violet-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Search your tasks
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                Use the search bar in the sidebar to find tasks by title, description, list, or tags
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            // No results
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl mb-6">
                <FileText className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                No tasks match your search for "{searchQuery}". Try different keywords or check your spelling.
              </p>
            </div>
          ) : (
            // Results grid
            <div className="h-full overflow-y-auto">
              <div className="grid gap-4">
                {searchResults.map((task) => (
                  <div key={task.id} className="animate-fade-in-up">
                    <TaskCard 
                      task={task} 
                      onTaskSelect={handleTaskSelect}
                      lists={lists}
                      tags={tags}
                    />
                  </div>
                ))}
              </div>
              
              {/* Results summary at bottom */}
              <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>
                    Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>
                        {searchResults.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())).length} title matches
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Sorted by relevance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;