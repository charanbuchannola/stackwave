const express = require("express");
const router = express.Router();
const {
  registerUserController,
  loginUserController,
} = require("../controllers/user.controller");

const { upload } = require("../services/Multer.service");

router.post("/register", upload, registerUserController);

router.post("/login", loginUserController);

module.exports = router;
