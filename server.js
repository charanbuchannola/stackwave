require("dotenv").config();

const app = require("./src/app");

const connect = require("./src/db/db");

connect();

const server = require("http").createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`server is created on server ${process.env.port}`);
});
