const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Inicio');
});

// Server is listening
app.listen(3000);
