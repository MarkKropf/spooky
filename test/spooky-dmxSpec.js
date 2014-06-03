var assert = require("assert");
var spookyDmx = require("../lib/spooky-dmx.js");
var nconf = require('nconf');

  describe('emitter', function(){
    it('should emit an initialized', function(done){
      nconf.file({ file: 'config.json'});
      spookyDmx.emitter.on('initialized',function() {
        assert(true);
        done();
      });
      spookyDmx.initialize(nconf.get("fixtures"));
    });
  });
