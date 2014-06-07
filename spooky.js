var nconf = require('nconf');
var SpookyOsc = require('./lib/spooky-osc.js');
var spookyOsc = new SpookyOsc();
var SpookyDmx = require('./lib/spooky-dmx.js');
var spookyDmx = new SpookyDmx();
var spookyFixtures = require('./lib/spooky-fixtures.js');

nconf.argv().env().file({ file: 'config.json'});

spookyDmx.host = nconf.get('dmxGateway');
spookyDmx.on('initialized', function() {
  console.log("[spooky] [dmx] Initialized");
  spookyFixtures.initialize(nconf.get('fixtures'),nconf.get('groups'),spookyDmx);
});
spookyDmx.on('updated', function() { spookyDmx.emitDmx(); });
spookyDmx.on('emitted', function() {  });
spookyDmx.initialize(nconf.get("fixtures"));
spookyOsc.initialize(nconf.get('host'), nconf.get('serverPort'),spookyFixtures);
