const { Gpio } = require("onoff");

class GarageDoor {
    
    constructor( { pin, sensorPin } ) {
        this.pin = sensorPin;
	    this.trigger = new Gpio(pin, 'out');
        this.closeSensor = new Gpio(sensorPin, 'in', 'both');
        this.closeSensor.watch(this.sensorDidChange.bind(this));
        this.trigger.writeSync(0);
    }

    open(callback) {
        this.toggleSwitch(callback);
    }

    close(callback) {
       	if (this.isClosed()) { 
     		console.log("Skipping close");
		    return; 
	    }
        this.toggleSwitch(callback);
    }

    toggleSwitch(callback) {
        this.trigger.writeSync(1);
        setTimeout( _ => {
            this.trigger.writeSync(0);
            callback();
        }, 500)
    }

    sensorDidChange(err, value) {
        console.log(`sensor ${this.pin} changed: `, value);
        this.callback(value);
    }

    isClosed() {
        return this.closeSensor.readSync() == 0;
    }
}

module.exports = GarageDoor;
