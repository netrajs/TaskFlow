const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query.assignedTo = req.user.id;
    }
    const tasks = await Task.find(query)
      .populate("assignedTo", "name email profileImageUrl")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email profileImageUrl")
      .populate("createdBy", "name");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedTo", "name email profileImageUrl");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && !task.assignedTo.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoChecklist = async (req, res) => {
  const { todoChecklist } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { todoChecklist },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const inProgressTasks = await Task.countDocuments({ status: "in-progress" });
    const completedTasks = await Task.countDocuments({ status: "completed" });

    const low = await Task.countDocuments({ priority: "low" });
    const medium = await Task.countDocuments({ priority: "medium" });
    const high = await Task.countDocuments({ priority: "high" });

    const recentTasks = await Task.find()
      .populate("assignedTo", "name profileImageUrl")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      tasksByPriority: { low, medium, high },
      recentTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = { assignedTo: userId };

    const totalTasks = await Task.countDocuments(query);
    const pendingTasks = await Task.countDocuments({ ...query, status: "pending" });
    const inProgressTasks = await Task.countDocuments({ ...query, status: "in-progress" });
    const completedTasks = await Task.countDocuments({ ...query, status: "completed" });

    const low = await Task.countDocuments({ ...query, priority: "low" });
    const medium = await Task.countDocuments({ ...query, priority: "medium" });
    const high = await Task.countDocuments({ ...query, priority: "high" });

    const recentTasks = await Task.find(query)
      .populate("assignedTo", "name profileImageUrl")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      tasksByPriority: { low, medium, high },
      recentTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskAssignees = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.assignedTo },
      { new: true }
    ).populate("assignedTo", "name email profileImageUrl");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTodoChecklist,
  updateTaskAssignees,
  getDashboardData,
  getUserDashboardData
};
