// config.js

module.exports = {
  // MongoDB configuration
  mongodb: {
    host: 'localhost',
    port: '27017',
    db: 'intelligent-virtual-event-coordinator'
  },

  // PostgreSQL configuration
  postgresql: {
    host: 'localhost',
    port: '5432',
    db: 'intelligent-virtual-event-coordinator',
    ssl: {
      rejectUnauthorized: false
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1h'
  },

  // Nodemailer configuration
  nodemailer: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL || 'your-email@gmail.com',
      pass: process.env.PASSWORD || 'your-password'
    }
  },

  // Google APIs configuration
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback',
    scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send']
  },

  // Microsoft Graph configuration
  microsoft: {
    clientId: process.env.MICROSOFT_CLIENT_ID || 'your-microsoft-client-id',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || 'your-microsoft-client-secret',
    redirectUri: process.env.MICROSOFT_REDIRECT_URI || 'http://localhost:3000/oauth2callback',
    scopes: ['https://graph.microsoft.com/.default']
  },

  // Server configuration
  server: {
    port: process.env.PORT || 3000
  }
};
