// feedbackController.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one feedback
router.get('/:id', getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Create one feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    eventId: req.body.eventId,
    userId: req.body.userId,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function for get by ID
async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: 'Cannot find feedback' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.feedback = feedback;
  next();
}

module.exports = router;
