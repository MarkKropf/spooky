var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

var initialize = function(startAddress,endAddress,spookyDmx) {
  this.spookyDmx = spookyDmx;
  console.log("[spooky] [Chauvet Vue 6.1] initialized at address: " + startAddress);
  emitter.emit('initialized');
};

var parseMessage = function(startAddress,endAddress,message,args) {
  message = message.substr(1);
  if(message.search("pod") === 0) {
    var pod = message.charAt(3);
    var address = parseInt(pod,null) + startAddress;
    this.spookyDmx.dataUpdate(address,args);
  } else if (message === "dimmer") {
    this.spookyDmx.dataUpdate(startAddress,args);
  } else if (message === "strobe") {
    this.spookyDmx.dataUpdate(startAddress,args);
  } else if (message === "motor") {
    this.spookyDmx.dataUpdate(startAddress,args);
  } else if (message === "auto") {
      this.spookyDmx.dataUpdate(startAddress,args);
  } else if (message !== "") {
    console.log("[spooky] [Chauvet Vue 6.1] received unparsible message: " + message);
  }
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
