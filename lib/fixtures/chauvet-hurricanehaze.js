var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var initialize = function(startAddress,endAddress,spookyDmx) {
  this.spookyDmx = spookyDmx;
  console.log("[spooky] [Chauvet Hurricane Haze] initialized at address: " + startAddress);
  emitter.emit('initialized');
};

var parseMessage = function(startAddress,endAddress,message,args) {
  message = message.substr(1);
  var level = args * 255;
  if(message === "blower") {
    this.spookyDmx.dataUpdate(startAddress,level);
  } else if (message === "volume") {
    this.spookyDmx.dataUpdate(startAddress+1,level);
  } else if (message !== "") {
    console.log("[spooky] [Chauvet Hurricane Haze] received unparsible message: " + message);
  }
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
