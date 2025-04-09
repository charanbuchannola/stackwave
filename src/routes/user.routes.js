const express = require("express");
const router = express.Router();
const {
  registerUserController,
  loginUserController,
  getUserProfileController,
} = require("../controllers/user.controller");

const { authUser } = require("../middlewares/user.middleware");

const { upload } = require("../services/Multer.service");

router.post("/register", upload, registerUserController);

router.post("/login", loginUserController);

router.get("/profile", authUser, getUserProfileController);

module.exports = router;
