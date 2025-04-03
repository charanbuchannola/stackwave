const express = require("express");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

module.exports = app;
