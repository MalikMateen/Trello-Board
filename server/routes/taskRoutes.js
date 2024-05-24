const express = require("express");
const Task = require("../models/task");
const Board = require("../models/board");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    await Board.findOneAndUpdate(
      { name: task.boardName },
      { $push: { tasks: task._id } },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete/:title", async (req, res) => {
  const taskTitle = req.params.title;
  try {
    const deletedTask = await Task.findOneAndDelete({ title: taskTitle });
    await Board.findOneAndUpdate(
      { name: deletedTask.boardName },
      { $pull: { tasks: deletedTask._id } },
      { new: true }
    );
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findOne({ title });
    const updatedTask = await Task.findOneAndUpdate({ title }, req.body, {
      new: true,
    });
    if (task.boardName !== updatedTask.boardName) {
      await Board.findOneAndUpdate(
        { name: task.boardName },
        { $pull: { tasks: updatedTask._id } }
      );

      await Board.findOneAndUpdate(
        { name: updatedTask.boardName },
        { $push: { tasks: updatedTask._id } }
      );
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
