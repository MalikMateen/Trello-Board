const express = require("express");
const Board = require("../models/board");

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

module.exports = router;
