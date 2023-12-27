// test.js

const request = require('supertest');
const app = require('./server');
const mongoose = require('mongoose');
const config = require('./config');

// Connect to a Test Database
beforeAll(async () => {
  const url = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}-test`
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
});

// Tests for /api/auth/register
describe('POST /api/auth/register', () => {
  it('should create a new user and return 200 status code', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });
});

// Tests for /api/events
describe('GET /api/events', () => {
  it('should fetch all events and return 200 status code', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

// Tests for /api/invitations
describe('POST /api/invitations', () => {
  it('should create a new invitation and return 200 status code', async () => {
    const res = await request(app)
      .post('/api/invitations')
      .send({
        email: 'testuser@gmail.com',
        eventId: '1234567890'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('invitation');
  });
});

// Tests for /api/feedback
describe('POST /api/feedback', () => {
  it('should create a new feedback and return 200 status code', async () => {
    const res = await request(app)
      .post('/api/feedback')
      .send({
        eventId: '1234567890',
        feedback: 'Great event!'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('feedback');
  });
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
});
