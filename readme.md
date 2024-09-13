# GarageKit

A node app that runs on a Raspberry Pi that can control garage doors using HomeKit
Youtube Video: https://www.youtube.com/watch?v=-h3uSNCeCGY

## Parts

- [Raspberry Pi Zero W](https://www.amazon.ca/Raspberry-Pi-Zero-W/dp/B06XFZC3BX/ref=sr_1_3?dchild=1&keywords=raspberry+pi+zero+w&qid=1618610772&s=electronics&sr=1-3)
- [Relay](https://www.amazon.ca/COVVY-Channel-Expansion-Triggered-Arduino/dp/B07VRNRWJ8/ref=pd_sbs_1?pd_rd_w=4cOWH&pf_rd_p=73696620-9c76-4b06-8f98-d922b7ad22e2&pf_rd_r=MVXMYGFYGX3AHS5MJHBK&pd_rd_r=692e3a7b-4dcb-49af-ba8a-b2ce0e55f429&pd_rd_wg=kCfJo&pd_rd_i=B07VRNRWJ8&psc=1)
- [Reed Switche (NO)](https://www.amazon.ca/Mxfans-Magnetic-Proximity-Contact-110-220V/dp/B07DXJL818/ref=sr_1_8?dchild=1&keywords=reed+switch&qid=1618610902&s=hi&sr=1-8)

## Installing

1. create a config file at the project root, `config.yml` that looks like this (supports multiple garages):

```yml
- hk:
    uid: hap.garage.door
    pin: 678-90-876
    accessoryName: Dave's Garage Door
    username: 17:51:0A:F4:BC:82
    name: garage door
    port: 47128
  gpio:
    pin: 14
    sensorPin: 6
```

2. Install dependancies using `yarn install`
3. Run the app, `yarn start`
4. Add the accessory using the iOS Home.app
