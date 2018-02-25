var nconf = require('nconf');
var SpookyOsc = require('./lib/spooky-osc.js');
var spookyOsc = new SpookyOsc();
var spookyFixtures = require('./lib/spooky-fixtures.js');

nconf.argv().env().file({ file: 'config.json'});

// Parse fixtures & Load related protocols
nconf.get("fixtures").forEach(function(value) {
  if (value.commType === "dmx") {
    nconf.set('dmx','true');
  } else if (value.commType === "lifx") {
    nconf.set('lifx','true');
  }
});

// Configure Needed protocols
if (nconf.get('apa102')=='true') {
  var spookyApa102 = require('./lib/protocols/apa102.js');
  var spookyApa102 = new spookyApa102();
  spookyApa102.on('initialized', function() {
    console.log("[spooky] [Apa102] Protocol initialized");
  });
  spookyApa102.initialize(nconf.get("fixtures"));
}
if (nconf.get('lifx')=='true') {
  var SpookyLifx = require('./lib/protocols/lifx.js');
  var spookyLifx = new SpookyLifx();
  spookyLifx.on('initialized', function() {
    console.log("[spooky] [LIFX] Protocol initialized");
  });
  spookyLifx.initialize(nconf.get("fixtures"));
}
if (nconf.get('dmx')=='true') {
  var SpookyDmx = require('./lib/protocols/dmx.js');
  var spookyDmx = new SpookyDmx();
  spookyDmx.host = nconf.get('dmxGateway');
  spookyDmx.on('initialized', function() {
    console.log("[spooky] [dmx] Initialized");
    // need to break this out so each protocol can initialize its fixtures separately
    spookyFixtures.initialize(nconf.get('fixtures'),nconf.get('groups'),spookyDmx,spookyLifx);
  });
  spookyDmx.on('updated', function() { spookyDmx.emitDmx(); });
  spookyDmx.on('emitted', function() {  });
  spookyDmx.initialize(nconf.get("fixtures"));
}


// Begin listening for OSC requests
spookyOsc.initialize(nconf.get('host'), nconf.get('serverPort'),spookyFixtures);
