const ChatRoom = require("../models/chatroom.model");

module.exports.chatroomController = async (req, res) => {
  const { question, techCategory } = req.body;
  try {
    const newRoom = await ChatRoom.create({
      question,
      techCategory,
      createdBy: req.user._id,
      participants: [req.user._id],
    });
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: "Failed to create room" });
  }
};

module.exports.getallroomsController = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().populate("createdBy", "name");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

module.exports.joinroomController = async (req, res) => {
  try {
    const room = await ChatRoom.findById(req.params.roomId);
    if (!room.participants.includes(req.user._id)) {
      room.participants.push(req.user._id);
      await room.save();
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Join room failed" });
  }
};
