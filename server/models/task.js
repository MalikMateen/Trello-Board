const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  boardName: {
    type: String,
    ref: "Board",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
