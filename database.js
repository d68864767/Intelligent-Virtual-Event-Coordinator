// database.js

const mongoose = require('mongoose');
const { Client } = require('pg');
const config = require('./config');

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

// PostgreSQL connection
const connectPostgreSQL = async () => {
  const client = new Client({
    host: config.postgresql.host,
    port: config.postgresql.port,
    database: config.postgresql.db,
    ssl: config.postgresql.ssl
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL', error);
  }

  return client;
};

module.exports = {
  connectMongoDB,
  connectPostgreSQL
};
