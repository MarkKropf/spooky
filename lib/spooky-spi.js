// This is completely broke... 

var SPI = require("spi");
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var spi = new SPI.Spi('/dev/spidev0.0', {
  'mode': SPI.MODE['MODE_0'],
  'chipSelect': SPI.CS['none'],
  'maxSpeed': 5000000
}, function(s){s.open();});
var gpio = require("pi-gpio");
var colorizer = "blue";

function sb_SendPacket(r,g,b,c,p) {
    if(typeof(r)==='undefined') r = 0;
    if(typeof(g)==='undefined') g = 0;
    if(typeof(b)==='undefined') b = 0;
    if(typeof(c)==='undefined') c = 0x0;
    if(typeof(p)==='undefined') p = 0;

    console.log("r"+r+" g"+g+" b"+b);

    p = (p<<2) | (c & 0x3);
    p = (p << 10) | (b);
    p = (p << 10) | (r);
    p = (p << 10) | (g);

    s1 = 0xFF000000;
    s2 = 0xFF0000;
    s3 = 0xFF00;
    s4 = 0xFF;

    sval1 = ((s1 & p) >> 24);
    sval2 = ((s2 & p) >> 16);
    sval3 = ((s3 & p) >> 8);
    sval4 = ((s4 & p));

    return buf = new Buffer([sval1,sval2,sval3,sval4]);
}

var lightLoop = function(r,g,b) {
  var color = sb_SendPacket(r,g,b);
  var buf = sb_SendPacket(127,110,110,0x1);
  spi.write(color, function() {
    gpio.open(21, function() {
      gpio.close(21, function() {
        spi.write(color, function() {
          gpio.open(21, function() {
            gpio.close(21, function() {
              spi.write(color, function() {
                gpio.open(21, function() {
                  gpio.close(21, function() {
                    spi.write(color, function() {
                      gpio.open(21, function() {
                        gpio.close(21, function() {
                          spi.write(buf, function() {
                            if (colorizer=="blue") {
                              colorizer="red";
                              lightLoop(1023,0,0);
                            } else if (colorizer=="red") {
                              colorizer="green";
                              lightLoop(0,1023,0);
                            } else if (colorizer=="green") {
                              lightLoop(0,0,1023);
                              colorizer="blue";
                            } else {
                              console.log("colors are broken");
                            }
                            console.log(colorizer);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

var initialize = function(spiDev,fixtures) {
  console.log("init started");
  gpio.setDirection(21, 'out');
  gpio.setDirection(22, 'out');
  lightLoop(0,0,1023);
  emitter.emit('initialized');
};
exports.initialize = initialize;
exports.emitter = emitter;
