/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { normalizeDate } from '../utils/dateUtils';

const TodoContext = createContext();

// Utility functions for localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Default data
const getDefaultLists = () => [
  { id: 1, name: 'Personal', count: 0, color: '#EF4444' }, // red-500
  { id: 2, name: 'Work', count: 0, color: '#3B82F6' }, // blue-500
  { id: 3, name: 'Fitness', count: 0, color: '#10B981' } // green-500
];

const getDefaultTags = () => [
  { id: 1, name: 'Urgent', color: '#DC2626' }, // red-600
  { id: 2, name: 'Meeting', color: '#2563EB' }, // blue-600
  { id: 3, name: 'Research', color: '#7C3AED' }, // violet-600
  { id: 4, name: 'Planning', color: '#EA580C' }, // orange-600
  { id: 5, name: 'Review', color: '#0D9488' }, // teal-600
  { id: 6, name: 'Health', color: '#059669' } // emerald-600
];

const getDefaultTasks = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 14);
  const nearFuture = new Date(today);
  nearFuture.setDate(today.getDate() + 3);

  return [
    // Today's tasks
    {
      id: 1,
      title: 'Research content ideas for blog posts',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: today.toISOString().split('T')[0],
      tags: ['Research', 'Planning'],
      priority: 'medium',
      description: 'Brainstorm and research trending topics for upcoming blog posts'
    },
    {
      id: 2,
      title: 'Morning workout routine',
      completed: false,
      status: 'in_progress',
      list: 'Fitness',
      dueDate: today.toISOString().split('T')[0],
      tags: ['Health'],
      priority: 'high',
      description: 'Complete 45-minute cardio and strength training session'
    },
    {
      id: 3,
      title: 'Team standup meeting',
      completed: false,
      status: 'new',
      list: 'Work',
      dueDate: today.toISOString().split('T')[0],
      tags: ['Meeting', 'Urgent'],
      priority: 'high',
      description: 'Daily standup with development team at 9:00 AM'
    },
    {
      id: 4,
      title: 'Review quarterly reports',
      completed: false,
      status: 'in_progress',
      list: 'Work',
      dueDate: today.toISOString().split('T')[0],
      tags: ['Review', 'Urgent'],
      priority: 'high',
      description: 'Analyze Q3 performance metrics and prepare summary'
    },
    // Tomorrow's tasks
    {
      id: 5,
      title: 'Create job posting for SEO specialist',
      completed: false,
      status: 'new',
      list: 'Work',
      dueDate: tomorrow.toISOString().split('T')[0],
      tags: ['Planning'],
      priority: 'medium',
      description: 'Draft comprehensive job description and requirements'
    },
    {
      id: 6,
      title: 'Request design assets for landing page',
      completed: false,
      status: 'new',
      list: 'Work',
      dueDate: tomorrow.toISOString().split('T')[0],
      tags: ['Review'],
      priority: 'medium',
      description: 'Contact design team for new product landing page assets'
    },
    {
      id: 7,
      title: 'Grocery shopping for meal prep',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: tomorrow.toISOString().split('T')[0],
      tags: ['Health', 'Planning'],
      priority: 'medium',
      description: 'Buy ingredients for weekly meal preparation'
    },
    // This week's tasks
    {
      id: 8,
      title: 'Renew driver\'s license',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: nearFuture.toISOString().split('T')[0],
      tags: ['Urgent'],
      priority: 'high',
      description: 'Visit DMV to renew expiring driver\'s license'
    },
    {
      id: 9,
      title: 'Plan weekly meal prep',
      completed: false,
      status: 'new',
      list: 'Fitness',
      dueDate: nextWeek.toISOString().split('T')[0],
      tags: ['Health', 'Planning'],
      priority: 'medium',
      description: 'Create meal plan and prep schedule for next week'
    },
    {
      id: 10,
      title: 'Client presentation preparation',
      completed: false,
      status: 'in_progress',
      list: 'Work',
      dueDate: nextWeek.toISOString().split('T')[0],
      tags: ['Meeting', 'Planning'],
      priority: 'high',
      description: 'Prepare slides and materials for client proposal meeting'
    },
    // Future tasks
    {
      id: 11,
      title: 'Quarterly business review',
      completed: false,
      status: 'new',
      list: 'Work',
      dueDate: futureDate.toISOString().split('T')[0],
      tags: ['Meeting', 'Review'],
      priority: 'medium',
      description: 'Comprehensive review of business metrics and strategy'
    },
    {
      id: 12,
      title: 'Plan vacation itinerary',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: futureDate.toISOString().split('T')[0],
      tags: ['Planning'],
      priority: 'low',
      description: 'Research and book activities for summer vacation'
    },
    // Overdue tasks
    {
      id: 13,
      title: 'Submit tax documents',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: yesterday.toISOString().split('T')[0],
      tags: ['Urgent'],
      priority: 'high',
      description: 'Complete and submit remaining tax documentation'
    },
    {
      id: 14,
      title: 'Update portfolio website',
      completed: false,
      status: 'in_progress',
      list: 'Work',
      dueDate: lastWeek.toISOString().split('T')[0],
      tags: ['Planning', 'Review'],
      priority: 'medium',
      description: 'Add recent projects and update contact information'
    },
    {
      id: 15,
      title: 'Schedule annual checkup',
      completed: false,
      status: 'new',
      list: 'Personal',
      dueDate: yesterday.toISOString().split('T')[0],
      tags: ['Health', 'Urgent'],
      priority: 'high',
      description: 'Book appointment with primary care physician'
    },
    // Completed tasks
    {
      id: 16,
      title: 'Complete project documentation',
      completed: true,
      status: 'closed',
      list: 'Work',
      dueDate: yesterday.toISOString().split('T')[0],
      tags: ['Review'],
      priority: 'medium',
      description: 'Finalize documentation for completed project'
    },
    {
      id: 17,
      title: 'Weekly team meeting',
      completed: true,
      status: 'closed',
      list: 'Work',
      dueDate: lastWeek.toISOString().split('T')[0],
      tags: ['Meeting'],
      priority: 'medium',
      description: 'Attend weekly team sync and project updates'
    },
    // Cancelled tasks
    {
      id: 18,
      title: 'Attend conference webinar',
      completed: false,
      status: 'cancelled',
      list: 'Work',
      dueDate: yesterday.toISOString().split('T')[0],
      tags: ['Meeting'],
      priority: 'low',
      description: 'Webinar cancelled by organizers due to technical issues'
    }
  ];
};

