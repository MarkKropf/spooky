spooky
======

Controlling lights spookily fast (spukhafte Fernwirkung) using nodejs.

The interface to control all of the lighting fixutres is osc. Currently DMX lights are controlled via an artNet gateway. There is a very early 'attempt' at spi driven lights for raspberry pi users in spooky-spi.

The following fixtures have been added:

1. Chauvet Hurricane Hazer (yes, not a light)
2. Chauvet Vue 6.1
3. Eliminator ED15 Dimmer
4. Macetech Octobars (spi not yet functional)

All needed configuration for driving the fixtures is included in the config.json.

A sample OSC template is included for use with TouchOSC.

![image](https://github.com/MarkKropf/spooky/raw/master/touchosc/spooky_touchosc.png)
