var assert = require("assert");
var SpookyOsc = require("../lib/spooky-osc.js");
var spookyOsc = new SpookyOsc();

describe('spookyOsc', function(){
  it('should return true after initialized', function(done){
    spookyOsc.initialize('127.0.0.1','8080');
    spookyOsc.on("initialized", function() {
      assert(true);
      done();
    });
  });
});
