var token = 'ecf81d37c250cf2b7e3b4d4efffc6c1c536c1da2';
var device = '53ff6d065075535134481187';

var five = require("johnny-five");
var Spark = require("spark-io");
var stdin = process.openStdin(); 

process.stdin.setRawMode();   

var board = new five.Board({
  io: new Spark({
    token: token,
    deviceId: device
  })
});

var car;

stdin.on('keypress', function (chunk, key) {
	if(!key) return;

  switch(key.name) {
  	case 'w': 
  		car.accelerate();
  		break;

  	case 's':
  		car.decelerate();
  		break;
  }
});


board.on("ready", function() {
	car = new Car(board);
    console.log('OK, Drive!!!!');
});




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

var Car = function(board) {
	var engine = new Engine(board);

	return {
		accelerate: function() { engine.accelerate(); },
		decelerate: function() { engine.decelerate(); }
	}
}
