const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dueDate: {
      type: Date
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    todoChecklist: [
      {
        text: String,
        completed: {
          type: Boolean,
          default: false
        }
      }
    ],
    attachments: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);
