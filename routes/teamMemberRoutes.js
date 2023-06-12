const express = require("express");
const router = express.Router();
const teamMemberController = require("../controllers/teamMemberController");

router
  .route("/")
  .get(teamMemberController.getTeamMember)
  .post(teamMemberController.createTeamMember)
  .patch(teamMemberController.updateTeamMember)
  .delete(teamMemberController.deleteTeamMember);

module.exports = router;
