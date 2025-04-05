const express = require("express");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/questionAnswer.routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);

module.exports = app;
