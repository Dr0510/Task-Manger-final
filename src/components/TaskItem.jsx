import React, { useState } from 'react';
import { Edit, Trash2, Check, X, Calendar, Clock, Save } from 'lucide-react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!editTitle.trim()) {
      newErrors.title = 'Title is required';
    } else if (editTitle.trim().length > 50) {
      newErrors.title = 'Title must be 50 characters or less';
    }
    
    if (editDescription.length > 200) {
      newErrors.description = 'Description must be 200 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateTask(task.id, {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setErrors({});
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-4 border-l-4 border-blue-500 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-2">
              <Edit className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Edit Task</h3>
          </div>

          <div>
            <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="edit-title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
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
              <p className="text-sm text-gray-500">{editTitle.length}/50 characters</p>
              <div className={`w-16 h-1 rounded-full ${
                editTitle.length > 40 ? 'bg-red-300' : editTitle.length > 25 ? 'bg-yellow-300' : 'bg-green-300'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    editTitle.length > 40 ? 'bg-red-500' : editTitle.length > 25 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(editTitle.length / 50) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="edit-description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none font-medium"
              placeholder="Enter task description"
              rows={3}
              maxLength={200}
            />
            {errors.description && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium">{errors.description}</p>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{editDescription.length}/200 characters</p>
              <div className={`w-16 h-1 rounded-full ${
                editDescription.length > 160 ? 'bg-red-300' : editDescription.length > 100 ? 'bg-yellow-300' : 'bg-green-300'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    editDescription.length > 160 ? 'bg-red-500' : editDescription.length > 100 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(editDescription.length / 200) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-4 border-l-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group ${
      task.isCompleted 
        ? 'border-green-500 bg-gradient-to-r from-green-50/50 to-emerald-50/50' 
        : 'border-blue-500 hover:border-indigo-500'
    }`}>
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 transition-all duration-300 ${
        task.isCompleted 
          ? 'bg-gradient-to-br from-green-100/40 to-emerald-100/40' 
          : 'bg-gradient-to-br from-blue-100/40 to-indigo-100/40'
      }`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-200 transform hover:scale-110 ${
                  task.isCompleted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow-lg'
                    : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                }`}
              >
                {task.isCompleted && <Check className="h-4 w-4" />}
              </button>
              <h3 className={`text-xl font-bold transition-all duration-200 ${
                task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              {task.isCompleted && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  Completed
                </div>
              )}
            </div>
            
            {task.description && (
              <p className={`text-gray-600 mb-4 ml-11 leading-relaxed ${
                task.isCompleted ? 'line-through opacity-75' : ''
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 ml-11 text-sm text-gray-500">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Created: {formatDate(task.createdAt)}</span>
              </div>
              {task.completedAt && (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Completed: {formatDate(task.completedAt)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
              title="Edit task"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg"
              title="Delete task"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;