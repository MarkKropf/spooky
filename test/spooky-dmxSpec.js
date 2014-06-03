var assert = require("assert");
var spookyDmx = require("../lib/spooky-dmx.js");
var nconf = require('nconf');

  describe('spookyDmx', function(){
    it('should emit an initialized', function(done){
      nconf.file({ file: 'config.json.sample'});
      spookyDmx.emitter.on('initialized',function() {
        assert(true);
        done();
      });
      spookyDmx.initialize(nconf.get("fixtures"));
    });
  });
