# GarageKit

A node app that runs on a Raspberry Pi that can constrol garage doors using HomeKit

## Installing

create a config file at the project root, `config.yml` that looks like this:

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
```

1. Install dependancies using `yarn install`
2. Run the app, `yarn start`
3. Add an accessory using the iOS Home.app
