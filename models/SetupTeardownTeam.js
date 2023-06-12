const mongoose = require("mongoose");

const setupTeardownTeamSchema = new mongoose.Schema({
  team: String,
  teamLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamMember",
  },
  teamMembers: [mongoose.Schema.Types.ObjectId, "TeamMember"],
  instructions: String,
});

module.exports = mongoose.model("SetupTearDownTeam", setupTeardownTeamSchema);
