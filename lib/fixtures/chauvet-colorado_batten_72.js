var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var spookyDmx = null;

var initialize = function(startAddress,endAddress,spookyDmx) {
  this.spookyDmx = spookyDmx;
  console.log("[spooky] [Chauvet Colorado Batten 72] initialized at address: " + startAddress);
  emitter.emit('initialized');
};

var parseMessage = function(startAddress,endAddress,message,args) {
  message = message.substr(1);
  var address;
  if(message.search("block") === 0) {
    var block = parseInt(message.charAt(5));
    var color = message.replace("block" + block + "/","");
    if (color=="red") { address = (block * 5) - 5; }
    else if (color=="green") { address = (block * 5 + 1) - 5; }
    else if (color=="blue") { address = (block * 5 + 2) - 5; }
    else if (color=="white") { address = (block * 5 + 3) - 5; }
    else if (color=="amber") { address = (block * 5 + 4) - 5; }
    address = address + startAddress;
    console.log("[spooky] [DEBUG] colorado address: " + address + " value: " + args + " color: " + color);
    this.spookyDmx.dataUpdate(address,args);
  } else if (message==="") {
      // Page Selected
  } else {
    console.log("[spooky] [Chauvet Colorado Batten 72] received unparsible message: " + message);
  }
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
