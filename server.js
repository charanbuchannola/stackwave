const { Server } = require("socket.io");
require("dotenv").config();
const app = require("./src/app");

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
  const token = socket.handshake.auth.token;
  if (!token) {
    console.log("Connection rejected: No token provided");
    return next(new Error("Authentication error"));
  }

  // Verify the token (replace with your token verification logic)
  if (token === process.env.AUTH_TOKEN) {
    console.log("Authentication successful");
    return next();
  } else {
    console.log("Connection rejected: Invalid token");
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
  console.log(`server is created on server ${process.env.port}`);
});
