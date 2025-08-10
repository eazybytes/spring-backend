# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React todo application built with:
- **Frontend**: React 19 with Vite as the build tool
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: React Context API (TodoContext)
- **Icons**: FontAwesome React components

### Key Architectural Patterns

**Context-Based State Management**: The app uses a single TodoContext that provides:
- Task data and filtering logic (today tasks, upcoming tasks)
- Dark mode state and toggle functionality
- Selected task state for the detail panel
- Static data for lists and tags

**Three-Panel Layout**: 
- `Sidebar.jsx` - Navigation, lists, tags, and settings
- `MainContent.jsx` - Main task list view (currently shows "Today" view)
- `TaskDetails.jsx` - Task detail panel (opens when task is selected)

**Component Structure**:
- All components are functional components using hooks
- Context consumed via `useTodo()` custom hook
- Responsive design with dark mode support throughout

### Data Structure

Tasks contain: id, title, completed, list, dueDate, subtasks count, tags
Lists contain: id, name, count, color
Tags contain: id, name, color

Currently uses dummy data - no backend integration yet.

### Styling Approach

- Tailwind CSS with custom color schemes for lists/tags
- Dark mode implemented via Tailwind's dark: prefix
- Responsive design patterns throughout
- Consistent spacing and typography scale