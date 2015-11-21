var util = require('util');
var EventEmitter = require('events').EventEmitter;

var impressionx4 = function() {
  var self = this;

  this.initialize = function(startAddress, endAddress, spookyDmx) {
    this.spookyDmx = spookyDmx;
    this.startAddress = startAddress;
    this.dimmer = 0;
    console.log("[spooky] [Impression X4] initialized at address: " + startAddress);
    self.emit('initialized');
  };

  this.parseMessage = function(startAddress, endAddress, message, args) {
    message = message.substr(1);
    var address;
    var tmpray = new Array(1);
    if (message === "pan") {
      this.spookyDmx.dataUpdate(startAddress, args);
      return true;
    } else if (message === "tilt") {
      this.spookyDmx.dataUpdate(startAddress + 2, args);
      return true;
    } else if (message === "red") {
      this.spookyDmx.dataUpdate(startAddress + 5, args);
      return true;
    } else if (message === "green") {
      this.spookyDmx.dataUpdate(startAddress + 6, args);
      return true;
    } else if (message === "blue") {
      this.spookyDmx.dataUpdate(startAddress + 7, args);
      return true;
    } else if (message === "white") {
      this.spookyDmx.dataUpdate(startAddress + 8, args);
      return true;
    } else if (message === "shutter") {
      this.spookyDmx.dataUpdate(startAddress + 9, args);
      return true;
    } else if (message === "dimmer") {
      this.spookyDmx.dataUpdate(startAddress + 10, args);
      this.dimmer = args;
      return true;
    } else if (message === "movement") {
      this.spookyDmx.dataUpdate(startAddress + 13, args);
      return true;
    } else if (message === "speed") {
      this.spookyDmx.dataUpdate(startAddress + 14, args);
      return true;
    } else if (message === "zoom") {
      this.spookyDmx.dataUpdate(startAddress + 15, args);
      return true;
    } else if (message === "pattern") {
      this.spookyDmx.dataUpdate(startAddress + 16, args);
      return true;
    } else if (message === "blackout") {
      if (args === 1) {
        tmpray[0] = 0;
      } else {
        tmpray[0] = this.dimmer;
      }
      this.spookyDmx.dataUpdate(startAddress, tmpray);
      return true;
    } else if (message !== "") {
      console.log("[spooky] [Impression X4] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
      return false;
    }
  };
};

util.inherits(impressionx4, EventEmitter);
module.exports = impressionx4;
