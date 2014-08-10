var util = require('util');
var EventEmitter = require('events').EventEmitter;

var colorado72 = function() {
  var self = this;

  this.initialize = function(startAddress,endAddress,mode,spookyDmx) {
    this.spookyDmx = spookyDmx;
    this.mode = mode;
    this.startAddress = startAddress;
    this.dimmer = 0;
    console.log("[spooky] [Chauvet Colorado Batten 72] initialized at address: " + startAddress);
    self.emit('initialized');
  };

  this.parseMessage = function(startAddress,endAddress,message,args) {
    message = message.substr(1);
    var address;
    var tmpray = new Array(1);
    if(this.mode==="tour") {
      if(message === "dimmer") {
        this.spookyDmx.dataUpdate(startAddress,args);
        this.dimmer = args;
        return true;
      } else if (message === "red") {
        this.spookyDmx.dataUpdate(startAddress+1,args);
        return true;
      } else if (message === "green") {
        this.spookyDmx.dataUpdate(startAddress+2,args);
        return true;
      } else if (message === "blue") {
        this.spookyDmx.dataUpdate(startAddress+3,args);
        return true;
      } else if (message === "white") {
        this.spookyDmx.dataUpdate(startAddress+4,args);
        return true;
      } else if (message === "amber") {
        this.spookyDmx.dataUpdate(startAddress+5,args);
        return true;
      } else if (message === "strobespeed") {
        this.spookyDmx.dataUpdate(startAddress+7,args);
        return true;
      } else if (message === "auto") {
        this.spookyDmx.dataUpdate(startAddress+8,args);
        return true;
      } else if (message === "fan") {
        this.spookyDmx.dataUpdate(startAddress+8,args);
        return true;
      } else if (message === "blackout") {
        if (args===1) {
          tmpray[0] = 0;
        } else {
          tmpray[0] = this.dimmer;
        }
        this.spookyDmx.dataUpdate(startAddress,tmpray);
        return true;
      } else if (message === "autospeed") {
        this.spookyDmx.dataUpdate(startAddress+9,args);
        return true;
      } else if (message === "dimmerspeed") {
        this.spookyDmx.dataUpdate(startAddress+10,args);
        return true;
      } else if (message!=="") {
        console.log("[spooky] [Chauvet Colorado Batten 72] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
        return false;
      }
    } else if (this.mode==="block2") {
      if(message.search("block") === 0) {
        var block = parseInt(message.charAt(5),null);
        var color = message.replace("block" + block + "/","");
        if (color==="red") { address = (block * 5) - 5; }
        else if (color==="green") { address = (block * 5 + 1) - 5; }
        else if (color==="blue") { address = (block * 5 + 2) - 5; }
        else if (color==="white") { address = (block * 5 + 3) - 5; }
        else if (color==="amber") { address = (block * 5 + 4) - 5; }
        address = address + startAddress;
        this.spookyDmx.dataUpdate(address,args);
        return true;
      } else if (message!=="") {
        console.log("[spooky] [Chauvet Colorado Batten 72] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
        return false;
      }
    } else {
      return false;
    }
  };
};

util.inherits(colorado72, EventEmitter);
module.exports = colorado72;
