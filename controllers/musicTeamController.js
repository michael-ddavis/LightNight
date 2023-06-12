const MusicTeam = require("../models/MusicTeam");
const asyncHandler = require("express-async-handler");


// @desc Get all music team information
// @route GET /music
// @access PRIVATE
const getAllMusicTeamInfo = asyncHandler(async (req, res) => {
    const musicTeamDocument = await MusicTeam.find().lean().exec()
    res.json(musicTeamDocument);
});


// @desc Update Music Team Info
// @route PATCH /music
// @access PRIVATE
const updateMusicTeamInfo = asyncHandler(async (req, res) => {
    const {
        id,
        teamMembers,
        setList,
        equipmentList,
        teamLead,
    } = req.body;

    const musicTeam = await Event.findById(id).exec();

    if (!musicTeam) {
        return res.status(400).json({ message: "MusicTeam not found" });
    }

    musicTeam.teamMembers = teamMembers;
    musicTeam.setList = setList;
    musicTeam.equipmentList = equipmentList;
    musicTeam.teamLead = teamLead;

    const updatedTeam = await musicTeam.save();

    res.json({ message: `${updatedTeam} has been updated` });
});

module.exports = {
    getAllMusicTeamInfo,
    updateMusicTeamInfo,
};
