var express = require('express');
var router = express.Router();

/* Get de la pagina del perfil. */
router.get('/', function(req, res, next) {
    res.render('perfil.ejs');
  });

  module.exports = router;