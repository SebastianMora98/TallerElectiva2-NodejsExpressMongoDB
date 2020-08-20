const express = require('express');

const router = express.Router();
const Citas = require('../views/citas');
const TipoTrabajo = require('../views/TipoTrabajo');
const Empleados = require('../views/empleado');

//obtener citas
router.get('/', async (req, res) => {
  try {
    const citas = await Citas.find();
    res.json(citas);
  } catch (err) {
    res.json({ message: err });
  }
});

//agregar cita
router.post('/', async (req, res) => {
  const nombre_empleadoExists = await Empleados.findOne({
    name: req.body.nombre_empleado,
  });

  const tipo_trabajoExists = await TipoTrabajo.findOne({
    nombre_tipo: req.body.tipo_trabajo,
  });

  // validar fecha y hora
  const citaExists = await Citas.find({
    nombre_empleado: req.body.nombre_empleado,
  });

  var isfind = false;

  citaExists.forEach((element) => {
    if (new Date(element.date).getTime() == new Date(req.body.date).getTime()) {
      if (
        element.hour_date.hour == req.body.hour_date.hour &&
        element.hour_date.min == req.body.hour_date.min
      ) {
        isfind = true;
      }
    }
  });

  if (isfind)
    return res
      .status(400)
      .send('Ya existe una cita con el empleado en la misma fecha y hora');

  //validacion empleado
  if (!nombre_empleadoExists)
    return res
      .status(400)
      .send('No existe el empleado dentro de la base de datos');
  //validacion trabajo
  if (!tipo_trabajoExists)
    return res
      .status(400)
      .send('No existe el tipo de trabajo dentro de la base de datos');
  //validacion empleado-trabajo
  if (
    !(nombre_empleadoExists.employee_position == tipo_trabajoExists.nombre_tipo)
  )
    return res
      .status(400)
      .send(
        'El empleado ' +
          nombre_empleadoExists.name +
          ' no tiene el cargo ' +
          tipo_trabajoExists.nombre_tipo
      );

  const citas = new Citas({
    nombre_empleado: req.body.nombre_empleado,
    nombre_cliente: req.body.nombre_cliente,
    tipo_trabajo: req.body.tipo_trabajo,
    salon: req.body.salon,
    hour_date: req.body.hour_date,
    date: req.body.date,
    description: req.body.description,
  });

  try {
    const savedCita = await citas.save();
    res.json(savedCita);
  } catch (err) {
    res.json({ message: err });
  }
});

//obtener cita por id
router.get('/:citaId', async (req, res) => {
  try {
    const cita = await Citas.findById(req.params.citaId);
    res.json(cita);
  } catch (err) {
    res.json({ message: err });
  }
});

//actualizar cita
router.patch('/:citaId', async (req, res) => {
  const nombre_empleadoExists = await Empleados.findOne({
    name: req.body.nombre_empleado,
  });

  const tipo_trabajoExists = await TipoTrabajo.findOne({
    nombre_tipo: req.body.tipo_trabajo,
  });

  // validar fecha y hora
  const citaExists = await Citas.find({
    nombre_empleado: req.body.nombre_empleado,
  });

  var isfind = false;

  citaExists.forEach((element) => {
    console.log(element._id, typeof element._id);
    console.log(req.params.citaId, typeof req.params.citaId);
    console.log(element._id != req.body.citaId);
    if (element._id != req.params.citaId) {
      if (
        new Date(element.date).getTime() == new Date(req.body.date).getTime()
      ) {
        if (
          element.hour_date.hour == req.body.hour_date.hour &&
          element.hour_date.min == req.body.hour_date.min
        ) {
          isfind = true;
        }
      }
    }
  });

  if (isfind)
    return res
      .status(400)
      .send('Ya existe una cita con el empleado en la misma fecha y hora');

  //validacion empleado
  if (!nombre_empleadoExists)
    return res
      .status(400)
      .send('No existe el empleado dentro de la base de datos');
  //validacion trabajo
  if (!tipo_trabajoExists)
    return res
      .status(400)
      .send('No existe el tipo de trabajo dentro de la base de datos');
  //validacion empleado-trabajo
  if (
    !(nombre_empleadoExists.employee_position == tipo_trabajoExists.nombre_tipo)
  )
    return res
      .status(400)
      .send(
        'El empleado ' +
          nombre_empleadoExists.name +
          ' no tiene el cargo ' +
          tipo_trabajoExists.nombre_tipo
      );
  // validar fecha

  if (new Date(req.body.date) < new Date(Date.now()))
    return res
      .status(400)
      .send(
        'La nueva fecha para la cita (' +
          new Date(req.body.date) +
          ') es menor al dia de hoy (' +
          new Date(Date.now()) +
          ')'
      );

  if (new Date(req.body.date) > new Date('2020-12-31'))
    return res
      .status(400)
      .send(
        'La nueva fecha para la cita (' +
          new Date(req.body.date) +
          ') no puede ser mayor a (' +
          new Date('2020-12-31')
      );

  try {
    const updateCita = await Citas.updateOne(
      { _id: req.params.citaId },
      {
        $set: {
          nombre_empleado: req.body.nombre_empleado,
          nombre_cliente: req.body.nombre_cliente,
          tipo_trabajo: req.body.tipo_trabajo,
          salon: req.body.salon,
          hour_date: req.body.hour_date,
          date: req.body.date,
          creation_date: req.body.creation_date,
          description: req.body.description,
        },
      }
    );
    res.json(updateCita);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:citaId', async (req, res) => {
  try {
    const deleteCita = await Citas.deleteOne({
      _id: req.params.citaId,
    });
    res.json(deleteCita);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
