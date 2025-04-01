const express = require("express");
const userRoutes = require("./routes/user.routes");
const app = express();
const connect = require("../src/db/db");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

module.exports = app;
