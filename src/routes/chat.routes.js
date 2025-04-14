const express = require("express");
const router = express.Router();

const {
  chatroomController,
  getallroomsController,
  joinroomController,
} = require("../controllers/createchatroom.controller");

const { authUser } = require("../middlewares/user.middleware");

router.post("/create", authUser, chatroomController);
router.get("/rooms", authUser, getallroomsController);
router.post("/join/:roomId", authUser, joinroomController);

module.exports = router;
