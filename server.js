const { Server } = require("socket.io");
require("dotenv").config();
const app = require("./src/app");
const jwt = require("jsonwebtoken");

const connect = require("./src/db/db");
connect();

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("Connection rejected: No token provided");
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  // Add your custom socket event handlers here
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // io.emit("message", data); // Broadcast the message to all connected clients
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is created on port ${process.env.PORT}`);
});
