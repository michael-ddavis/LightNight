const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  sentBy: String,
  dateMessageSent: Date,
});

module.exports = mongoose.model("Message", messageSchema);
