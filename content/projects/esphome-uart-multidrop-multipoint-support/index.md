---
title: ESPHome - UART Multidrop/Multipoint Support
description: Extend existing ESPHome UART component to interface multiple
  devices on one UART bus.
thumbnail: uart.png
projectStart: 2021-04-07T02:35:11.648Z
projectEnd: 2021-06-14T21:03:36.078Z
---
## Intro

I started this project as some smart home devices like automatic window closers, blinds and curtain motors I'm importing from China supports RS485, a serial communication standard that's capable of being wired in a multidrop bus.

I currently use ESP32 WiFi microcontrollers with the [ESPHome](https://esphome.io) firmware to link up smart home devices to my locally-run instance of [Home Assistant](https://www.home-assistant.io). Its opensource nature allows for rapid prototyping, testing and deployment of all kinds of IoT solutions.

## Problem

ESPHome's current implementation of the UART bus allows for one-to-one communication to a single serial device. This means there needs to be one ESP8266/32 module for each smart home device in a premises (i.e. one for each door, window, blinds, curtain, lighting, aircon etc.) which quickly congests the WiFi network.

## Solution

We can leverage RS485 to link up multiple devices to a single ESP8266/32 controller. ESPHome's architecture allows for integrations to exist as its own class. I have written [integrations](https://github.com/esphome/esphome/pull/1670) for each RS485-enabled smart home device, which all interface with a middleware 'hub' component.

![RS485 Devices in a Multidrop Configuration](1.png "RS485 Devices in a Multidrop Configuration")

For all data that is received on the UART bus, the hub component forwards them verbatim to every instantiated instance of RS485 integrations. These integrations process the bytes into frames and act accordingly when it's a valid frame addressed to it.

All sending is also done through the hub component, with frames enqueued to be transmitted on the UART bus whenever the RS485 bus is available (i.e. when not awaiting a response from a RS485 device).

ESPHome components written as part of this project:

1. `UARTMulti` 'hub' component, the parent component for the below:
2. `Chenyang` window closer cover component
3. `Dooya` blinds motor cover component
4. `GM40` curtain motor cover component

Example ESPHome .yaml config:

```yaml
# Example configuration entry for a NodeMCU 1.0 ESP8266 board
esphome:
  name: my-cover
  platform: espressif8266
  board: nodemcuv2

uart:
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 9600

# Declare Covers
cover:
  - platform: dooya
    name: Dooya Shade
    address: 0xFEFE
    device_class: shade
  - platform: chenyang
    name: Chenyang Window
    address: 0xFF
    device_class: window
  - platform: gm40
    name: GM40 Curtain
    address: 0x00
    device_class: curtain
```

## Result

To date, I have implemented this integration in the following deployments:

* 2 sets of (2x Chenyang window openers, 1x GM40 curtain motor)
* 2 sets of (1x Chenyang window openers, 1x GM40 curtain motor)
* 1 set of (1x Chenyang window opener, 1x Dooya shade motor)