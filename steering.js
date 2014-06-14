var five = require('johnny-five');

var Steering = function(board, config) {
	config = config || {};
	var step = config.step || 15;
	var min = config.min || 27;
	var max = config.max || 167;
	var pin = config.pin || 'D1';
	
	var wheel = new five.Servo({
		pin: pin,
		board: board,
		range: [min, max],
		center: true
	});

	board.repl.inject({ wheel: wheel });

	function right() {
		wheel.to(wheel.value - step, 100);
	}

	function left() {
		wheel.to(wheel.value + step, 100);
	}

	return {
		right: right,
		left: left
	}
};

module.exports = Steering;