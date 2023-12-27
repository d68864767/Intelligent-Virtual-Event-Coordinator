const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const MicrosoftGraph = require('@microsoft/microsoft-graph-client');

const authController = require('./authController');
const eventController = require('./eventController');
const invitationController = require('./invitationController');
const feedbackController = require('./feedbackController');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect('mongodb://localhost:27017/intelligent-virtual-event-coordinator', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authController);
app.use('/api/events', eventController);
app.use('/api/invitations', invitationController);
app.use('/api/feedback', feedbackController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
