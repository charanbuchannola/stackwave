const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");

module.exports.messageController = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    
  } catch (err) {
    console.log(err);
  }
};
