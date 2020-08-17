const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import Routes
const citasRoute = require('./routes/citas');

// Middlewares
app.use('/citas', citasRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Inicio');
});

// Server is listening
app.listen(3000);
