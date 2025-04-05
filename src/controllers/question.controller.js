const questionModel = require("../models/question.model");

const userModel = require("../models/usermodel");

module.exports.createQuestionController = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.user.id; // assuming user ID is available from JWT/auth middleware

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const newQuestion = await questionModel.create({
      title,
      body,
      tags,
      askedBy: userId,
    });

    // push the question to the user's profile
    await userModel.findByIdAndUpdate(userId, {
      $push: { questions: newQuestion._id },
    });

    res.status(201).json({ newQuestion });
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
