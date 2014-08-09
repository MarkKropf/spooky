var assert = require("assert");
var Colorado72 = require('../lib/fixtures/chauvet-colorado_batten_72.js');
var colorado72 = new Colorado72();
var SpookyDmx = require("../lib/spooky-dmx.js");
var spookyDmx = new SpookyDmx();
var nconf = require('nconf');

describe('chauvetcolardobatten72', function(){
  it('should emit an initialized', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.on('initialized', function() {
      assert(true);
      done();
    });
    colorado72.initialize(1,1,"tour",spookyDmx);
  });
});
