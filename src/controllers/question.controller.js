const questionModel = require("../models/question.model");

const userModel = require("../models/usermodel");

module.exports.createQuestionController = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const userId = req.user._id;

    if (!title || !body || !tags || tags.length === 0) {
      return res.status(400).json({ error: "All fields are required." });
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

module.exports.getQuestionsController = async (req, res) => {
  try {
    const questions = await questionModel
      .find({})
      .populate("askedBy", "username media") // show user's basic info
      .sort({ createdAt: -1 }); // latest questions first

    res.status(200).json({ questions });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
