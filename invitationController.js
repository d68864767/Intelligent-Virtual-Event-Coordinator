const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const MicrosoftGraph = require('@microsoft/microsoft-graph-client');
const config = require('./config');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: config.nodemailer.service,
  auth: {
    user: config.nodemailer.auth.user,
    pass: config.nodemailer.auth.pass
  }
});

// Google OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
);

// Microsoft Graph client setup
const msGraphClient = MicrosoftGraph.Client.init({
  authProvider: (done) => {
    done(null, config.microsoft.clientSecret);
  }
});

// Route to create an invitation
router.post('/', async (req, res) => {
  const { email, subject, message, calendarEvent } = req.body;

  // Send email invitation
  const mailOptions = {
    from: config.nodemailer.auth.user,
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // Create calendar event
  if (calendarEvent) {
    const event = {
      summary: subject,
      description: message,
      start: {
        dateTime: calendarEvent.start,
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: calendarEvent.end,
        timeZone: 'America/Los_Angeles'
      },
      attendees: [{ email: email }]
    };

    try {
      // Use Google Calendar API to create event
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      const createdEvent = await calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      // Use Microsoft Graph API to create event
      const createdEventMS = await msGraphClient
        .api('/me/calendar/events')
        .post(event);

      res.status(200).json({ googleEvent: createdEvent, microsoftEvent: createdEventMS });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error creating calendar event' });
    }
  } else {
    res.status(200).json({ message: 'Invitation sent without calendar event' });
  }
});

module.exports = router;
