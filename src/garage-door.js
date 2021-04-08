const { Gpio } = require("onoff");

class GarageDoor {
    
    constructor( { pin } ) {
        this.remote = new Gpio(pin, 'out');
        this.remote.writeSync(0);
    }

    open(callback) {
        console.log("opening");
        this.toggleSwitch(callback);
    }

    close(callback) {
        console.log("closing");
        this.toggleSwitch(callback);
    }

    toggleSwitch(callback) {
        this.remote.writeSync(1);
        setTimeout( _ => {
            this.remote.writeSync(0);
            callback();
        }, 1000)
    }
}

module.exports = GarageDoor;