var five = require('johnny-five');

var Engine = function(board, config) {
	config = config || {};
	var step = config.step || 5;
	var low = config.low || 75;
	var high = config.high || 120;
	var pin = config.pin || 'D0';
	var speed = low;
	var motor = new five.Motor(pin);

	function box(value) {
		if(value <= low) return low;
		if(value >= high) return high;
		return value;
	}

	function go(value) {
		if(value <= low) {
			motor.stop();
			console.log('STOP!');
		} else {
			motor.start(value);
			console.log('GO to ' + value);
		}
	}

	function accelerate() {
		speed = box(speed + step);
		console.log('accelerate to ' + speed);
		go(speed);
	}

	function decelerate() {
		speed = box(speed - step);
		console.log('decelerate to ' + speed);
		go(speed);
	}

	board.repl.inject({ motor: motor });

	return {
		accelerate: accelerate,
		decelerate: decelerate
	}
}

module.exports = Engine;