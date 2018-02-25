var util = require('util');
var EventEmitter = require('events').EventEmitter;

var spookyApa102 = function() {
	var Apa102spi = require('apa102-spi');
	var self = this;
	var totalLights = 0;
	// Apa102spi(number of leds, clock divider)
	var LedDriver = new Apa102spi(totalLights, 100);

	this.initialize = function(fixtures) {
		if(typeof fixtures.forEach === 'function') {
			fixtures.forEach(function(value) {
				if(value.commType === "apa102") {
					this.totalLights = this.totalLights + value.totalLights;
				}
			});

			this.data = new Array(this.totalLights);

			for(var j = 0; j<=this.totalLights; j++) {
				this.data[j] = [15][0][0][0];
			}
			self.emit('initialized');
		} else {
			console.log("[spooky] [Apa102] No fixtures defined");
		}
	}

	this.dataUpdate = function(values) {
		// Update the array of LED's and send
		// setLedColor(n, brightness 0-31, red 0-255, green 0-255, blue 0-255)
		for(var j = 0; j<=this.totalLights; j++) {
			LedDriver.setLedColor(j, this.data[j][j], this.data[j][j], green, blue);
		}

		LedDriver.sendLeds()
	};
};

util.inherits(spookyApa102, EventEmitter);
module.exports = spookyApa102;
