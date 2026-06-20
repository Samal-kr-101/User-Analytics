const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true
  },

  event_type: {
    type: String,
    required: true
  },

  page_url: {
    type: String,
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  },

  x: Number,
  y: Number
});

module.exports = mongoose.model("Event", eventSchema);