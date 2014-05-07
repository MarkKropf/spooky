var dgram = require("dgram");
var udpserver = dgram.createSocket("udp4");
var osc = require("a2r-osc");

var server = function(host,port,fixtures) {
  var fixtures = fixtures;

  udpserver.on("message", function (msg, rinfo) {
    msg = osc.fromBuffer(msg);
    if (msg.address.search("/fixtures") == 0) {
      fixtures.parseMessage(msg.address,msg.arguments);
    } else if(msg.address.search("/groups") == 0) {
      fixtures.parseMessage(msg.address,msg.arguments);
    }
    console.log("[spooky] [udpserver] server got: " + msg.address + " : " + msg.arguments + " from " + rinfo.address + ":" + rinfo.port);
  });

  udpserver.on("listening", function () {
    var address = udpserver.address();
    console.log("[spooky] [udpserver] UDP Server Running: " + address.address + ":" + address.port);
  });

  udpserver.on("error", function() {
   console.log("[spooky] [udpserver] UDP Server had an error");;
  });

  udpserver.bind(port, host);
}

exports.server = server;
