import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider, useTodo } from './context/TodoContext';
import Sidebar from './components/Sidebar';
import TaskDetails from './components/TaskDetails';
import TodayPage from './pages/TodayPage';
import UpcomingPage from './components/UpcomingPage';
import OverduePage from './components/OverduePage';
import StickyWall from './components/StickyWall';
import ListPage from './pages/ListPage';
import TagPage from './pages/TagPage';
import PriorityPage from './pages/PriorityPage';
import SearchPage from './pages/SearchPage';

function AppContent() {
  const { sidebarOpen, handleTaskSelect, handleAddNewTask, selectedTask, isCreatingTask, toggleSidebar } = useTodo();
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex transition-all duration-300 overflow-hidden">
      {sidebarOpen && <Sidebar />}
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gradient-to-br from-white/95 via-slate-50/80 to-blue-50/60 dark:from-slate-900/95 dark:via-slate-800/80 dark:to-slate-900/60 flex flex-col h-screen overflow-hidden backdrop-blur-sm">
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
            </div>
          </div>
        </div>

        {/* Routes Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<TodayPage onTaskSelect={handleTaskSelect} onAddNewTask={handleAddNewTask} />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/overdue" element={<OverduePage />} />
            <Route path="/sticky-wall" element={<StickyWall />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/list/:listName" element={<ListPage onTaskSelect={handleTaskSelect} onAddNewTask={handleAddNewTask} />} />
            <Route path="/tag/:tagName" element={<TagPage onTaskSelect={handleTaskSelect} onAddNewTask={handleAddNewTask} />} />
            <Route path="/priority/:priority" element={<PriorityPage onTaskSelect={handleTaskSelect} onAddNewTask={handleAddNewTask} />} />
          </Routes>
        </div>
      </div>
      
      {(selectedTask || isCreatingTask) && <TaskDetails />}
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <Router>
        <AppContent />
      </Router>
    </TodoProvider>
  );
}

export default App
