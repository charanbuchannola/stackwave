const express = require("express");
const { authUser } = require("../middlewares/user.middleware");
const {
  createQuestionController,
  getQuestionsController,
} = require("../controllers/question.controller");
const router = express.Router();

router.post("/createquestion", authUser, createQuestionController);

router.get("/getquestions", authUser, getQuestionsController);

module.exports = router;
