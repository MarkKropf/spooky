var ed15 = require("./fixtures/eliminator-ed15.js");
var octobar = require("./fixtures/octobars.js");
var hazer = require("./fixtures/chauvet-hurricanehaze.js");
var vue61 = require("./fixtures/chauvet-vue61.js");
var colorado72 = require("./fixtures/chauvet-colorado_batten_72.js");

var initialize = function(fixtures,groups,spookyDmx) {
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
  var self = this;
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
