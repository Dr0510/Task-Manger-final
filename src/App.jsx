import React, { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import ConfirmModal from './components/ConfirmModal';

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    taskId: null,
    title: '',
    message: ''
  });

  // Load user and tasks from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('taskTracker_user');
    const savedTasks = localStorage.getItem('taskTracker_tasks');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem('taskTracker_tasks')) {
      localStorage.setItem('taskTracker_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleLogin = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('taskTracker_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    localStorage.removeItem('taskTracker_user');
    localStorage.removeItem('taskTracker_tasks');
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddTask = (title, description) => {
    const newTask = {
      id: generateId(),
      title,
      description,
      createdAt: new Date().toISOString(),
      completedAt: null,
      isCompleted: false
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? updatedTask : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setConfirmModal({
      isOpen: true,
      taskId,
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
    });
  };

  const confirmDelete = () => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== confirmModal.taskId));
    setConfirmModal({
      isOpen: false,
      taskId: null,
      title: '',
      message: ''
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedAt: !task.isCompleted ? new Date().toISOString() : null
            }
          : task
      )
    );
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter(task => !task.isCompleted).length,
      completed: tasks.filter(task => task.isCompleted).length
    };
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (pending first), then by creation date (newest first)
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-2.5">
                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Task Tracker
                </h1>
                <p className="text-sm text-gray-500 -mt-1">Stay organized, stay productive</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-1.5">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-gray-700">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <TaskForm onAddTask={handleAddTask} />
          
          <FilterTabs
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={getTaskCounts()}
          />
          
          <TaskList
            tasks={sortedTasks}
            filter={filter}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({
          isOpen: false,
          taskId: null,
          title: '',
          message: ''
        })}
        onConfirm={confirmDelete}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
};

export default App;