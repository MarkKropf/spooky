var assert = require("assert");
var SpookyDmx = require("../lib/spooky-dmx.js");
var spookyDmx = new SpookyDmx();
var nconf = require('nconf');

  describe('spookyDmx', function(){
    it('should emit an initialized', function(done){
      nconf.file({ file: 'config.json.sample'});
      spookyDmx.on('initialized',function() {
        assert(true);
        done();
      });
      spookyDmx.initialize(nconf.get("fixtures"));
    });
  });
