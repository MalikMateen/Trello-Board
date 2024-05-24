require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL);

app.use("/board", boardRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
