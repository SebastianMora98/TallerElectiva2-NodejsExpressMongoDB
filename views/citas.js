const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  .then((db) => console.log('Database is connected'))
  .catch((err) => console.log(err));

const CitasSchema = mongoose.Schema({
  nombre_empleado: {
    type: String,
    required: true,
  },
  nombre_cliente: {
    type: String,
    required: true,
  },
  tipo_trabajo: {
    type: String,
    required: true,
  },
  salon: {
    type: String,
    required: true,
  },
  hour_date: {
    hour: {
      type: Number,
      min: 7,
      max: 18,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    sec: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  date: {
    type: Date,
    min: Date.now,
    max: '2020-12-31',
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Citas', CitasSchema);
