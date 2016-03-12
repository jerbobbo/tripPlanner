var express = require('express');
var router = express.Router();
var db = require('../models');
var models = db.models;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');

router.get('/', function ( req, res, next) {

	var promiseArr = [Hotel, Restaurant, Activity];

	Promise.map(promiseArr, function (model) {
		return model.find()
	})
	.then(function (groups) {
		res.render('index', { groups: 
			[
			{label: 'Hotels', items: groups[0]},
			{label: 'Restaurants', items: groups[1]}, 
			{label: 'Activities', items: groups[2]}
			]
			});
	})
	
})


module.exports = router;