var express = require('express');
const Users = require('../models/Users');
var router = express.Router();

/* Get de la pagina de inicio. */
router.get('/', function(req, res, next) {
    res.render('inicio.ejs');
  });

  //Añadir elemento a favoritos
router.post('/', function(req, res){
  if(req.isAuthenticated()){
    const userId = req.user.id;
    const lug = req.body.lugar;
    const lugar = lug.replace(/([A-Z])/g, ' $1').trim()
    Users.findById(userId, function(err, foundUser){
      if(err){
        console.log(err);
      }
      else{
        if(foundUser){
          foundUser.favorite.push(lugar);
          foundUser.save(function(){
            res.redirect("/favoritos");
          });
        }
      }
  })
}});

  module.exports = router;