var util = require('util');
var EventEmitter = require('events').EventEmitter;

var spookyLifx = function() {
    var self = this;
    var fs    = require('fs');

    this.initialize = function(nconf) {
      var fixtures = nconf.get("fixtures");
      self.client = require('node-lifx-lan');
      self.client.discover().then(() =>  {
        self.emit('initialized');
      }).catch((error) => {
        console.error(error);
      });
    };
  };

util.inherits(spookyLifx, EventEmitter);
module.exports = spookyLifx;
