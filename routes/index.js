var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
const passport = require("passport");

/* Get de la pagina de login (index). */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index.ejs');
});

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

//Acceso por parte de Perfil y Favoritos a los datos necesarios
router.get('/perfil', function(req, res, next) {
  var user = req.user;
  res.render('perfil', { title: 'perfil', user: user });
});

router.get('/favoritos', function(req, res, next) {
  var user = req.user;
  res.render('favoritos', { title: 'favoritos', user: user });
});

module.exports = router;
