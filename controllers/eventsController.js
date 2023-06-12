const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");
const MusicTeam = require("../models/MusicTeam");
const InHouseAVTeam = require("../models/InHouseAVTeam")
const LiveStreamAVTeam = require("../models/LiveStreamAVTeam")
const GreeterTeam = require("../models/GreeterTeam")
const PrayerTeam = require("../models/PrayerTeam")
const SetupTeardownTeam = require("../models/SetupTeardownTeam")

// @desc Create new event
// @route POST /events
// @access PRIVATE
const createEvent = asyncHandler(async (req, res) => {
  const { title, image, address, date, itenerary, specialInstructions, teams } =
    req.body;

  // TODO: Can be removed once the frontend form is properly in place and handiling empty fields.
  if (!title || !image || !address || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let musicTeamObject = {
    team: "Music Team",
    teamMembers: [],
    setList: [],
    equipmentList: "",
    teamLead: null
  }

  let inHouseAVTeamObject = {
    team: "In House AV Team",
    teamMembers: [],
    setList: [],
    equipmentList: "",
    teamLead: null
  }

  let liveStreamAVTeamObject = {
    team: "Live Stream AV Team",
    teamMembers: [],
    setList: [],
    equipmentList: "",
    teamLead: null
  }
  let greetersTeamObject = {
    team: "˝Greeter Team",
    teamMembers: [],
    instructions: "",
    teamLead: null
  }

  let prayerTeamObject = {
    team: "Prayer Team",
    teamMembers: [],
    instructions: "",
    teamLead: null
  }

  let setupTeardownTeamObject = {
    team: "Setup TearDown Team",
    teamMembers: [],
    instructions: "",
    teamLead: null
  }


  const musicTeam = await MusicTeam.create(musicTeamObject)
  const inHouseAvTeam = await InHouseAVTeam.create(inHouseAVTeamObject)
  const liveStreamAvTeam = await LiveStreamAVTeam.create(liveStreamAVTeamObject)
  const greetersTeam = await GreeterTeam.create(greetersTeamObject)
  const prayerTeam = await GreeterTeam.create(prayerTeamObject)
  const setupTeardownTeam = await GreeterTeam.create(setupTeardownTeamObject)

  teams.push(musicTeam)
  teams.push(inHouseAvTeam)
  teams.push(liveStreamAvTeam)
  teams.push(greetersTeam)
  teams.push(prayerTeam)
  teams.push(setupTeardownTeam)


  const eventObject = {
    title: title,
    image: image,
    address: address,
    date: date,
    itenerary: itenerary,
    specialInstructions: specialInstructions,
    teams: teams,
  };

  const event = await Event.create(eventObject);

  if (event) {
    res.status(201).json({ message: `New event ${event.title} created` });
  } else {
    res.status(400).json({ message: "Invalid event creation" });
  }
});


// @desc Get all events
// @route GET /events
// @access PRIVATE
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().lean().exec()
  res.json(events);
});

// @desc Get an event
// @route GET /events
// @access PRIVATE
const getEvent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Event ID Required" });
  }

  const event = await Event.findById(id).lean().exec();

  if (!event) {
    return res.status(400).json({ message: " No Event Found" });
  }

  res.json(event);
});



// @desc Update an Event
// @route PATCH /events
// @access PRIVATE
const updateEvent = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    image,
    address,
    date,
    itenerary,
    specialInstructions,
    teams,
  } = req.body;

  if (!title || !image || !address || !date) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const event = await Event.findById(id).exec();

  if (!event) {
    return res.status(400).json({ message: "Event not found" });
  }

  event.title = title;
  event.image = image;
  event.address = address;
  event.date = date;
  event.itenerary = itenerary;
  event.specialInstructions = specialInstructions;
  event.teams = teams;

  const updatedEvent = await event.save();

  res.json({ message: `${updatedEvent.title} has been updated` });
});

// @desc Delete an event
// @route DELETE /events
// @access PRIVATE
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Event ID Required" });
  }

  // Does the event exist to delete?
  const event = await Event.findById(id).exec();

  if (!event) {
    return res.status(400).json({ message: "Team Member not found" });
  }

  const result = await event.deleteOne();

  const reply = `Event ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
