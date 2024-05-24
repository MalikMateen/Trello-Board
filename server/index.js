require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL);

app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
