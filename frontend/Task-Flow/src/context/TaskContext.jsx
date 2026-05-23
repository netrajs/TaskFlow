import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ApiPaths from "../utils/ApiPaths";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(ApiPaths.TASKS.GET_ALL, { params });
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = async (id) => {
    try {
      const response = await axiosInstance.get(ApiPaths.TASKS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch task details");
      throw error;
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axiosInstance.post(ApiPaths.TASKS.CREATE, taskData);
      toast.success("Task created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create task");
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axiosInstance.put(ApiPaths.TASKS.UPDATE(id), taskData);
      toast.success("Task updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update task");
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(ApiPaths.TASKS.DELETE(id));
      toast.success("Task deleted successfully");
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      toast.error("Failed to delete task");
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      loading, 
      fetchTasks, 
      getTaskById, 
      createTask, 
      updateTask, 
      deleteTask 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
