require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./views/database');

app.use(bodyParser.json());

// Import Routes
const citasRoute = require('./routes/citas');
//const postsRoute=require('./routes/posts');



// Middlewares
app.use('/citas', citasRoute);
//app.use('/posts',postsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Inicio');
 // console.log("asds");
});



// Server is listening
app.listen(3000);
