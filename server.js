const { Server } = require("socket.io");
require("dotenv").config();
const app = require("./src/app");
const jwt = require("jsonwebtoken");

const connect = require("./src/db/db");
connect();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Authenticate socket connections using JWT
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
    console.log("Decoded JWT:", decoded); // Log the decoded JWT for debugging

    if (!decoded) {
      return next(new Error("Authentication error"));
    }

    socket.user = decoded; // Attach decoded user to socket
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(
    "User connected",
    socket.user?.name || socket.user?.username || "Unknown User"
  );

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(
      `${
        socket.user?.name || socket.user?.username || "Unknown User"
      } joined room ${roomId}`
    );

    // Notify all participants in the room, including the sender
    io.to(roomId).emit("receive-message", {
      user: "System",
      message: `${socket.user?.name || "A user"} joined the room.`,
      time: new Date(),
    });
  });

  socket.on("send-message", ({ roomId, message }) => {
    const user = socket.user?.name || "Unknown User";
    const msgData = { user, message, time: new Date() };

    // Broadcast the message to all participants in the room
    io.to(roomId).emit("receive-message", msgData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
