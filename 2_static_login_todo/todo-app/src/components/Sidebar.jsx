import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  Search,
  Calendar,
  ChevronRight,
  Clock,
  AlertTriangle,
  FileText,
  Plus,
  Trash2,
  Settings,
  LogOut,
  Target,
  Timer,
  TrendingDown,
} from "lucide-react";
import { useTodo } from "../context/TodoContext";

const Sidebar = () => {
  const {
    lists,
    tags,
    todayTasks,
    upcomingTasks,
    overdueTasks,
    darkMode,
    toggleDarkMode,
    toggleSidebar,
    addList,
    addTag,
    deleteList,
    deleteTag,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    searchQuery,
    setSearchQuery,
  } = useTodo();

  const location = useLocation();
  const navigate = useNavigate();

  const [showAddList, setShowAddList] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newTagName, setNewTagName] = useState("");

  // Handle search navigation
  useEffect(() => {
    if (searchQuery.trim() && location.pathname !== "/search") {
      navigate("/search");
    }
  }, [searchQuery, navigate, location.pathname]);

  const handleAddList = () => {
    if (newListName.trim()) {
      const colors = [
        "#EF4444",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#8B5CF6",
        "#EC4899",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      addList(newListName.trim(), randomColor);
      setNewListName("");
      setShowAddList(false);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const colors = [
        "#DC2626",
        "#2563EB",
        "#7C3AED",
        "#EA580C",
        "#0D9488",
        "#059669",
        "#DB2777",
        "#9333EA",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      addTag(newTagName.trim(), randomColor);
      setNewTagName("");
      setShowAddTag(false);
    }
  };

  return (
    <div className="w-80 bg-gradient-to-br from-indigo-50/95 via-purple-50/80 to-violet-50/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 border-r border-indigo-200/40 dark:border-slate-700/50 flex flex-col h-screen overflow-y-auto backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-indigo-200/40 dark:border-slate-700/50 bg-gradient-to-r from-indigo-100/80 via-purple-100/60 to-indigo-100/80 dark:from-slate-800/90 dark:via-slate-800/80 dark:to-slate-800/90 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/40">
              <Target className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-300 dark:via-purple-300 dark:to-violet-300 bg-clip-text text-transparent tracking-tight">
              TodoFlow
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="relative p-3 rounded-xl bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-700/90 dark:to-slate-700/70 hover:from-white hover:to-white dark:hover:from-slate-600 dark:hover:to-slate-600 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border border-white/50 dark:border-slate-600/50"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-yellow-300/20 dark:to-blue-300/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={toggleSidebar}
              className="relative p-3 rounded-xl bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-700/90 dark:to-slate-700/70 hover:from-white hover:to-white dark:hover:from-slate-600 dark:hover:to-slate-600 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border border-white/50 dark:border-slate-600/50"
            >
              <Menu className="w-4 h-4" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-purple-300/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-violet-500 transition-colors duration-200" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, lists, tags..."
            className="relative w-full pl-12 pr-4 py-4 text-sm bg-gradient-to-r from-white/90 to-white/80 dark:from-slate-800/90 dark:to-slate-800/80 border border-white/50 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg"
          />
        </div>
      </div>

      {/* Tasks Section */}
      <div className="p-4 border-b border-slate-200/30 dark:border-slate-700/30">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center">
          <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-2"></div>
          Navigation
        </h3>
        <div className="space-y-2">
          <Link
            to="/today"
            className={`relative group flex items-center justify-between py-4 px-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
              location.pathname === "/today"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 text-white shadow-xl shadow-indigo-500/25 transform scale-[1.02]"
                : "hover:bg-gradient-to-r hover:from-indigo-100/80 hover:to-purple-100/60 dark:hover:from-slate-700/80 dark:hover:to-slate-600/60 text-slate-700 dark:text-slate-300 hover:transform hover:scale-[1.01] hover:shadow-lg"
            }`}
          >
            {location.pathname === "/today" && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-violet-600/20 animate-pulse"></div>
            )}
            <div className="relative flex items-center">
              <div
                className={`p-2 rounded-xl mr-4 transition-all duration-300 ${
                  location.pathname === "/today"
                    ? "bg-white/20 shadow-lg"
                    : "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 group-hover:from-blue-200 group-hover:to-blue-100 dark:group-hover:from-blue-800/60 dark:group-hover:to-blue-800/40 shadow-sm"
                }`}
              >
                <Calendar
                  className={`w-5 h-5 ${
                    location.pathname === "/today"
                      ? "text-white"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-semibold tracking-wide ${
                  location.pathname === "/today"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white"
                }`}
              >
                Today
              </span>
            </div>
            <span
              className={`relative text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-300 ${
                location.pathname === "/today"
                  ? "bg-white/20 text-white shadow-md"
                  : "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-400 group-hover:from-slate-200 group-hover:to-slate-100 dark:group-hover:from-slate-700 dark:group-hover:to-slate-600 shadow-sm"
              }`}
            >
              {todayTasks.length}
            </span>
          </Link>

          <Link
            to="/upcoming"
            className={`group flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${
              location.pathname === "/upcoming"
                ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25 transform scale-[1.02]"
                : "hover:bg-gradient-to-r hover:from-teal-100/80 hover:to-cyan-100/60 dark:hover:from-slate-700/80 dark:hover:to-slate-600/60 text-slate-700 dark:text-slate-300 hover:transform hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-1.5 rounded-lg mr-3 transition-colors ${
                  location.pathname === "/upcoming"
                    ? "bg-white/20"
                    : "bg-teal-100 dark:bg-slate-700/50 group-hover:bg-teal-200 dark:group-hover:bg-slate-600/60"
                }`}
              >
                <ChevronRight
                  className={`w-4 h-4 ${
                    location.pathname === "/upcoming"
                      ? "text-white"
                      : "text-teal-600 dark:text-teal-400"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  location.pathname === "/upcoming"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white"
                }`}
              >
                Upcoming
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-lg ${
                location.pathname === "/upcoming"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
              }`}
            >
              {upcomingTasks.length}
            </span>
          </Link>

          <Link
            to="/overdue"
            className={`group flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${
              location.pathname === "/overdue"
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg transform scale-[1.02]"
                : "hover:bg-gradient-to-r hover:from-red-100/80 hover:to-pink-100/60 dark:hover:from-slate-700/80 dark:hover:to-slate-600/60 text-slate-700 dark:text-slate-300 hover:transform hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-1.5 rounded-lg mr-3 transition-colors ${
                  location.pathname === "/overdue"
                    ? "bg-white/20"
                    : "bg-red-100 dark:bg-slate-700/50 group-hover:bg-red-200 dark:group-hover:bg-slate-600/60"
                }`}
              >
                <Clock
                  className={`w-4 h-4 ${
                    location.pathname === "/overdue"
                      ? "text-white"
                      : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  location.pathname === "/overdue"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white"
                }`}
              >
                Overdue
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-lg ${
                location.pathname === "/overdue"
                  ? "bg-white/20 text-white"
                  : overdueTasks.length > 0
                  ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {overdueTasks.length}
            </span>
          </Link>

          <Link
            to="/sticky-wall"
            className={`group flex items-center justify-between py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 ${
              location.pathname === "/sticky-wall"
                ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                : "hover:bg-gradient-to-r hover:from-yellow-100/80 hover:to-orange-100/60 dark:hover:from-slate-700/80 dark:hover:to-slate-600/60 text-slate-700 dark:text-slate-300 hover:transform hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-1.5 rounded-lg mr-3 transition-colors ${
                  location.pathname === "/sticky-wall"
                    ? "bg-white/20"
                    : "bg-yellow-100 dark:bg-yellow-900/30 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50"
                }`}
              >
                <FileText
                  className={`w-4 h-4 ${
                    location.pathname === "/sticky-wall"
                      ? "text-white"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  location.pathname === "/sticky-wall"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white"
                }`}
              >
                Sticky Wall
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Lists Section */}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
          Lists
        </h3>
        <div className="space-y-2">
          {lists.map((list) => (
            <div
              key={list.id}
              className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/70 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.01]"
            >
              <Link
                to={`/list/${encodeURIComponent(list.name)}`}
                className="flex items-center flex-1"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-lg mr-3 shadow-sm"
                    style={{ backgroundColor: list.color }}
                  ></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white">
                    {list.name}
                  </span>
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  {list.count}
                </span>
                {lists.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete "${list.name}" list?`)) {
                        deleteList(list.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                    title="Delete list"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {showAddList ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddList()}
                placeholder="List name"
                className="flex-1 px-2 py-1 text-sm bg-purple-50 dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleAddList}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddList(false);
                  setNewListName("");
                }}
                className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddList(true)}
              className="flex items-center py-3 px-4 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 hover:scale-[1.01]"
            >
              <Plus className="w-4 h-4 mr-3" />
              <span className="font-medium">Add New List</span>
            </button>
          )}
        </div>
      </div>

      {/* Priority Section */}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
          Priority
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <Link
            to="/priority/high"
            className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              location.pathname === "/priority/high"
                ? "ring-2 ring-red-500 scale-105"
                : ""
            }`}
          >
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-3 text-white text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-bold uppercase tracking-wide mb-1">
                High
              </div>
              <div className="text-lg font-bold">
                {highPriorityTasks.length}
              </div>
              <div className="w-6 h-6 mx-auto mt-1">
                <svg
                  className="w-full h-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/priority/medium"
            className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              location.pathname === "/priority/medium"
                ? "ring-2 ring-yellow-500 scale-105"
                : ""
            }`}
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-3 text-white text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-bold uppercase tracking-wide mb-1">
                Medium
              </div>
              <div className="text-lg font-bold">
                {mediumPriorityTasks.length}
              </div>
              <div className="w-6 h-6 mx-auto mt-1">
                <svg
                  className="w-full h-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            to="/priority/low"
            className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
              location.pathname === "/priority/low"
                ? "ring-2 ring-green-500 scale-105"
                : ""
            }`}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-white text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xs font-bold uppercase tracking-wide mb-1">
                Low
              </div>
              <div className="text-lg font-bold">{lowPriorityTasks.length}</div>
              <div className="w-6 h-6 mx-auto mt-1">
                <svg
                  className="w-full h-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Tags Section */}
      <div className="p-4 flex-grow">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div key={tag.id} className="group relative">
              <Link
                to={`/tag/${encodeURIComponent(tag.name)}`}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center space-x-2 backdrop-blur-sm"
                style={{ backgroundColor: tag.color }}
              >
                <span>{tag.name}</span>
                {tag.count > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-bold">
                    {tag.count}
                  </span>
                )}
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete "${tag.name}" tag?`)) {
                    deleteTag(tag.id);
                  }
                }}
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
                title="Delete tag"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {showAddTag ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Tag name"
              className="flex-1 px-2 py-1 text-sm bg-purple-50 dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-white"
              autoFocus
            />
            <button
              onClick={handleAddTag}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddTag(false);
                setNewTagName("");
              }}
              className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddTag(true)}
            className="flex items-center py-3 px-4 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 mr-3" />
            <span className="font-medium">Add Tag</span>
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm space-y-2">
        <button className="flex items-center w-full py-3 px-4 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-slate-700/70 rounded-xl transition-all duration-200 hover:scale-[1.01]">
          <div className="p-1.5 rounded-lg mr-3 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
            <LogOut className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <span className="font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
