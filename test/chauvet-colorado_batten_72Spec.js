var assert = require("assert");
var Colorado72 = require('../lib/fixtures/chauvet-colorado_batten_72.js');
var SpookyDmx = require("../lib/spooky-dmx.js");
var spookyDmx = new SpookyDmx();
var nconf = require('nconf');

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('should emit an initialized', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.on('initialized', function() {
      assert(true);
      done();
    });
    colorado72.initialize(1,1,"tour",spookyDmx);
  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return false with invalid mode is specified', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"fake",spookyDmx);
    if (colorado72.parseMessage(1,1,"/fake",0)===false) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return false with invalid command is specified in block2 mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"block2",spookyDmx);
    if (colorado72.parseMessage(1,1,"/fake",0)===false) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when block command is specified in block2 mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"block2",spookyDmx);
    if (colorado72.parseMessage(1,1,"/block",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return false with invalid command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/fake",0)===false) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when dimmer command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/dimmer",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when red command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/red",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when green command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/green",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when blue command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/blue",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when white command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/white",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when amber command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/amber",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when strobespeed command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/strobespeed",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when auto command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/auto",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when fan command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/fan",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when blackout command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/blackout",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when autospeed command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/autospeed",0)===true) {
      assert(true);
      done();
    }  });
});

describe('chauvetcolardobatten72', function(){
  var colorado72 = new Colorado72();
  it('return true when dimmerspeed command is specified in tour mode', function(done){
    nconf.file({ file: 'config.json.sample'});
    colorado72.initialize(1,1,"tour",spookyDmx);
    if (colorado72.parseMessage(1,1,"/dimmerspeed",0)===true) {
      assert(true);
      done();
    }  });
});
