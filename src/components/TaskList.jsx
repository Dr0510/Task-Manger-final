import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle, Circle, List, Sparkles } from 'lucide-react';

const TaskList = ({ tasks, filter, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'pending':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const getEmptyMessage = () => {
    switch (filter) {
      case 'completed':
        return {
          icon: CheckCircle,
          title: 'No completed tasks yet',
          message: 'Complete some tasks to see them here!',
          color: 'from-green-500 to-emerald-600',
          bgColor: 'from-green-100/50 to-emerald-100/50'
        };
      case 'pending':
        return {
          icon: Circle,
          title: 'No pending tasks',
          message: 'Great job! You\'ve completed all your tasks.',
          color: 'from-blue-500 to-indigo-600',
          bgColor: 'from-blue-100/50 to-indigo-100/50'
        };
      default:
        return {
          icon: List,
          title: 'No tasks yet',
          message: 'Add your first task to get started on your productivity journey!',
          color: 'from-purple-500 to-pink-600',
          bgColor: 'from-purple-100/50 to-pink-100/50'
        };
    }
  };

  if (filteredTasks.length === 0) {
    const { icon: Icon, title, message, color, bgColor } = getEmptyMessage();
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center relative overflow-hidden">
        {/* Background decorations */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-30`}></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className={`bg-gradient-to-r ${color} rounded-2xl p-6 inline-block mb-6 shadow-lg`}>
            <Icon className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">{message}</p>
          
          {filter === 'all' && (
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Your productivity journey starts here</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-2">
          <List className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {filter === 'all' ? 'All Tasks' : filter === 'pending' ? 'Pending Tasks' : 'Completed Tasks'}
          </h2>
          <p className="text-sm text-gray-500">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
          </p>
        </div>
      </div>
      
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;