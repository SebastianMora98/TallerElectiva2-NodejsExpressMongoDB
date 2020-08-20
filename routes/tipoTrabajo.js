const express = require('express');

const router = express.Router();
const TipoTrabajo = require('../views/TipoTrabajo');

// obtiene todos los tipos de trabajo
router.get('/', async (req, res) => {
  try {
    const tipo = await TipoTrabajo.find();
    res.json(tipo);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST
router.post('/', async (req, res) => {
  const tipo = new TipoTrabajo({
    nombre_tipo: req.body.nombre_tipo,
  });

  try {
    const savedTipo = await tipo.save();
    res.json(savedTipo);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get('/:tipoId', async (req, res) => {
  try {
    const tipo = await TipoTrabajo.findById(req.params.tipoId);
    res.json(tipo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch('/:tipoId', async (req, res) => {
  try {
    const updateTipo = await TipoTrabajo.updateOne(
      { _id: req.params.tipoId },
      {
        $set: {
          nombre_tipo: req.body.nombre_tipo,
        },
      }
    );
    res.json(updateTipo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:tipoId', async (req, res) => {
  try {
    const deleteTipo = await TipoTrabajo.deleteOne({
      _id: req.params.tipoId,
    });
    res.json(deleteTipo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
