const GarageDoor = require("./garage-door.js");
const HomeKitGarage = require("./homekit.js");
const config = require('config-yml');

let i = 0;
while (config[i]) {
    const door = new GarageDoor(config[i].gpio);
    const homeKitDevice = new HomeKitGarage(door, config[i].hk);
    i++;
}
