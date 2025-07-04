import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length > 50) {
      newErrors.title = 'Title must be 50 characters or less';
    }
    
    if (description.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddTask(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setErrors({});
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-3 group"
        >
          <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
            <Plus className="h-5 w-5" />
          </div>
          Add New Task
          <Sparkles className="h-5 w-5 opacity-70" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full -translate-y-16 translate-x-16"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-2">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm font-medium"
              placeholder="Enter task title"
              maxLength={50}
            />
            {errors.title && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{errors.title}</p>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{title.length}/50 characters</p>
              <div className={`w-16 h-1 rounded-full ${
                title.length > 40 ? 'bg-red-300' : title.length > 25 ? 'bg-yellow-300' : 'bg-green-300'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    title.length > 40 ? 'bg-red-500' : title.length > 25 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(title.length / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none font-medium"
              placeholder="Enter task description"
              rows={4}
              maxLength={200}
            />
            {errors.description && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{errors.description}</p>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{description.length}/200 characters</p>
              <div className={`w-16 h-1 rounded-full ${
                description.length > 160 ? 'bg-red-300' : description.length > 100 ? 'bg-yellow-300' : 'bg-green-300'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    description.length > 160 ? 'bg-red-500' : description.length > 100 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(description.length / 200) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;