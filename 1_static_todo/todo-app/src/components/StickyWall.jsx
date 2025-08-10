import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Pin,
  PinOff,
  Palette,
  StickyNote as StickyNoteIcon,
  Grid3X3,
  List,
  Filter,
  Search,
  Calendar,
  Hash,
  MoreHorizontal,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTodo } from "../context/TodoContext";

const colorPalette = [
  { name: "Sunny", color: "#FEF08A" },
  { name: "Sky", color: "#BFDBFE" },
  { name: "Rose", color: "#FBCFE8" },
  { name: "Mint", color: "#A7F3D0" },
  { name: "Peach", color: "#FED7AA" },
  { name: "Lavender", color: "#DDD6FE" },
  { name: "Coral", color: "#FCA5A5" },
  { name: "Sage", color: "#BBF7D0" },
];

const ModernStickyNote = ({ note, onEdit, onDelete, onPin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color);
  const [showActions, setShowActions] = useState(false);
  const [isPinned, setIsPinned] = useState(note.pinned || false);

  const handleSave = () => {
    onEdit(note.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      color: editColor,
      pinned: isPinned,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color);
    setIsPinned(note.pinned || false);
    setIsEditing(false);
  };

  const togglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    onEdit(note.id, { ...note, pinned: newPinnedState });
  };

  const isLightColor = (hexColor) => {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 165;
  };

  const textColor = isLightColor(note.color) ? "#1f2937" : "#f9fafb";
  const createdDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div
      className={`group relative rounded-3xl border-2 transition-all duration-500 transform hover:scale-[1.02] hover:rotate-1 ${
        isPinned
          ? "shadow-2xl ring-4 ring-violet-400/30"
          : "shadow-lg hover:shadow-2xl"
      }`}
      style={{
        backgroundColor: note.color,
        borderColor: isLightColor(note.color) ? "#00000015" : "#ffffff15",
        boxShadow: `0 20px 40px ${note.color}30, 0 8px 32px ${note.color}20`,
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Pin indicator */}
      {isPinned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center shadow-lg z-10">
          <Pin className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Note content */}
      <div className="p-6 min-h-[200px] flex flex-col">
        {isEditing ? (
          // Edit mode
          <div className="space-y-4 flex-1 flex flex-col">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-xl font-bold bg-transparent border-none outline-none placeholder-opacity-60"
              style={{ color: textColor }}
              placeholder="Note title..."
              autoFocus
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 w-full bg-transparent border-none outline-none resize-none placeholder-opacity-60 text-sm leading-relaxed"
              style={{ color: textColor }}
              placeholder="Start writing your note..."
              rows={6}
            />

            {/* Color palette */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4" style={{ color: textColor }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: textColor }}
                >
                  Color
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colorPalette.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setEditColor(c.color)}
                    className={`w-8 h-8 rounded-full border-3 transition-all duration-200 hover:scale-110 ${
                      editColor === c.color
                        ? "ring-4 ring-white/50 border-white"
                        : "border-white/30"
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <button
                onClick={togglePin}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: textColor,
                }}
              >
                {isPinned ? (
                  <PinOff className="w-4 h-4" />
                ) : (
                  <Pin className="w-4 h-4" />
                )}
                <span className="text-xs font-medium">
                  {isPinned ? "Unpin" : "Pin"}
                </span>
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:bg-green-600 hover:scale-105"
                  disabled={!editTitle.trim() || !editContent.trim()}
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-600 hover:scale-105"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // View mode
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <h3
                className="text-xl font-bold leading-tight pr-2"
                style={{ color: textColor }}
              >
                {note.title}
              </h3>

              <div
                className={`flex space-x-1 transition-all duration-300 ${
                  showActions
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: textColor,
                  }}
                  title="Edit note"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePin}
                  className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: isPinned
                      ? "rgba(139, 92, 246, 0.3)"
                      : "rgba(255, 255, 255, 0.2)",
                    color: isPinned ? "#8b5cf6" : textColor,
                  }}
                  title={isPinned ? "Unpin note" : "Pin note"}
                >
                  {isPinned ? (
                    <Pin className="w-4 h-4" />
                  ) : (
                    <Pin className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => onDelete(note.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="flex-1 text-sm leading-relaxed whitespace-pre-line mb-4"
              style={{ color: textColor }}
            >
              {note.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AddNoteCard = ({ onAdd }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#FEF08A");

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onAdd(title.trim(), content.trim(), color);
      setTitle("");
      setContent("");
      setColor("#FEF08A");
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setColor("#FEF08A");
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-violet-300 dark:border-violet-600 bg-gradient-to-br from-white/95 to-violet-50/80 dark:from-slate-800/95 dark:to-violet-900/20 shadow-xl backdrop-blur-sm">
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="Note title..."
            autoFocus
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 bg-transparent border-none outline-none resize-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 leading-relaxed"
            placeholder="Start writing your note..."
            rows={6}
          />

          {/* Color palette */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Choose Color
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((c) => (
                <button
                  key={c.color}
                  onClick={() => setColor(c.color)}
                  className={`w-8 h-8 rounded-full border-3 transition-all duration-200 hover:scale-110 ${
                    color === c.color
                      ? "ring-4 ring-violet-400/50 border-violet-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              disabled={!title.trim() || !content.trim()}
            >
              <Save className="w-4 h-4" />
              <span>Create Note</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsCreating(true)}
      className="w-full h-[300px] rounded-3xl border-2 border-dashed border-violet-300 dark:border-violet-600 bg-gradient-to-br from-white/90 to-violet-50/60 dark:from-slate-800/90 dark:to-violet-900/20 hover:from-violet-50/90 hover:to-purple-50/80 dark:hover:from-slate-700/90 dark:hover:to-violet-800/30 transition-all duration-500 flex items-center justify-center group transform hover:scale-[1.02] shadow-lg hover:shadow-2xl backdrop-blur-sm"
    >
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150"></div>
          <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-12">
            <Plus className="w-10 h-10 text-violet-500 dark:text-violet-400 group-hover:scale-110 transition-all duration-300" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="block text-xl font-bold text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
            Create New Note
          </span>
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            Click to add a sticky note
          </span>
        </div>
      </div>
    </button>
  );
};

const StickyWall = () => {
  const { stickyNotes, addStickyNote, updateStickyNote, deleteStickyNote } =
    useTodo();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'masonry'
  const [sortBy, setSortBy] = useState("created"); // 'created', 'updated', 'title'

  const handleAddNote = (title, content, color) => {
    addStickyNote(title, content, color);
  };

  const handleEditNote = (id, updates) => {
    updateStickyNote(id, updates);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteStickyNote(id);
    }
  };

  // Filter and sort notes
  const filteredNotes = stickyNotes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "updated":
          return (
            new Date(b.updatedAt || b.createdAt) -
            new Date(a.updatedAt || a.createdAt)
          );
        default: // 'created'
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900/10 min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg">
                  <StickyNoteIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sticky Wall
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredNotes.length} note
                    {filteredNotes.length !== 1 ? "s" : ""}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
              >
                <option value="created">Newest First</option>
                <option value="updated">Recently Updated</option>
                <option value="title">Alphabetical</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-slate-800 shadow-sm text-violet-600 dark:text-violet-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "masonry"
                      ? "bg-white dark:bg-slate-800 shadow-sm text-violet-600 dark:text-violet-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredNotes.length === 0 && searchQuery ? (
          // No search results
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No notes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No notes match your search for "{searchQuery}"
            </p>
          </div>
        ) : (
          // Notes grid
          <div
            className={`grid gap-6 ${
              viewMode === "masonry"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            }`}
          >
            {/* Add note card */}
            <div className="animate-fade-in-up">
              <AddNoteCard onAdd={handleAddNote} />
            </div>

            {/* Existing notes */}
            {filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ModernStickyNote
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredNotes.length === 0 && !searchQuery && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mb-6">
              <StickyNoteIcon className="w-12 h-12 text-violet-500 dark:text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Your sticky wall is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Create your first sticky note to get started
            </p>
            <button
              onClick={() => document.querySelector("[data-add-note]")?.click()}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create First Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyWall;
