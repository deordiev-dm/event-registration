const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  eventDate: {type: Date, required: true},
  eventDate: {type: String, required: true},
  participantsCount: {type: Number, default: 0},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
