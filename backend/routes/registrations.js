const Registration = require('../models/Registration');
const Event = require('../models/Event');
const express = require('express');
const router = express.Router();

// create a new registration
router.post('/', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();

    await Event.findByIdAndUpdate(
      newRegistration.eventId,
      // todo: what's this? $inc?
      {$inc: {participantsCount: 1}}
    );

    res.status(201).json({message: 'Registration successfull'});
  } catch (err) {
    console.error('Error saving registration:', err);
    res.status(500).json({message: 'Error saving registration:', error: err});
  }
});

// get the list of participants for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participants = await Registration.find({eventId: eventId});

    res.json(participants);
  } catch (error) {
    console.error('Error fetching participants', error);
    res.status(500).json({message: 'Error fetching participants', error});
  }
});

module.exports = router;
