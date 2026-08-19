var express = require('express');
var router = express.Router();

/* Get de la pagina favoritos. */
router.get('/', function(req, res, next) {
    res.render('favoritos.ejs');
  });

  module.exports = router;