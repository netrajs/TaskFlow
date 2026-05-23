import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import { Trash2, Plus } from "lucide-react";

const CreateTask = () => {
  const [data, setData] = useState({
    formData: {
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: []
    },
    users: [],
    newTodo: "",
    newAttachment: "",
    loading: false,
    error: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(ApiPaths.USERS.GET_ALL);
        setData((prev) => ({ ...prev, users: response.data }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value }
    }));
  };

  const handleToggleUser = (userId) => {
    setData((prev) => {
      const isAssigned = prev.formData.assignedTo.includes(userId);
      const newAssigned = isAssigned
        ? prev.formData.assignedTo.filter((id) => id !== userId)
        : [...prev.formData.assignedTo, userId];
      return {
        ...prev,
        formData: {
          ...prev.formData,
          assignedTo: newAssigned
        }
      };
    });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!data.newTodo.trim()) return;
    setData((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        todoChecklist: [...prev.formData.todoChecklist, { text: prev.newTodo, completed: false }]
      },
      newTodo: ""
    }));
  };

  const handleRemoveTodo = (index) => {
    setData((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        todoChecklist: prev.formData.todoChecklist.filter((_, idx) => idx !== index)
      }
    }));
  };

  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (!data.newAttachment.trim()) return;
    setData((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        attachments: [...prev.formData.attachments, prev.newAttachment]
      },
      newAttachment: ""
    }));
  };

  const handleRemoveAttachment = (index) => {
    setData((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        attachments: prev.formData.attachments.filter((_, idx) => idx !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.formData.title) return;
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await axiosInstance.post(ApiPaths.TASKS.CREATE, data.formData);
      navigate("/admin/tasks");
    } catch (err) {
      setData((prev) => ({ ...prev, loading: false, error: err.message }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6 border border-gray-200">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 block">Task Title</label>
          <input
            type="text"
            name="title"
            required
            value={data.formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-950"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 block">Description</label>
          <textarea
            name="description"
            value={data.formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none h-28 text-sm text-gray-950"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 block">Priority</label>
            <select
              name="priority"
              value={data.formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white text-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 block">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={data.formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Assign To</label>
          <div className="flex flex-wrap gap-2">
            {data.users.map((user) => {
              const isSelected = data.formData.assignedTo.includes(user._id);
              return (
                <button
                  type="button"
                  key={user._id}
                  onClick={() => handleToggleUser(user._id)}
                  className={`border rounded-lg px-3 py-2 flex items-center gap-2 transition-all ${
                    isSelected ? "bg-blue-50 border-blue-300" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <img
                    src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">TODO Checklist</label>
          <div className="space-y-2">
            {data.formData.todoChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-500 w-5">{idx + 1}.</span>
                <span className="flex-1 text-sm text-gray-700">{item.text}</span>
                <Trash2
                  onClick={() => handleRemoveTodo(idx)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  size={16}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a task..."
              value={data.newTodo}
              onChange={(e) => setData((prev) => ({ ...prev, newTodo: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTodo}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 text-gray-700"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Attachments</label>
          <div className="space-y-2">
            {data.formData.attachments.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-500 w-5">{idx + 1}.</span>
                <span className="flex-1 text-sm text-gray-700 truncate">{file}</span>
                <Trash2
                  onClick={() => handleRemoveAttachment(idx)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  size={16}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add URL..."
              value={data.newAttachment}
              onChange={(e) => setData((prev) => ({ ...prev, newAttachment: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddAttachment}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 text-gray-700"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {data.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
            {data.error}
          </div>
        )}

        <button
          type="submit"
          disabled={data.loading}
          className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center text-sm disabled:opacity-75 shadow-sm"
        >
          {data.loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
