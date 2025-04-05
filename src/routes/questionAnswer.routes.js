const express = require("express");
const { authUser } = require("../middlewares/user.middleware");
const {
  createQuestionController,
} = require("../controllers/question.controller");
const router = express.Router();

router.post("/createquestion", authUser, createQuestionController);

module.exports = router;