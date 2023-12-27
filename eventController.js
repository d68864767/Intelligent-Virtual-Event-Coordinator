// eventController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('./models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one event
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// Create one event
router.post('/', async (req, res) => {
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
    theme: req.body.theme,
    agenda: req.body.agenda,
    attendees: req.body.attendees
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one event
router.patch('/:id', getEvent, async (req, res) => {
  if (req.body.name != null) {
    res.event.name = req.body.name;
  }
  if (req.body.date != null) {
    res.event.date = req.body.date;
  }
  if (req.body.theme != null) {
    res.event.theme = req.body.theme;
  }
  if (req.body.agenda != null) {
    res.event.agenda = req.body.agenda;
  }
  if (req.body.attendees != null) {
    res.event.attendees = req.body.attendees;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one event
router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Deleted Event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for get by ID operations
async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

module.exports = router;
