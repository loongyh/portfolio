---
title: ESPHome - Grow Fingerprint Reader Integration
description: New component to integrate Grow fingerprint readers into the ESPHome project.
thumbnail: r503.jpg
start: 2020-10-04T14:59:57.744Z
end: 2021-04-04T14:59:57.752Z
---
## Intro

Physical locks and keys were invented as early as [6th century BC](https://en.wikipedia.org/wiki/Lock_and_key), and we're in the 21st century now. Time to replace all of them with something more modern!

## Problem

...hold that thought. Most commercial digital locks (for now) aren't cheap. Take a look at the models offered at [MyDigitalLock](https://www.mydigitallock.com.sg/digital-lock/), and you'll realise the cost of replacing just 4 bedroom door locks in an apartment with digital locks easily sets you back at least several hundred dollars.

## Solution

*Note: All prices stated are in USD referenced on AliExpress as of June 2021.*

The [R503](http://en.hzgrow.com/product/132.html) capacitive fingerprint reader is an affordable ($13) fingerprint sensor module made by [Hangzhou Grow Technology Co., Ltd](http://en.hzgrow.com/nav/9.html). There are many other models from that company, such as the [R307](http://en.hzgrow.com/product/103.html) optical variant. Adafruit has an [informative tutorial](https://learn.adafruit.com/adafruit-optical-fingerprint-sensor) on the hardware and wiring. All models are literally just the sensor, without any controller, electronic lock, nor even an enclosure, so we have to make our own.

Let's start with pairing a controller to it. The ESP8266 ($2) and ESP32 ($4) microcontroller platforms are probably the most popular and affordable WiFi IoT platforms out there now. As an opensource platform, there are many different kinds of firmware available for it. Personally I'm invested in [ESPHome](https://esphome.io/), a brilliantly-engineered opensource firmware written with Arduino (C++) and Python which brings the extensiblity concept of [Home Assistant](https://www.home-assistant.io/), a popular opensource smart home platform, to the ESP8266/32.

I have collaborated with [@OnFreund](https://github.com/OnFreund) to [contribute](https://github.com/esphome/esphome/pull/1356) an [official integration](https://esphome.io/components/fingerprint_grow.html) for the Grow Fingerprint Readers to ESPHome. Any fingerprint sensor that uses the Grow protocol can be paired with any ESP8266/32 board and flashed with the following ESPHome .yaml config:

```yaml
# Example configuration entry for a NodeMCU 1.0 ESP8266 board
esphome:
  name: my-fingerprint-reader
  platform: espressif8266
  board: nodemcuv2

uart:
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 57600

# Declare Grow Fingerprint Reader
fingerprint_grow:
  sensing_pin: GPIO12
```

Next up, let's get an electronic lock to go with it. Searching for "electronic bolt lock" yields many different kinds of electronic locks, get one that goes well with the door, on average it costs around $12. Take note of the voltage (V) and current (A) requirement, it'll be important when choosing the power supply.

To interface the lock (usually 12V) with the ESP8266/32 (3.3V), we will need a transistor board. Search for "mosfet module", costs <$1.

Finally, search for "12V power adapter" and get one ($2) that is the same voltage as the lock, the current has to be the same or higher.

The total bill of materials now adds up to $30, getting 4 sets amounts to $120, a far more affordable solution. In my opinion this is far superior and reliable than the commerical sets, as at the end of it you'll be able to connect and control it over WiFi, with your very own locally-run instance of Home Assistant. Also, all locks and electronics do break eventually and you can easily replace them since they're off-the-shelf commodities!