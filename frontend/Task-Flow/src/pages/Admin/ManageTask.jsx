import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import { Search, Plus, Calendar, Paperclip } from "lucide-react";
import PriorityBadge from "../../components/ui/PriorityBadge";
import AvatarGroup from "../../components/ui/AvatarGroup";
import Modal from "../../components/ui/Modal";

const TaskCard = ({ task, onClick }) => {
  const totalTodos = task.todoChecklist?.length || 0;
  const completedTodos = task.todoChecklist?.filter((t) => t.completed).length || 0;
  const percent = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-400">#{task._id.slice(-4)}</span>
        <PriorityBadge priority={task.priority} />
      </div>

      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mt-1">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{task.description}</p>
      )}

      {totalTodos > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
            <span>Task Done: {completedTodos}/{totalTodos}</span>
            <span>{percent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                percent === 100 ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar size={12} />
          <span className="text-xs">{formattedDate || "No date"}</span>
        </div>
        <div className="flex items-center gap-2">
          {task.attachments && task.attachments.length > 0 && (
            <div className="flex items-center gap-0.5 text-gray-400">
              <Paperclip size={12} />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}
          <AvatarGroup users={task.assignedTo} />
        </div>
      </div>
    </div>
  );
};

const ManageTask = () => {
  const [data, setData] = useState({
    tasks: [],
    loading: true,
    searchQuery: "",
    priorityFilter: "all",
    selectedTask: null,
    showModal: false
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(ApiPaths.TASKS.GET_ALL);
        setData((prev) => ({ ...prev, tasks: response.data, loading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchTasks();
  }, []);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axiosInstance.patch(`/api/tasks/${data.selectedTask._id}/status`, {
        status: newStatus
      });
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t._id === prev.selectedTask._id ? response.data : t)),
        selectedTask: response.data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoChange = async (updatedChecklist) => {
    try {
      const response = await axiosInstance.patch(`/api/tasks/${data.selectedTask._id}/todo`, {
        todoChecklist: updatedChecklist
      });
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t._id === prev.selectedTask._id ? response.data : t)),
        selectedTask: response.data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const filteredTasks = data.tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(data.searchQuery.toLowerCase());
    const matchesPriority =
      data.priorityFilter === "all" || task.priority === data.priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const columns = [
    { label: "Pending", status: "pending", color: "bg-purple-500" },
    { label: "In Progress", status: "in-progress", color: "bg-blue-500" },
    { label: "Completed", status: "completed", color: "bg-green-500" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Tasks</h1>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={data.searchQuery}
              onChange={(e) => setData((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-10 border border-gray-200 rounded-lg py-2 px-4 w-64 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 bg-white"
            />
          </div>

          <select
            value={data.priorityFilter}
            onChange={(e) => setData((prev) => ({ ...prev, priorityFilter: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <Link
          to="/admin/create-task"
          className="bg-[#0052CC] hover:bg-[#0065FF] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Create Task</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="bg-gray-50 rounded-xl p-4 flex flex-col min-h-[500px]">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wide">
                  {col.label}
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold">
                  {colTasks.length}
                </span>
              </div>

              <div className="flex-1 max-h-[calc(100vh-300px)] overflow-y-auto space-y-3 pr-1">
                {colTasks.length > 0 ? (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={() =>
                        setData((prev) => ({ ...prev, selectedTask: task, showModal: true }))
                      }
                    />
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center py-12">
                    <p className="text-gray-400 text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={data.showModal}
        onClose={() => setData((prev) => ({ ...prev, showModal: false }))}
        task={data.selectedTask}
        onStatusChange={handleStatusChange}
        onTodoChange={handleTodoChange}
      />
    </div>
  );
};

export default ManageTask;
