// Date utility functions for consistent formatting across the app

// Format date to display as "Jan 15", "Mar 8" without year
export const formatDateWithoutYear = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Convert ISO date string to format suitable for HTML date input (YYYY-MM-DD)
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Convert "Jan 15" format back to ISO date string (YYYY-MM-DD)
// Uses current year if not specified
export const parseShortDateToISO = (shortDateString, year = new Date().getFullYear()) => {
  if (!shortDateString) return '';
  
  // Handle cases like "Jan 15"
  const months = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const parts = shortDateString.split(' ');
  if (parts.length === 2) {
    const monthName = parts[0];
    const day = parseInt(parts[1]);
    
    if (Object.prototype.hasOwnProperty.call(months, monthName) && !isNaN(day)) {
      const date = new Date(year, months[monthName], day);
      return date.toISOString().split('T')[0];
    }
  }
  
  return '';
};

// Normalize date for comparison (ignore year)
export const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setFullYear(2024); // Use a consistent year for all comparisons
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Check if a date string is in the past (ignoring year)
export const isDateOverdue = (dateString) => {
  if (!dateString) return false;
  const taskDate = normalizeDate(dateString);
  const today = normalizeDate(new Date());
  return taskDate < today;
};

// Check if a date string is today (ignoring year)
export const isDateToday = (dateString) => {
  if (!dateString) return false;
  const taskDate = normalizeDate(dateString);
  const today = normalizeDate(new Date());
  return taskDate.getTime() === today.getTime();
};

// Check if a date string is tomorrow (ignoring year)
export const isDateTomorrow = (dateString) => {
  if (!dateString) return false;
  const taskDate = normalizeDate(dateString);
  const tomorrow = normalizeDate(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return taskDate.getTime() === tomorrow.getTime();
};