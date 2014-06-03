  var artnet = require("artnet-node");
  var EventEmitter = require('events').EventEmitter;
  var emitter = new EventEmitter();
  this.host = "127.0.0.1";
  this.port = 6454;
  var data = new Array(250);

  var dataUpdate = function(startAddress,values) {
    for(var i = 0; i<values.length; i++) {
      data[i+startAddress-1] = values[i];
    }
    emitter.emit('updated');
  };

  var emit = function() {
    this.client.send(data);
    this.client.send(data);
    emitter.emit('emitted');
  };

  var initialize = function(fixtures) {
    this.client = artnet.Client.createClient(this.host, this.port);
      fixtures.forEach(function(value) {
        if(value.commType === "dmx") {
          for(var j = value.startAddress-1; j <= value.channels + value.startAddress -1; j++) {
            data[j] = 0;
          }
          j = null;
        }
      });
      emitter.emit('initialized');
  };
exports.dataUpdate = dataUpdate;
exports.emit = emit;
exports.initialize = initialize;
exports.emitter = emitter;
