var mongoose = require('mongoose');
var Promise = require('bluebird');

var _conn;

function connect() {
	if(_conn) 
		return _conn;

	_conn = new Promise(function(resolve,reject) {
		mongoose.connect('mongodb://localhost/tripPlanner', function() {
			resolve();
		})
	});
	return _conn;
}

var placeSchema = mongoose.Schema({
	address : {type: String},
	city: {type: String},
	state: {type: String},
	phone: {type: String},
	location: {type: [Number]}
});

var Place = mongoose.model('place', placeSchema);

var hotelSchema = mongoose.Schema({
	name : {type: String, required: true, unique: true},
	place : {type: placeSchema},
	num_stars: {type: Number, min: 1, max: 5},
	amenities: {type: [String], get: arrayJoin}
});

var Hotel = mongoose.model('hotel', hotelSchema);

var activitySchema = mongoose.Schema({
	name : {type: String, required: true},
	place: {type: placeSchema},
	age_range: {type: String}
});

var Activity = mongoose.model('activity', activitySchema);

var restaurantSchema = mongoose.Schema({
	name : {type: String, required: true},
	place : {type: placeSchema},
	cuisine : {type: [String], get: arrayJoin},
	price : {type: Number, min: 1, max: 5}
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

function arrayJoin(arr) {
	return arr.join(", ");
};

// connect()
// .then(function() {
// 	return Activity.find({})
// })
// .then(function(result) {
// 	console.log(result);
// })
// .catch(console.log);

// console.log(Hotel);

module.exports = {
	connect: connect,
	models: {
		Place: Place,
		Hotel: Hotel,
		Activity: Activity,
		Restaurant : Restaurant
	}
};