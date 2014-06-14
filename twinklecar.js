var Engine = require('./engine');
var Steering = require('./steering');

var TwinkleCar = function(board) {
	var engine = new Engine(board);
	var steering = new Steering(board);

	return {
		accelerate: function() { engine.accelerate(); },
		decelerate: function() { engine.decelerate(); },
		right: function() { steering.right(); },
		left: function() { steering.left(); }
	}
}

module.exports = TwinkleCar;