const User = require("../models/User");
const Task = require("../models/Task");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password").lean();

    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const pending = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending"
        });
        const inProgress = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress"
        });
        const completed = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed"
        });

        return {
          ...user,
          taskCounts: {
            pending,
            inProgress,
            completed
          },
          taskStats: {
            pending,
            inProgress,
            completed
          }
        };
      })
    );

    res.json(usersWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = await Task.find({ assignedTo: id }).sort({ createdAt: -1 });

    res.json({
      user,
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById
};
