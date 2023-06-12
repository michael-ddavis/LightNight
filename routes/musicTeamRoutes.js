const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicTeamController");

router
  .route("/")
  .get(musicController.getAllMusicTeamInfo)
  .patch(musicController.updateMusicTeamInfo)

module.exports = router;
