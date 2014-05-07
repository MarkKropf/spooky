var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var dgram = require("dgram");
var sock = dgram.createSocket("udp4");
var osc = require("a2r-osc");
var targetPort = "10005";
var targetHost = "192.168.1.135";

var initialize = function() {
  sock.bind(10005);
  console.log("[spooky] [Octobars] initialized on port: ");
  emitter.emit('initialized');
}

var parseMessage = function(message,args) {
  message = message.substr(1);
  if(message=="") {
    var msg = new osc.Message("/", "f", "0.00");
  } else if(message=="dimmer") {
    var msg = new osc.Message("/octobar/dimmer", "f", args);
  } else if(message=="push_red") {
    var msg = new osc.Message("/octobar/push_red", "f", args);
  } else if(message=="push_green") {
    var msg = new osc.Message("/octobar/push_green", "f", args);
  } else if(message=="push_blue") {
    var msg = new osc.Message("/octobar/push_blue", "f", args);
  } else if(message=="push_yellow") {
    var msg = new osc.Message("/octobar/push_yellow", "f", args);
  } else if(message=="push_white") {
    var msg = new osc.Message("/octobar/push_white", "f", args);
  } else if(message=="randoms") {
    var msg = new osc.Message("/octobar/randoms", "f", args);
  } else if(message=="color_select") {
      var msg = new osc.Message("/octobar/color_select", "f", args);
  } else {
    console.log("[spooky] [Octobars] received unparsible message: " + message);
    var msg = new osc.Message("/", "f", "0.0");
  }
  buffer = msg.toBuffer();
  sock.send(buffer, 0, buffer.length, targetPort, targetHost);
}

exports.initialize = initialize;
exports.parseMessage = parseMessage;
