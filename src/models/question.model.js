const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const questionModel = mongoose.model("Question", questionSchema);

module.exports = questionModel;