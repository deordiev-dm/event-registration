const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  email: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  referralSource: {type: String, required: false},
  eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
  registrationDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Registration', registrationSchema);
