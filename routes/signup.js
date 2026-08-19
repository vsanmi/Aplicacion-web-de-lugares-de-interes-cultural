var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET users listing. */

	// signup view
	router.get('/', (req, res) => { 
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	router.post('/', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup', 
		failureFlash: true // allow flash messages
	}));
	

module.exports = router;