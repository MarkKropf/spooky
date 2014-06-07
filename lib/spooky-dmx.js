var util = require('util');
var EventEmitter = require('events').EventEmitter;

var spookyDmx = function() {
    var artnet = require("artnet-node");
    var self = this;
    this.host = "127.0.0.1";
    this.port = 6454;
    var data = new Array(250);

    this.dataUpdate = function(startAddress,values) {
      for(var i = 0; i<values.length; i++) {
        data[i+startAddress-1] = values[i];
      }
      self.emit('updated');
    };

    this.emitDmx = function() {
      this.client.send(data);
      this.client.send(data);
      self.emit('emitted');
    };

    this.initialize = function(fixtures) {
      this.client = artnet.Client.createClient(this.host, this.port);
        fixtures.forEach(function(value) {
          if(value.commType === "dmx") {
            for(var j = value.startAddress-1; j <= value.channels + value.startAddress -1; j++) {
              data[j] = 0;
            }
            j = null;
          }
        });
        self.emit('initialized');
    };
  };

util.inherits(spookyDmx, EventEmitter);
module.exports = spookyDmx;
