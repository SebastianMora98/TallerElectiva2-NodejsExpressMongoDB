const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  .then((db) => console.log('Database is connected'))
  .catch((err) => console.log(err));

const EmpleadoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employee_position: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);
