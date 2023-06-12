const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songName: String,
  ledBy: String,
  chordChart: String,
});

module.exports = mongoose.model("Song", songSchema);
