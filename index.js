var token = 'ecf81d37c250cf2b7e3b4d4efffc6c1c536c1da2';
var device = '53ff6d065075535134481187';

var five = require('johnny-five');
var Spark = require('spark-io');
var TwinkleCar = require('./twinklecar');

var stdin = process.openStdin(); 

process.stdin.setRawMode();   

var board = new five.Board({
  io: new Spark({
    token: token,
    deviceId: device
  })
});

var car;

board.on("ready", function() {
	car = new TwinkleCar(board);
    console.log('OK, Drive!!!!');
});

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