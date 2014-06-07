var util = require('util');
var dgram = require("dgram");
var EventEmitter = require('events').EventEmitter;

var spookyOsc = function() {
  var osc = require("a2r-osc");
  var self = this;
  this.udpserver = dgram.createSocket("udp4");

  this.udpserver.on("message", function (msg, rinfo) {
    msg = osc.fromBuffer(msg);
    console.log("[spooky] [udpserver] server got: " + msg.address + " : " + msg.arguments + " from " + rinfo.address + ":" + rinfo.port);
    if (msg.address.search("/fixtures") === 0) {
      self.fixtures.parseMessage(msg.address,msg.arguments);
    } else if(msg.address.search("/groups") === 0) {
      self.fixtures.parseMessage(msg.address,msg.arguments);
    }
  });

  this.udpserver.on("listening", function () {
    var address = self.udpserver.address();
    console.log("[spooky] [udpserver] UDP Server Running: " + address.address + ":" + address.port);
    self.emit('initialized');
  });

  this.udpserver.on("error", function() {
    console.log("[spooky] [udpserver] UDP Server had an error");
  });

  this.initialize = function(host,port,fixtures) {
    self.fixtures = fixtures;
    this.udpserver.bind(port, host);
  };
};

util.inherits(spookyOsc, EventEmitter);
module.exports = spookyOsc;
