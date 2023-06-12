const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  volunteer: {
    type: Boolean,
    default: true, // defaulted to volunteer if your role is lead or admin
  },
  teams: [
    {
      type: String, // do not allow more than one team if the team member is on the music, or AV teams
    },
  ],
  phoneNumber: {
    type: String,
    required: true,
  },
  role: String,
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);

/* each team member will be added to each team instead of referenced, this will cut down on the amount of queries that are made since the team members will be placed directly in the document in the teams array */
