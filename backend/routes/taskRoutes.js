const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/taskController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/dashboard-data", protect, adminOnly, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);

router.get("/", protect, getAllTasks);
router.post("/", protect, adminOnly, createTask);

router.get("/:id", protect, getTaskById);
router.put("/:id", protect, adminOnly, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);

router.patch("/:id/status", protect, updateTaskStatus);
router.patch("/:id/todo", protect, updateTodoChecklist);
router.patch("/:id/assignees", protect, adminOnly, updateTaskAssignees);

module.exports = router;
