var util = require('util');
var EventEmitter = require('events').EventEmitter;

var lifxall = function() {
  var self = this;
  red = 0.0;
  green = 0.0;
  blue = 0.0;
  kelvin = 9000;
  dimmer = 1.0;

  this.initialize = function(name,spookyLifx) {
    self.lifx = spookyLifx.client;
    console.log("[spooky] [lifx] " + name + " light initialized");
  };

  this.parseMessage = function(filter,message,args) {
    message = message.substr(1);

    if(message==="push_red") {
      red = 1.0;
      green = 0.0;
      blue = 0.0;
      kelvin = 9000;
    } else if(message==="push_green") {
      red = 0.0;
      green = 1.0;
      blue = 0.0;
      kelvin = 9000;
    } else if(message==="push_blue") {
      red = 0.0;
      green = 0.0;
      blue = 1.0;
      kelvin = 9000;
    } else if(message==="push_yellow") {
      red = 1.0;
      green = 1.0;
      blue = 0.0;
      kelvin = 9000;
    } else if(message==="push_white") {
      red = 1.0;
      green = 1.0;
      blue = 1.0;
      kelvin = 9000;
    } else if(message==="dimmer") {
      dimmer = args;
    }

    // Apply Dimming
    redDimmer = red * dimmer;
    greenDimmer = green * dimmer;
    blueDimmer = blue * dimmer;
    kelvinDimmer = kelvin;

    light =  JSON.parse('{ "filters": [{' + filter + '}],"color": { "red": ' + redDimmer + ' , "green": ' + greenDimmer + ', "blue": ' + blueDimmer + ', "kelvin": ' + kelvinDimmer + '}}');
    self.lifx.turnOnFilter(light).catch((error) => {
      //console.error(error);
    });
  };
};

util.inherits(lifxall, EventEmitter);
module.exports = lifxall;
