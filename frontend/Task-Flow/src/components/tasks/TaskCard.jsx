import React from 'react';
import moment from 'moment';
import { Paperclip, Calendar } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import PriorityBadge from '../ui/PriorityBadge';
import AvatarGroup from '../ui/AvatarGroup';

const TaskCard = ({ task, onClick, provided, innerRef }) => {
  const { title, description, priority, dueDate, teammates = [], assets = [], activities = [] } = task;

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.completed).length;
  const progress = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

  const getProgressColor = () => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-blue-500';
    return 'bg-gray-200';
  };

  return (
    <div 
      ref={innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      onClick={() => onClick && onClick(task)}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer p-4 group select-none mb-3"
    >
      <div className="flex justify-end mb-2">
        <PriorityBadge priority={priority} />
      </div>

      <div className="mb-3">
        <h4 className="font-semibold text-[#172B4D] line-clamp-2 leading-snug group-hover:text-[#0052CC] transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-[#5E6C84] line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-[10px] uppercase font-bold text-[#5E6C84]">
          <span>Task Done: {completedActivities}/{totalActivities}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#5E6C84] mb-3 uppercase">
        <Calendar size={12} className="text-[#6B778C]" />
        <span>{moment(dueDate).format("Do MMM YYYY")}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <AvatarGroup users={teammates} />
        {assets.length > 0 && (
          <div className="flex items-center gap-1 text-[#6B778C]">
            <Paperclip size={14} />
            <span className="text-xs font-bold">{assets.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
