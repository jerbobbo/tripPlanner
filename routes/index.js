var express = require('express');
var router = express.Router();
var db = require('../models');
var models = db.models;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

router.get('/', function ( req, res, next) {
	Hotel.find({})
	.then(function (hotels) {
		console.log(hotels);
		
		res.render('index', {hotels: hotels});
	})
	.catch(function(err){
		res.send(err);
	})
})


module.exports = router;