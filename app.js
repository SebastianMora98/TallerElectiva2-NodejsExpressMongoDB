require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import Routes
const citasRoute = require('./routes/citas');
const empleadoRoute = require('./routes/empleado');
const tipoTrabajoRoute = require('./routes/tipoTrabajo');
//const postsRoute=require('./routes/posts');

// Middlewares
app.use('/api/citas', citasRoute);
app.use('/api/empleado', empleadoRoute);
app.use('/api/tipoTrabajo', tipoTrabajoRoute);
//app.use('/posts',postsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Inicio');
  // console.log("asds");
});

// Server is listening
app.listen(3000);
