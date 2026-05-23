import React from "react";
import { X, Calendar, ExternalLink } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import AvatarGroup from "./AvatarGroup";

const Modal = ({ isOpen, onClose, task, onStatusChange, onTodoChange }) => {
  if (!isOpen || !task) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTodoToggle = (index) => {
    const updatedChecklist = task.todoChecklist.map((item, idx) => {
      if (idx === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    onTodoChange(updatedChecklist);
  };

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "No due date";

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-xl text-gray-900 pr-8">{task.title}</h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">Status:</span>
              <select
                value={task.status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">Priority:</span>
              <PriorityBadge priority={task.priority} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-gray-100 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Assignees</h3>
              <div className="flex items-center gap-3">
                <AvatarGroup users={task.assignedTo} />
                <span className="text-xs text-gray-600 truncate max-w-[200px]">
                  {task.assignedTo && task.assignedTo.length > 0
                    ? task.assignedTo.map((u) => u.name).join(", ")
                    : "Unassigned"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Due Date</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar size={16} />
                <span>{formattedDueDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Todo Checklist</h3>
            {task.todoChecklist && task.todoChecklist.length > 0 ? (
              <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                {task.todoChecklist.map((item, idx) => (
                  <label
                    key={item._id || idx}
                    className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleTodoToggle(idx)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className={item.completed ? "line-through text-gray-400" : ""}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No checklist items.</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Attachments</h3>
            {task.attachments && task.attachments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {task.attachments.map((file, idx) => (
                  <a
                    key={idx}
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors"
                  >
                    <span>Attachment {idx + 1}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">No attachments.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