const getDefaultStickyNotes = () => [
  {
    id: 1,
    title: 'Social Media',
    content: '- Plan social content\n- Build content calendar\n- Plan promotion and distribution',
    color: '#FEF08A', // yellow-200
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Content Strategy',
    content: 'Would need time to get insights (goals, personals, budget, audits), but after, it would be good to focus on assembling my team (start with SEO specialist, then perhaps an email marketer?). Also need to brainstorm on tooling.',
    color: '#BFDBFE', // blue-200
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Email A/B Tests',
    content: '- Subject lines\n- Sender\n- CTA\n- Sending times',
    color: '#FBCFE8', // pink-200
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Banner Ads',
    content: 'Notes from the workshop:\n- Sizing matters\n- Choose distinctive imagery\n- The landing page must match the display ad',
    color: '#FED7AA', // orange-200
    createdAt: new Date().toISOString()
  }
];

export const TodoProvider = ({ children }) => {
  // Load initial state from localStorage or use defaults
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', false));
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => loadFromStorage('sidebarOpen', true));
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [lists, setLists] = useState(() => loadFromStorage('lists', getDefaultLists()));
  const [tags, setTags] = useState(() => loadFromStorage('tags', getDefaultTags()));
  const [tasks, setTasks] = useState(() => loadFromStorage('tasks', getDefaultTasks()));
  const [stickyNotes, setStickyNotes] = useState(() => loadFromStorage('stickyNotes', getDefaultStickyNotes()));

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    saveToStorage('sidebarOpen', sidebarOpen);
  }, [sidebarOpen]);

  useEffect(() => {
    saveToStorage('lists', lists);
  }, [lists]);

  useEffect(() => {
    saveToStorage('tags', tags);
  }, [tags]);

  useEffect(() => {
    saveToStorage('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage('stickyNotes', stickyNotes);
  }, [stickyNotes]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  // Helper function to get date ranges
  const getDateRanges = () => {
    const today = normalizeDate(new Date());
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Calculate the end of this week (Sunday)
    const thisWeekEnd = new Date(today);
    const daysUntilEndOfWeek = 7 - today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    thisWeekEnd.setDate(today.getDate() + daysUntilEndOfWeek);
    
    // Calculate the end of next week (Sunday after this week)
    const nextWeekEnd = new Date(thisWeekEnd);
    nextWeekEnd.setDate(thisWeekEnd.getDate() + 7);

    return { today, tomorrow, thisWeekEnd, nextWeekEnd };
  };

  const { today, tomorrow, thisWeekEnd, nextWeekEnd } = getDateRanges();

  // Helper function to check if task is active (not completed, closed, or cancelled)
  const isActiveTask = (task) => {
    return !task.completed && task.status !== 'closed' && task.status !== 'cancelled';
  };

  // Filter tasks by date ranges
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate.getTime() === today.getTime();
  });

  const tomorrowTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate.getTime() === tomorrow.getTime();
  });

  const thisWeekTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate > tomorrow && taskDate <= thisWeekEnd;
  });

  const nextWeekTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate > thisWeekEnd && taskDate <= nextWeekEnd;
  });

  const beyondNextWeekTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate > nextWeekEnd;
  });

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || !isActiveTask(task)) return false;
    const taskDate = normalizeDate(task.dueDate);
    return taskDate < today;
  });

  const upcomingTasks = [...tomorrowTasks, ...thisWeekTasks, ...nextWeekTasks, ...beyondNextWeekTasks];

  // Update list counts
  const updateListCounts = () => {
    return lists.map(list => ({
      ...list,
      count: tasks.filter(task => task.list === list.name && isActiveTask(task)).length
    }));
  };

  // Update tag counts
  const updateTagCounts = () => {
    return tags.map(tag => ({
      ...tag,
      count: tasks.filter(task => task.tags && task.tags.includes(tag.name) && isActiveTask(task)).length
    }));
  };

  const listsWithCounts = updateListCounts();
  const tagsWithCounts = updateTagCounts();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleAddNewTask = () => {
    setIsCreatingTask(true);
    setSelectedTask(null);
  };
  
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setIsCreatingTask(false);
  };

  // Task management functions
  const addTask = (taskData) => {
    const newTask = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      ...taskData,
      completed: false,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // List management functions
  const addList = (name, color) => {
    const newList = {
      id: Math.max(...lists.map(l => l.id), 0) + 1,
      name,
      color,
      count: 0
    };
    setLists([...lists, newList]);
  };

  const deleteList = (listId) => {
    const listToDelete = lists.find(list => list.id === listId);
    if (!listToDelete) return;
    
    // Remove the list
    setLists(lists.filter(list => list.id !== listId));
    
    // Remove list references from tasks
    setTasks(tasks.map(task => 
      task.list === listToDelete.name ? { ...task, list: 'Personal' } : task
    ));
  };

  // Tag management functions
  const addTag = (name, color) => {
    const newTag = {
      id: Math.max(...tags.map(t => t.id), 0) + 1,
      name,
      color
    };
    setTags([...tags, newTag]);
  };

  const deleteTag = (tagId) => {
    const tagToDelete = tags.find(tag => tag.id === tagId);
    if (!tagToDelete) return;
    
    // Remove the tag
    setTags(tags.filter(tag => tag.id !== tagId));
    
    // Remove tag references from tasks
    setTasks(tasks.map(task => ({
      ...task,
      tags: task.tags ? task.tags.filter(tag => tag !== tagToDelete.name) : []
    })));
  };

  // Filtering functions
  const getTasksByList = (listName) => {
    return tasks
      .filter(task => task.list === listName && isActiveTask(task))
      .sort((a, b) => {
        // Sort by due date, tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return normalizeDate(a.dueDate) - normalizeDate(b.dueDate);
      });
  };

  const getTasksByTag = (tagName) => {
    return tasks
      .filter(task => task.tags && task.tags.includes(tagName) && isActiveTask(task))
      .sort((a, b) => {
        // Sort by due date, tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return normalizeDate(a.dueDate) - normalizeDate(b.dueDate);
      });
  };

  const getTasksByPriority = (priority) => {
    return tasks
      .filter(task => (task.priority || 'medium') === priority && isActiveTask(task))
      .sort((a, b) => {
        // Sort by due date, tasks without due dates go to the end
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return normalizeDate(a.dueDate) - normalizeDate(b.dueDate);
      });
  };

  // Priority task counts
  const highPriorityTasks = tasks.filter(task => (task.priority || 'medium') === 'high' && isActiveTask(task));
  const mediumPriorityTasks = tasks.filter(task => (task.priority || 'medium') === 'medium' && isActiveTask(task));
  const lowPriorityTasks = tasks.filter(task => (task.priority || 'medium') === 'low' && isActiveTask(task));


  // Sticky note management functions
  const addStickyNote = (title, content, color) => {
    const newNote = {
      id: Math.max(...stickyNotes.map(n => n.id), 0) + 1,
      title,
      content,
      color,
      createdAt: new Date().toISOString()
    };
    setStickyNotes([...stickyNotes, newNote]);
  };

  const updateStickyNote = (id, updates) => {
    setStickyNotes(stickyNotes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteStickyNote = (id) => {
    setStickyNotes(stickyNotes.filter(note => note.id !== id));
  };

  // Search functionality
  const searchTasks = (query) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    return tasks.filter(task => {
      if (!isActiveTask(task)) return false;
      
      // Search in task title
      if (task.title.toLowerCase().includes(searchTerm)) return true;
      
      // Search in task description
      if (task.description && task.description.toLowerCase().includes(searchTerm)) return true;
      
      // Search in list name
      if (task.list && task.list.toLowerCase().includes(searchTerm)) return true;
      
      // Search in tags
      if (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
      
      return false;
    }).sort((a, b) => {
      // Sort by relevance - title matches first, then by due date
      const aInTitle = a.title.toLowerCase().includes(searchTerm);
      const bInTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aInTitle && !bInTitle) return -1;
      if (!aInTitle && bInTitle) return 1;
      
      // If both or neither have title matches, sort by due date
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return normalizeDate(a.dueDate) - normalizeDate(b.dueDate);
    });
  };

  const value = {
    // Core state
    tasks,
    lists: listsWithCounts,
    tags: tagsWithCounts,
    selectedTask,
    setSelectedTask,
    darkMode,
    toggleDarkMode,
    sidebarOpen,
    toggleSidebar,
    isCreatingTask,
    setIsCreatingTask,

    // Task filtering
    todayTasks,
    tomorrowTasks,
    thisWeekTasks,
    nextWeekTasks,
    beyondNextWeekTasks,
    upcomingTasks,
    overdueTasks,

    // Task management
    addTask,
    updateTask,
    deleteTask,
    handleAddNewTask,
    handleTaskSelect,

    // List management
    addList,
    deleteList,
    getTasksByList,

    // Tag management
    addTag,
    deleteTag,
    getTasksByTag,

    // Priority management
    getTasksByPriority,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,

    // Sticky note management
    stickyNotes,
    addStickyNote,
    updateStickyNote,
    deleteStickyNote,

    // Search functionality
    searchQuery,
    setSearchQuery,
    searchTasks
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};