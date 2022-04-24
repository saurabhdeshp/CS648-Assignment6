require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./db.js');
const { setApplication } = require('./api_handler.js');

const app = express();

setApplication(app);

const port = process.env.API_SERVER_PORT || 3000;

const run = async () => {
  try {
    await connectToDatabase();
    app.listen(3000, () => {
      console.log(`API server started: ${port}`);
    });
  } catch (error) {
    console.log('DB Connection Error - ', error);
  }
};

run();
