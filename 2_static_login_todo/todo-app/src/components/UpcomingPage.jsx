import React from "react";
import { Calendar, Clock, ChevronRight, Zap, Sunrise, Sunset, Star, Sparkles } from "lucide-react";
import { useTodo } from "../context/TodoContext";
import TaskCard from "./TaskCard";

// Color themes for different time sections
const sectionThemes = {
  Tomorrow: {
    gradient: "from-amber-400 via-orange-500 to-red-500",
    lightBg: "from-amber-50/80 via-orange-50/60 to-red-50/40",
    darkBg: "from-amber-900/20 via-orange-900/15 to-red-900/10",
    border: "border-amber-200/30 dark:border-amber-700/30",
    icon: Sunrise,
    accent: "text-amber-600 dark:text-amber-400",
    badge: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-300/50 dark:from-amber-500/30 dark:to-orange-500/30 dark:text-amber-300 dark:border-amber-600/50",
    shadow: "shadow-amber-500/20"
  },
  "This Week": {
    gradient: "from-blue-400 via-cyan-500 to-teal-500", 
    lightBg: "from-blue-50/80 via-cyan-50/60 to-teal-50/40",
    darkBg: "from-blue-900/20 via-cyan-900/15 to-teal-900/10",
    border: "border-blue-200/30 dark:border-blue-700/30",
    icon: Calendar,
    accent: "text-blue-600 dark:text-blue-400",
    badge: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-300/50 dark:from-blue-500/30 dark:to-cyan-500/30 dark:text-blue-300 dark:border-blue-600/50",
    shadow: "shadow-blue-500/20"
  },
  "Next Week": {
    gradient: "from-violet-400 via-purple-500 to-indigo-500",
    lightBg: "from-violet-50/80 via-purple-50/60 to-indigo-50/40", 
    darkBg: "from-violet-900/20 via-purple-900/15 to-indigo-900/10",
    border: "border-violet-200/30 dark:border-violet-700/30",
    icon: Clock,
    accent: "text-violet-600 dark:text-violet-400",
    badge: "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-700 border-violet-300/50 dark:from-violet-500/30 dark:to-purple-500/30 dark:text-violet-300 dark:border-violet-600/50",
    shadow: "shadow-violet-500/20"
  },
  "Beyond Next Week": {
    gradient: "from-emerald-400 via-green-500 to-teal-500",
    lightBg: "from-emerald-50/80 via-green-50/60 to-teal-50/40",
    darkBg: "from-emerald-900/20 via-green-900/15 to-teal-900/10", 
    border: "border-emerald-200/30 dark:border-emerald-700/30",
    icon: Star,
    accent: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border-emerald-300/50 dark:from-emerald-500/30 dark:to-green-500/30 dark:text-emerald-300 dark:border-emerald-600/50",
    shadow: "shadow-emerald-500/20"
  }
};

const ModernTaskSection = ({ title, tasks, onTaskClick, lists, tags, theme, index }) => {
  const IconComponent = theme.icon;
  
  return (
    <div 
      className="group relative mb-8 last:mb-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background gradient container */}
      <div className={`relative rounded-3xl bg-gradient-to-br ${theme.lightBg} dark:${theme.darkBg} p-8 border-2 ${theme.border} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.01] ${theme.shadow} hover:shadow-2xl`}>
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 dark:opacity-20">
          <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl animate-pulse`}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5 dark:opacity-15">
          <div className={`w-full h-full bg-gradient-to-tl ${theme.gradient} rounded-full blur-2xl`}></div>
        </div>

        {/* Header Section */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Icon with gradient background */}
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-lg ${theme.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              {/* Title with gradient text */}
              <div>
                <h2 className={`text-4xl font-black bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent tracking-tight leading-none`}>
                  {title}
                </h2>
                <p className={`text-sm font-medium ${theme.accent} mt-1 opacity-80`}>
                  {tasks.length === 0 ? 'No tasks' : `${tasks.length} task${tasks.length === 1 ? '' : 's'}`}
                </p>
              </div>
            </div>

            {/* Task count badge */}
            <div className="relative">
              <div className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-bold border-2 backdrop-blur-sm ${theme.badge} transition-all duration-300 hover:scale-105`}>
                <Sparkles className="w-4 h-4 mr-2" />
                {tasks.length}
                {tasks.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          </div>

          {/* Decorative separator */}
          <div className={`h-1 bg-gradient-to-r ${theme.gradient} rounded-full opacity-30 mb-6`}></div>
        </div>

        {/* Tasks Content */}
        <div className="relative z-10">
          {tasks.length === 0 ? (
            // Enhanced Empty state
            <div className="text-center py-12">
              <div className="relative inline-block mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl opacity-20 animate-pulse`}></div>
                <div className={`relative w-20 h-20 mx-auto bg-gradient-to-br ${theme.lightBg} dark:${theme.darkBg} rounded-3xl flex items-center justify-center border-2 ${theme.border} ${theme.shadow}`}>
                  <IconComponent className={`w-10 h-10 ${theme.accent}`} />
                </div>
              </div>
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
                All Clear!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No tasks scheduled for {title.toLowerCase()}. 
              </p>
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-medium opacity-80`}>
                <Zap className="w-4 h-4 mr-2" />
                Ready for action
              </div>
            </div>
          ) : (
            // Tasks grid
            <div className="space-y-4">
              {tasks.map((task, taskIndex) => (
                <div 
                  key={task.id}
                  className="animate-fade-in-up hover:scale-[1.01] transition-transform duration-200"
                  style={{ animationDelay: `${(index * 150) + (taskIndex * 50)}ms` }}
                >
                  <TaskCard 
                    task={task} 
                    onTaskSelect={onTaskClick} 
                    lists={lists} 
                    tags={tags} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${theme.gradient} opacity-20 rounded-b-3xl`}></div>
      </div>
    </div>
  );
};

const UpcomingPage = () => {
  const {
    tomorrowTasks,
    thisWeekTasks,
    nextWeekTasks,
    beyondNextWeekTasks,
    handleTaskSelect,
    handleAddNewTask,
    lists,
    tags,
  } = useTodo();

  const sections = [
    { title: "Tomorrow", tasks: tomorrowTasks, theme: sectionThemes.Tomorrow },
    { title: "This Week", tasks: thisWeekTasks, theme: sectionThemes["This Week"] },
    { title: "Next Week", tasks: nextWeekTasks, theme: sectionThemes["Next Week"] },
    ...(beyondNextWeekTasks.length > 0 ? [{ title: "Beyond Next Week", tasks: beyondNextWeekTasks, theme: sectionThemes["Beyond Next Week"] }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <h1 className="relative text-6xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              Upcoming Tasks
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stay ahead of your schedule with beautifully organized upcoming tasks
          </p>

          {/* Add Task Button */}
          <div className="mt-8">
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <button
                onClick={handleAddNewTask}
                className="relative flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 hover:from-violet-600 hover:via-purple-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 border border-white/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
                <svg className="relative w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="relative font-bold text-xl tracking-wide">Add New Task</span>
                <div className="ml-4 flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Task Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <ModernTaskSection
              key={section.title}
              title={section.title}
              tasks={section.tasks}
              onTaskClick={handleTaskSelect}
              lists={lists}
              tags={tags}
              theme={section.theme}
              index={index}
            />
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full border border-slate-200 dark:border-slate-600">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Stay organized, stay amazing</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPage;