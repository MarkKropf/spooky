spooky
======

[![Build Status](http://ci.nebulous.company/api/v1/teams/main/pipelines/spooky/jobs/spooky-unit-tests/badge)](http://ci.nebulous.company/teams/main/pipelines/spooky)

Controlling lights spookily fast (spukhafte Fernwirkung) using nodejs.

The interface to control all of the lighting fixutres is osc. Currently DMX lights are controlled via an artNet gateway.

The following fixtures have been added:

1. Chauvet Hurricane Hazer (yes, not a light)
2. Chauvet Vue 6.1
3. Chauvet Colorado 72 Tour
3. Eliminator ED15 Dimmer
4. Macetech Octobars

All needed configuration for driving the fixtures is included in the config.json.

A sample OSC template is included for use with TouchOSC.

![image](https://github.com/MarkKropf/spooky/raw/master/touchosc/spooky_touchosc.png)

**New support for Chauvet Colorado 72 Tour fixture**

![image](https://github.com/MarkKropf/spooky/raw/master/touchosc/colorado72.png)
