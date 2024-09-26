const Registration = require('../models/Registration');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {fullName, email, dateOfBirth, referralSource, eventId} = req.body;
    const newRegistration = new Registration({
      fullName,
      email,
      dateOfBirth,
      referralSource,
      eventId,
    });

    const savedRegistation = await newRegistration.save();
    res.status(201).json(savedRegistation);
  } catch (err) {
    console.error('Error saving registration:', err);
    res.status(500).json({message: 'Error saving registration:', error: err});
  }
});

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
