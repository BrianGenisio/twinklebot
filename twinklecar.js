var Engine = require('./engine')

var TwinkleCar = function(board) {
	var engine = new Engine(board);

	return {
		accelerate: function() { engine.accelerate(); },
		decelerate: function() { engine.decelerate(); }
	}
}

module.exports = TwinkleCar;