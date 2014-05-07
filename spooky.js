var nconf = require('nconf');
var spookyOsc = require('./lib/spooky-osc.js');
var spookyDmx = require('./lib/spooky-dmx.js');
//var spookySpi = require('./lib/spooky-spi.js');
var spookyFixtures = require('./lib/spooky-fixtures.js');

nconf.argv()
 	  .env()
 	  .file({ file: 'config.json'});

spookyDmx.host = nconf.get('dmxGateway');
spookyDmx.emitter.on('initialized', function() {
  console.log("[spooky] [dmx] Initialized");
  spookyFixtures.initialize(nconf.get('fixtures'),nconf.get('groups'),spookyDmx);
});
spookyDmx.emitter.on('updated', function() { spookyDmx.emit(); });
spookyDmx.emitter.on('emitted', function() {  });
spookyDmx.initialize(nconf.get("fixtures"));
//spookySpi.initialize(nconf.get('spiDev'),nconf.get('fixtures'));
//spookySpi.emitter.on('initialized', function() { console.log('[spooky] [spi] Initialized'); });
spookyOsc.server(nconf.get('host'), nconf.get('serverPort'),spookyFixtures);
