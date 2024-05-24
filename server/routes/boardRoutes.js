const express = require("express");
const Board = require("../models/board");

const router = express.Router();

router.post("/", async (req, res) => {
  const board = new Board(req.body);
  await board.save();
  res.send(board);
});

router.get("/", async (req, res) => {
  const boards = await Board.find();
  res.send(boards);
});

router.delete("/:id", async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.send({ message: "Board deleted" });
});

module.exports = router;
