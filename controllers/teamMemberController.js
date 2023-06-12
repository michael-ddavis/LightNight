const TeamMember = require("../models/TeamMember");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Create new Team Member
// @route POST /addTeamMember
// @access PRIVATE
const createTeamMember = asyncHandler(async (req, res) => {
  const { username, password, volunteer, teams, phoneNumber, role } = req.body;

  // TODO: Can be removed once the frontend form is properly in place and handiling empty fields.
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await TeamMember.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "duplicate username" });
  }

  const hashedPassword = await bcrypt.hash(password, 15);

  const teamMemberObject = {
    username: username,
    password: hashedPassword,
    volunteer: volunteer,
    teams: teams,
    phoneNumber: phoneNumber,
    role: role,
  };

  const teamMember = await TeamMember.create(teamMemberObject);

  if (teamMember) {
    res.status(201).json({ message: `New Team Member ${teamMember} created` });
  } else {
    res.status(400).json({ message: "Invalid team member creation" });
  }
});

// @desc Update existing Team Member
// @route PATCH /updateTeamMember
// @access PRIVATE
const updateTeamMember = asyncHandler(async (req, res) => {
  const { id, username, volunteer, teams, phoneNumber, role, password } =
    req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(teams) ||
    !teams.length ||
    typeof volunteer !== "boolean" ||
    !role ||
    typeof phoneNumber !== "number"
  ) {
    return res.status(400).json({
      message: `All fields except password are required and type of phoneNumber is ${typeof phoneNumber}`,
    });
  }

  const teamMember = await TeamMember.findById(id).exec();

  if (!teamMember) {
    return res.status(400).json({ message: "Team Member not found" });
  }

  const duplicate = await TeamMember.findOne({ username }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  teamMember.username = username;
  teamMember.volunteer = volunteer;
  teamMember.teams = teams;
  teamMember.phoneNumber = phoneNumber;
  teamMember.role = role;

  if (password) {
    // Hash password
    teamMember.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedMember = await teamMember.save();

  res.json({ message: `${updatedMember.username} updated` });
});

// @desc Get Team Members
// @route GET /getTeamMembers
// @access PRIVATE
const getTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Team Member ID Required" });
  }

  const teamMember = await TeamMember.findById(id).lean().exec();

  if (!teamMember) {
    return res.status(400).json({ message: " No User Found" });
  }

  res.json(teamMember);
});

// @desc Delete  Team Member
// @route DELETE /deleteTeamMember
// @access PRIVATE
const deleteTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Team Member ID Required" });
  }

  // Does the user exist to delete?
  const teamMember = await TeamMember.findById(id).exec();

  if (!teamMember) {
    return res.status(400).json({ message: "Team Member not found" });
  }

  const result = await teamMember.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
