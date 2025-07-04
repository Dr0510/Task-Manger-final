import React from 'react';
import { CheckCircle, Circle, List, TrendingUp } from 'lucide-react';

const FilterTabs = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { 
      key: 'all', 
      label: 'All Tasks', 
      icon: List,
      count: taskCounts.all,
      color: 'from-slate-500 to-gray-600',
      bgColor: 'bg-slate-100',
      hoverColor: 'hover:bg-slate-200'
    },
    { 
      key: 'pending', 
      label: 'Pending', 
      icon: Circle,
      count: taskCounts.pending,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200'
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      icon: CheckCircle,
      count: taskCounts.completed,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
      hoverColor: 'hover:bg-green-200'
    }
  ];

  const completionRate = taskCounts.all > 0 ? Math.round((taskCounts.completed / taskCounts.all) * 100) : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full -translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-2">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Task Overview</h2>
              <p className="text-sm text-gray-500">
                {completionRate}% completion rate
              </p>
            </div>
          </div>
          
          {/* Progress circle */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-500"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${completionRate}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-700">{completionRate}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {filters.map(({ key, label, icon: Icon, count, color, bgColor, hoverColor }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`relative p-4 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg group ${
                currentFilter === key
                  ? `bg-gradient-to-r ${color} text-white shadow-lg`
                  : `${bgColor} ${hoverColor} text-gray-700 shadow-md`
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  currentFilter === key 
                    ? 'bg-white/20' 
                    : 'bg-white shadow-sm'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    currentFilter === key 
                      ? 'text-white' 
                      : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`font-semibold text-sm ${
                    currentFilter === key ? 'text-white' : 'text-gray-700'
                  }`}>
                    {label}
                  </p>
                  <p className={`text-2xl font-bold ${
                    currentFilter === key ? 'text-white' : 'text-gray-800'
                  }`}>
                    {count}
                  </p>
                </div>
              </div>
              
              {/* Active indicator */}
              {currentFilter === key && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;