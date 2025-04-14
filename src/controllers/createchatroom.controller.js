const ChatRoom = require("../models/chatroom.model");

module.exports.chatroomController = async (req, res) => {
  const { question, techCategory } = req.body;
  const newRoom = new ChatRoom({
    question,
    techCategory,
    createdBy: req.user._id,
    participants: [req.user._id],
  });
  await newRoom.save();
  res.json(newRoom);
};
