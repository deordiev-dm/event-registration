const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const sortField = req.query.sortField;
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

  try {
    let query = Event.find();

    if (sortField) {
      query = query.sort({[sortField]: sortOrder});
    }

    const events = await query.skip(skip).limit(limit);
    const total = await Event.countDocuments();

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch events'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event');
    res.status(500).json({message: 'Error fetching event', error});
  }
});

module.exports = router;
