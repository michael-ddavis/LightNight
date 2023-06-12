const mongoose = require("mongoose");

const liveStreamAVTeamSchema = new mongoose.Schema({
  team: String,
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" }],
  setList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  equipmentList: String,
  teamLead: {
    type: mongoose.Schema.Types.ObjectId, ref: "TeamMember"
  },
});

module.exports = mongoose.model("LiveStreamAVTeam", liveStreamAVTeamSchema);
