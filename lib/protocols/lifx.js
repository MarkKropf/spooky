var util = require('util');
var EventEmitter = require('events').EventEmitter;

var spookyLifx = function() {
    var self = this;
    var fs    = require('fs');

    this.initialize = function(fixtures) {
      if(typeof fixtures.forEach === 'function') {
        self.client = require('node-lifx-lan');
        self.client.discover().then(() =>  {
          self.emit('initialized');
        }).catch((error) => {
          console.error(error);
        });
      } else {
        console.log("[spooky] [Lifx] No fixtures defined");
      }
    };
  };

util.inherits(spookyLifx, EventEmitter);
module.exports = spookyLifx;
