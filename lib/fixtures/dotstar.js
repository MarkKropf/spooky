var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var initialize = function(startAddress,endAddress,spookyApa102) {
  this.spookyApa102 = spookyApa102;
  console.log("[spooky] [Dotstar] initialized at address: " + startAddress);
  emitter.emit('initialized');
};

var parseMessage = function(startAddress,endAddress,message,args) {
  message = message.substr(1);
  if(message === "dimmer") {
    this.spookyApa102.dataUpdate(startAddress,level);
  } else if (message === "red") {
    this.spookyApa102.dataUpdate(startAddress+1,level);
  } else if (message !== "") {
    console.log("[spooky] [Dotstar] received unparsible message: " + message);
  }
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
