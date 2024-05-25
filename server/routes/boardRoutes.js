const express = require("express");
const Board = require("../models/board");
const Task = require("../models/task");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { boardName } = req.body;
    const board = new Board({
      name: boardName,
      tasks: [],
    });
    await board.save();
    res.status(200).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const boards = await Board.find().populate("tasks");
    res.status(200).json(boards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete/:name", async (req, res) => {
  const boardName = req.params.name;
  try {
    const deletedBoard = await Board.findOneAndDelete({ name: boardName });
    res.status(200).json(deletedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { sourceBoardName, destinationBoardName, taskTitle } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { title: taskTitle },
      { boardName: destinationBoardName },
      {
        new: true,
      }
    );
    const taskId = task._id;
    await Board.findOneAndUpdate(
      { name: sourceBoardName },
      { $pull: { tasks: taskId } }
    );
    await Board.findOneAndUpdate(
      { name: destinationBoardName },
      { $push: { tasks: taskId } }
    );
    res.status(200).json({ message: "Board Updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
