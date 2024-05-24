const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  dueDate: Date,
  boardName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
