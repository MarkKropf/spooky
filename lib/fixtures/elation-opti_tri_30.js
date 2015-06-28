var util = require('util');
var EventEmitter = require('events').EventEmitter;

var elationopti30 = function() {
  var self = this;

  this.initialize = function(startAddress, endAddress, spookyDmx) {
    this.spookyDmx = spookyDmx;
    this.startAddress = startAddress;
    this.dimmer = 0;
    console.log("[spooky] [Elation Opti Tri 30] initialized at address: " + startAddress);
    self.emit('initialized');
  };

  this.parseMessage = function(startAddress, endAddress, message, args) {
    message = message.substr(1);
    var address;
    var tmpray = new Array(1);
    if (message === "red") {
      this.spookyDmx.dataUpdate(startAddress, args);
      return true;
    } else if (message === "green") {
      this.spookyDmx.dataUpdate(startAddress + 1, args);
      return true;
    } else if (message === "blue") {
      this.spookyDmx.dataUpdate(startAddress + 2, args);
      return true;
    } else if (message === "strobe") {
      this.spookyDmx.dataUpdate(startAddress + 4, args);
      return true;
    } else if (message === "mode") {
      this.spookyDmx.dataUpdate(startAddress + 5, args);
      return true;
    } else if (message === "dimmer") {
      this.spookyDmx.dataUpdate(startAddress + 6, args);
      this.dimmer = args;
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
      console.log("[spooky] [Elation Opti Tri 30] received unparsible message: '" + message + "' value: '" + args + "' mode: '" + this.mode + "'");
      return false;
    }
  };
};

util.inherits(elationopti30, EventEmitter);
module.exports = elationopti30;
