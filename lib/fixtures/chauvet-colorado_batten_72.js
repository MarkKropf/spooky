var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var spookyDmx;
var mode;
var startAddress;

var initialize = function(startAddress,endAddress,mode,spookyDmx) {
  this.spookyDmx = spookyDmx;
  this.mode = mode;
  this.startAddress = startAddress;
  console.log("[spooky] [Chauvet Colorado Batten 72] initialized at address: " + startAddress);
  emitter.emit('initialized');
};

var parseMessage = function(startAddress,endAddress,message,args) {
  message = message.substr(1);
  var address;
  if(this.mode==="tour") {
    // Tour Mode - Todo: Blackout & Block selection
    if(message === "dimmer") {
      this.spookyDmx.dataUpdate(startAddress,args);
    } else if (message === "red") {
      this.spookyDmx.dataUpdate(startAddress+1,args);
    } else if (message === "green") {
      this.spookyDmx.dataUpdate(startAddress+2,args);
    } else if (message === "blue") {
      this.spookyDmx.dataUpdate(startAddress+3,args);
    } else if (message === "white") {
      this.spookyDmx.dataUpdate(startAddress+4,args);
    } else if (message === "amber") {
      this.spookyDmx.dataUpdate(startAddress+5,args);
    } else if (message === "strobe") {
      this.spookyDmx.dataUpdate(startAddress+7,args);
    } else if (message === "auto") {
      this.spookyDmx.dataUpdate(startAddress+8,args);
    } else if (message === "fan") {
      this.spookyDmx.dataUpdate(startAddress+8,args);
    } else if (message === "autospeed") {
      this.spookyDmx.dataUpdate(startAddress+9,args);
    } else if (message === "dimspeed") {
      this.spookyDmx.dataUpdate(startAddress+10,args);
    } else if (message==="") {
        // Page Selected
    } else {
      console.log("[spooky] [Chauvet Colorado Batten 72] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
    }
  } else if (this.mode==="block2") {
    if(message.search("block") === 0) {
      var block = parseInt(message.charAt(5));
      var color = message.replace("block" + block + "/","");
      if (color==="red") { address = (block * 5) - 5; }
      else if (color==="green") { address = (block * 5 + 1) - 5; }
      else if (color==="blue") { address = (block * 5 + 2) - 5; }
      else if (color==="white") { address = (block * 5 + 3) - 5; }
      else if (color==="amber") { address = (block * 5 + 4) - 5; }
      address = address + startAddress;
      this.spookyDmx.dataUpdate(address,args);
    } else if (message==="") {
        // Page Selected
    } else {
      console.log("[spooky] [Chauvet Colorado Batten 72] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
    }
  }
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
