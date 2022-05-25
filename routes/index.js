const express = require('express');
const router = express.Router();
const { connection } = require("../bin/db");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/preguntas', function(req, res, next) {
  let preguntas = []
  connection.query("SELECT * FROM preguntas", function(err, result) {
    if(err) throw err;
    else preguntas = result;
    res.render('preguntas', { preguntas });
  });
});

router.post('/usuario', function(req, res, next) {
  const { nombre, tipo_identificacion, numero_identificacion, edad, telefono, direccion, ocupacion } = req.body;

  connection.query("INSERT INTO usuarios SET ?", { nombre, tipo_identificacion, numero_identificacion, edad, telefono, direccion, ocupacion }, function (err, result) {
    if(err) throw err;
    else {
      res.redirect('/preguntas');
    }
  });
});


module.exports = router;
