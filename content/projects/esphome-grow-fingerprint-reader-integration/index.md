---
title: ESPHome - Grow Fingerprint Reader Integration
description: New component to integrate Grow fingerprint readers into the ESPHome project.
thumbnail: r503.jpg
start: 2020-10-04T14:59:57.744Z
end: 2021-04-04T14:59:57.752Z
---
## Intro

There are many options available for door access control. The traditional mechanical pin tumbler lock and key is the simplest and most ubiquitous. Next are the numeric combination, keypad, RFID, and biometric (e.g. fingerprint, facial recognition).

A client has a premises with many rooms, with each room secured with a set of mechanical locks and keys. This has caused chronic issues with key management, as keys have to be duplicated and issued to every staff, with the prevalent risks of **loss**, **theft**, and **operational inefficiencies** as the staff have to remember to bring the correct key to access a particular room. After investigating existing commercial digital locks and networked access control systems, the client has deemed the cost of implementation to be infeasible.

## Problem

Numeric combination locks, although keyless, comes with the inherent risk of accidental or negligent disclosure as it requires the combination to be known by many people.

Most digital door locks come as a complete unit, swap-in replacement for traditional mechanical locks. They also cost hundreds of dollars per unit (as of June 2021). This makes it prohibitively **expensive to scale**. They are also usually battery-operated, which **requires regular replacement**.

For networked access control systems, they are mostly targeted at commercial markets and thus have proprietary protocols and software, and also high in costs.

## Solution

*Note: All prices stated are in USD referenced on AliExpress as of June 2021.*

The [R503](http://en.hzgrow.com/product/132.html) capacitive fingerprint reader is an affordable ($13) fingerprint sensor module made by [Hangzhou Grow Technology Co., Ltd](http://en.hzgrow.com/nav/9.html). There are many other models from that company, such as the [R307](http://en.hzgrow.com/product/103.html) optical variant. Adafruit has an [informative tutorial](https://learn.adafruit.com/adafruit-optical-fingerprint-sensor) on the hardware and wiring. All models are literally just the sensor, without any controller, electronic lock, nor even an enclosure, so I have set out to design a complete solution for it.

For the controller, the ESP8266 ($2) and ESP32 ($4) microcontroller platforms are probably the most popular and affordable WiFi IoT platforms out there now, with many different kinds of firmware available for it. I have elected to use [ESPHome](https://esphome.io/), a brilliantly-engineered opensource ESP8266/32 firmware generator written with Arduino (C++) and Python which brings the extensibility concept of [Home Assistant](https://www.home-assistant.io/), a popular opensource smart home platform, to the ESP8266/32.

In collaboration with [@OnFreund](https://github.com/OnFreund), we have [contributed](https://github.com/esphome/esphome/pull/1356) an [official integration](https://esphome.io/components/fingerprint_grow.html) for the Grow Fingerprint Readers to ESPHome. Any fingerprint sensor that uses the Grow protocol can be paired with any ESP8266/32 board and flashed with the following ESPHome .yaml config:

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

With an open hardware platform, off-the shelves commodity components can be sourced:

Electronic bolt door locks costs around $12 on average.

Other parts that are required are a MOSFET transistors(<$1), voltage regulators (<$1) and power adapters ($2).

What's left is to engage an electrical contractor to lay the wiring, and install commodity wall-mounted enclosure boxes at each of the doors to house the reader and the electronics.

The total bill of materials for each set now adds up to $30 - far more affordable and scalable. In fact, it may as well be insignificant compared to the labour and materials required for wiring and installation. As it is inherently WiFi-based, it can connect to the premises' existing WiFi network, perhaps in its own VLAN for security, negating the need to run seperate data cables required for commercial access control systems like Wiegand or RS485.

In my opinion this is far superior and reliable than the commerical solutions, as it affords the capabilties of networked access control systems, but with commodity hardware and opensource software with a locally-run instance of Home Assistant. Every door can be controlled and monitored through the Home Assistant web frontend. Cost of maintenance is also minimized as all components are low in costs, in huge supply and easily replaceable.