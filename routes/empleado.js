const express = require('express');

const router = express.Router();
const Empleados = require('../views/empleado');

// obtiene todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleado = await Empleados.find();
    res.json(empleado);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST
router.post('/', async (req, res) => {
  const empleado = new Empleados({
    name: req.body.name,
    employee_position: req.body.employee_position,
  });

  try {
    const savedEmployee = await empleado.save();
    res.json(savedEmployee);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get('/:empleadoId', async (req, res) => {
  try {
    const empleado = await Empleados.findById(req.params.empleadoId);
    res.json(empleado);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:empleadoId', async (req, res) => {
  try {
    const updateEmpleado = await Empleados.updateOne(
      { _id: req.params.empleadoId },
      {
        $set: {
          name: req.body.name,
          employee_position: req.body.employee_position,
        },
      }
    );
    res.json(updateEmpleado);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:empleadoId', async (req, res) => {
  try {
    const deleteEmpleado = await Empleados.deleteOne({
      _id: req.params.empleadoId,
    });
    res.json(deleteEmpleado);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
