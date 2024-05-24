const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("boardId");
  res.send(tasks);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Task deleted" });
});

router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

module.exports = router;
