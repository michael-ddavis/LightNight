const mongoose = require("mongoose");

const greeterTeamSchema = new mongoose.Schema({
  team: String,
  teamLead: {
    type: mongoose.Types.ObjectId,
    ref: "TeamMember",
  },
  teamMembers: [mongoose.Types.ObjectId, "TeamMember"],
  instructions: String,
});

module.exports = mongoose.model("GreeterTeam", greeterTeamSchema);
