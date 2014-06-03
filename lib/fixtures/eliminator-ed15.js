var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var spookyDmx = null;
var effectEnabled = false;

  var doTimer = function(length, resolution, oninstance, oncomplete) {
    var steps = (length / 100) * (resolution / 10),
        speed = length / steps,
        count = 0,
        start = new Date().getTime();

    var instance = function() {
        if(count++ === steps) {
            oncomplete(steps, count);
        } else {
            oninstance(steps, count);
            var diff = (new Date().getTime() - start) - (count * speed);
            setTimeout(instance, (speed - diff));
        }
    };
    setTimeout(instance, speed);
  };
  var initialize = function(startAddress,endAddress,spookyDmx) {
    this.spookyDmx = spookyDmx;
    this.masterDimmer(startAddress,endAddress,0);
    console.log("[spooky] [Eliminator ED15] initialized at address: " + startAddress);
    emitter.emit('initialized');
  };
  var parseMessage = function(startAddress,endAddress,message,args) {
    message = message.substr(1);
    var channel;
    if(message==="master") {
      this.masterDimmer(startAddress,endAddress,args);
    } else if (message==="waveall") {
      if(args===1) {
        this.effectEnabled = "waveAll";
        this.waveAll(1,8,"up",0);
      } else {
        this.effectEnabled = false;
      }
    } else if (message.search("channel") === 0) {
      channel = parseInt(message.replace("channel",""));
      this.channelDimmer(startAddress,channel,args);
    } else if (message.search("groups/dimmers") === 0) {
      this.masterDimmer(1,8,args);
    } else if (message.search("groups/channel") === 0) {
      channel = message.replace("groups/channel","");
      this.channelDimmer(1,channel,args);
      this.channelDimmer(5,channel,args);
    } else if (message!=="" && message!=="groups") {
      console.log("[spooky] [Eliminator ED15] received unparsible message: " + message);
    }
  };
  var masterDimmer = function(startAddress,endAddress,level) {
    level = level * 255;
    var levels = [];
    for(var i=0 ; i<endAddress ; i++) {
      levels[i] = level;
    }
    this.spookyDmx.dataUpdate(startAddress,levels);
  };
  var channelDimmer = function(startAddress,channel,level) {
    level = level * 255;
    var address = startAddress + parseInt(channel) -1;
    this.spookyDmx.dataUpdate(address,[level]);
  };

  var waveAll = function(startAddress,endAddress,direction, level) {
    var resolution = 500;
    var duration = 1000;
    var self = this;
    this.level = level;
    this.direction = direction;
    doTimer(duration, resolution, function(steps,direction)
    {
        if(self.direction==="up") {
          self.level = self.level + (1 / steps);
          self.masterDimmer(startAddress,endAddress,self.level);
        } else if(self.direction==="down") {
          self.level = self.level - (1 / steps);
          self.masterDimmer(startAddress,endAddress,self.level);
        } else {
          console.log("direction: " + direction);
          console.log("self.direction: " + self.direction);
          console.log("[spooky] [Eliminator ED15] exception in waveAll");
        }
    },
    function()
    {
        if(self.direction==="up") {
          self.direction="down";
          self.level=1;
        } else {
          self.direction="up";
          self.level=0;
        }
        self.waveAll(startAddress,endAddress,self.direction,self.level);
    });
  };


exports.initialize = initialize;
exports.parseMessage = parseMessage;
exports.masterDimmer = masterDimmer;
exports.channelDimmer = channelDimmer;
exports.waveAll = waveAll;
exports.doTimer = doTimer;
