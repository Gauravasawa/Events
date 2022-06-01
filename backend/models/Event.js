const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  eventName: {
    type: String,
    require: "true",
  },
  eventDescription: {
    type: String,
    require: true,
  },
  eventDate: {
    type: String,
    require: true,
  },
  eventCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("events", EventSchema);
