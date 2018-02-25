var ed15 = require("./fixtures/eliminator-ed15.js");
var hazer = require("./fixtures/chauvet-hurricanehaze.js");
var vue61 = require("./fixtures/chauvet-vue61.js");
var Colorado72 = require('./fixtures/chauvet-colorado_batten_72.js');
var colorado72 = new Colorado72();
var Elationopti30 = require('./fixtures/elation-opti_tri_30.js');
var elationopti30 = new Elationopti30();
var Impressionx4 = require('./fixtures/impression-x4.js');
var impressionx4 = new Impressionx4();
var Lifxall = require('./fixtures/lifx-all.js');
var lifxall = new Lifxall();

var initialize = function(fixtures,groups,spookyDmx,spookyLifx) {
  this.spookyDmx = spookyDmx;
  this.fixtures = fixtures;
  this.groups = groups;
  fixtures.forEach(function(value) {
    if(value.fixtureType === "ed15") {
      ed15.initialize(value.startAddress,value.channels,spookyDmx);
    } else if (value.fixtureType === "pixel") {
      octobar.initialize();
    } else if (value.fixtureType === "hazer") {
      hazer.initialize(value.startAddress,value.channels,spookyDmx);
    } else if (value.fixtureType === "vue61") {
      vue61.initialize(value.startAddress,value.channels,spookyDmx);
    } else if (value.fixtureType === "colorado72") {
      colorado72.initialize(value.startAddress,value.channels,value.mode,spookyDmx);
    } else if (value.fixtureType === "elationopti30") {
      elationopti30.initialize(value.startAddress,value.channels,spookyDmx);
    } else if (value.fixtureType === "impressionx4") {
      impressionx4.initialize(value.startAddress,value.channels,spookyDmx);
    } else if (value.fixtureType === "lifx") {
      lifxall.initialize(value.name,spookyLifx);
    }
  });
};

var getFixture = function(fixtureId) {
  this.fixtures.forEach(function(value) {
    if(value.fixtureId === fixtureId) {
      console.log("uga: " + value);
      return value;
    }
  });
};

var parseMessage = function(address,args) {
  this.fixtures.forEach(function(value) {
    if(address.search("/fixtures" + value.oscAddress) === 0) {
      if(value.fixtureType === "ed15") {
        ed15.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "pixel") {
        octobar.parseMessage(address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "hazer") {
        hazer.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "vue61") {
        vue61.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "colorado72") {
        colorado72.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "elationopti30") {
        elationopti30.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "impressionx4") {
        impressionx4.parseMessage(value.startAddress,value.channels,address.replace("/fixtures" + value.oscAddress,""),args);
      } else if (value.fixtureType === "lifx") {
        lifxall.parseMessage(value.filter,address.replace("/fixtures" + value.oscAddress,""),args);
      }
    }
  });
  this.groups.forEach(function(value) {
    if(address.search("/groups") === 0) {
      if(value.name === "Dimmers") {
        ed15.parseMessage(1,8,address,args);
      }
    }
  });
};

exports.initialize = initialize;
exports.parseMessage = parseMessage;
exports.getFixture = getFixture;
