import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { formatDateWithoutYear } from "../utils/dateUtils";
import CustomCalendar from "./CustomCalendar";

const TaskDetails = () => {
  const {
    selectedTask,
    setSelectedTask,
    isCreatingTask,
    setIsCreatingTask,
    lists,
    tags,
    addTask,
    updateTask,
    deleteTask,
  } = useTodo();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedList, setSelectedList] = useState("Personal");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("new");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [showCalendar, setShowCalendar] = useState(false);

  // Reset form when creating a new task or loading existing task
  React.useEffect(() => {
    if (isCreatingTask) {
      setTaskTitle("");
      setTaskDescription("");
      setSelectedList("Personal");
      setSelectedTags([]);
      setDueDate("");
      setTaskStatus("new");
      setTaskPriority("medium");
      setShowCalendar(false);
    } else if (selectedTask) {
      setTaskTitle(selectedTask.title || "");
      setTaskDescription(selectedTask.description || "");
      setSelectedList(selectedTask.list || "Personal");
      setSelectedTags(selectedTask.tags || []);
      setDueDate(selectedTask.dueDate || "");
      setTaskStatus(selectedTask.status || "new");
      setTaskPriority(selectedTask.priority || "medium");
      setShowCalendar(false);
    }
  }, [isCreatingTask, selectedTask]);

  if (!selectedTask && !isCreatingTask) {
    return null;
  }

  const handleClose = () => {
    setSelectedTask(null);
    setIsCreatingTask(false);
  };

  const handleSave = () => {
    if (!taskTitle.trim()) return;

    if (isCreatingTask) {
      addTask({
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        list: selectedList,
        tags: selectedTags,
        dueDate: dueDate || null,
        status: taskStatus,
        priority: taskPriority,
      });
      setIsCreatingTask(false);
    } else if (selectedTask) {
      updateTask(selectedTask.id, {
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        list: selectedList,
        tags: selectedTags,
        dueDate: dueDate || null,
        status: taskStatus,
        priority: taskPriority,
      });
    }
    setSelectedTask(null);
  };

  const handleDelete = () => {
    if (
      selectedTask &&
      window.confirm("Are you sure you want to delete this task?")
    ) {
      deleteTask(selectedTask.id);
      setSelectedTask(null);
    }
  };

  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  return (
    <div className="w-96 bg-gradient-to-br from-indigo-50/95 via-purple-50/90 to-violet-50/80 dark:from-slate-900/95 dark:via-indigo-900/20 dark:to-purple-900/20 border-l border-indigo-200/50 dark:border-indigo-700/40 flex flex-col h-screen overflow-y-auto backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-indigo-200/40 dark:border-indigo-700/40 flex items-center justify-between bg-gradient-to-r from-indigo-100/80 via-purple-100/60 to-indigo-100/80 dark:from-slate-800/80 dark:via-indigo-900/30 dark:to-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-800 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
            {isCreatingTask ? "Create New Task" : "Edit Task"}
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="relative p-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 rounded-2xl hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-700 dark:hover:to-slate-600 hover:shadow-lg hover:scale-110"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Task Title */}
      <div className="p-6 border-b border-slate-200/30 dark:border-slate-700/30">
        <div className="relative group">
          <input
            type="text"
            value={taskTitle || selectedTask?.title || ""}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full text-xl font-bold bg-transparent text-slate-800 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 tracking-wide"
            placeholder={
              isCreatingTask ? "Enter task title..." : "Renew driver's license"
            }
          />
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 w-0 group-focus-within:w-full transition-all duration-300"></div>
        </div>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-slate-200/30 dark:border-slate-700/30">
        <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wide">
          <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mr-2"></div>
          Description
        </label>
        <div className="relative group">
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-28 p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg"
            placeholder="Add a detailed description..."
          />
        </div>
      </div>

      {/* Task Properties */}
      <div className="p-6 space-y-6">
        {/* List Assignment */}
        <div>
          <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2"></div>
            List
          </label>
          <div className="relative group">
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="w-full p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-800 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
            >
              {lists.map((list) => (
                <option key={list.id} value={list.name}>
                  {list.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
            Due Date
          </label>
          <div className="relative">
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl text-slate-800 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md cursor-pointer min-h-[56px] flex items-center"
            >
              {dueDate ? (
                <span className="text-slate-800 dark:text-white font-medium">
                  {formatDateWithoutYear(dueDate)}
                </span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500">
                  Click to select due date...
                </span>
              )}
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {dueDate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDueDate("");
                }}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 transition-colors duration-200"
                title="Clear date"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Custom Calendar */}
            {showCalendar && (
              <CustomCalendar
                selectedDate={dueDate}
                onDateSelect={handleDateSelect}
                onClose={handleCalendarClose}
              />
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wide">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2"></div>
            Tags
          </label>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.name)}
                className="relative px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border backdrop-blur-sm"
                style={{
                  backgroundColor: selectedTags.includes(tag.name)
                    ? tag.color
                    : "transparent",
                  color: selectedTags.includes(tag.name) ? "white" : tag.color,
                  borderColor: tag.color,
                  borderWidth: selectedTags.includes(tag.name) ? "2px" : "1px",
                }}
              >
                {tag.name}
                {selectedTags.includes(tag.name) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
            Status
          </label>
          <div className="relative group">
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-800 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
            >
              <option value="new">🆕 New</option>
              <option value="in_progress">⚡ In Progress</option>
              <option value="closed">✅ Closed</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2"></div>
            Priority
          </label>
          <div className="relative group">
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full p-4 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/50 dark:border-slate-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 text-slate-800 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-indigo-200/40 dark:border-indigo-700/40 flex space-x-4 bg-gradient-to-r from-indigo-100/80 via-purple-100/60 to-indigo-100/80 dark:from-slate-800/80 dark:via-indigo-900/30 dark:to-slate-800/80 backdrop-blur-sm">
        {!isCreatingTask && (
          <div className="relative group flex-1">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <button
              onClick={handleDelete}
              className="relative w-full py-4 px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 font-bold text-lg tracking-wide shadow-xl shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105 border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
              <span className="relative flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </span>
            </button>
          </div>
        )}
        <div className="relative group flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <button
            onClick={handleSave}
            className="relative w-full py-4 px-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-600 hover:from-indigo-600 hover:via-purple-700 hover:to-violet-700 text-white rounded-2xl transition-all duration-300 font-bold text-lg tracking-wide shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:scale-105 border border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
            <span className="relative flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {isCreatingTask ? "Create" : "Save"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
