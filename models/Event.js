const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  itenerary: String,
  specialInstructions: String,
  teams: [],
});

module.exports = mongoose.model("Event", eventSchema);
