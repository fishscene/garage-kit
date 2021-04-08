const { 
  Service, 
  Accessory, 
  Characteristic, 
  Categories, 
  CharacteristicEventTypes, 
  uuid 
} = require("hap-nodejs");

class HomeKitGarage {
  constructor(hardware, config) {
    const { name, pin, uid, username, accessoryName, port } = config;
    this.garageDoor = new Service.GarageDoorOpener(name)    
    this.currentValue = 1;
    this.target = 0;
    this.hardware = hardware;

    const doorState = this.garageDoor.getCharacteristic(Characteristic.TargetDoorState);
    doorState.on(CharacteristicEventTypes.SET, this.setTargetState.bind(this));
    doorState.on(CharacteristicEventTypes.GET, this.targetState.bind(this));
    this.garageDoor.setCharacteristic(Characteristic.TargetDoorState, Characteristic.TargetDoorState.CLOSED);
    
    const currentState = this.garageDoor.getCharacteristic(Characteristic.CurrentDoorState);
    currentState.on(CharacteristicEventTypes.GET, this.currentState.bind(this));
    
    const obstruction = this.garageDoor.getCharacteristic(Characteristic.ObstructionDetected);
    obstruction.on(CharacteristicEventTypes.GET, this.obstruction.bind(this));
    
    const accessoryUuid = uuid.generate(uid);
    const accessory = new Accessory(accessoryName, accessoryUuid);
    accessory.addService(this.garageDoor);
    
    accessory.publish({
      username: username,
      pincode: pin,
      port: port,
      category: Categories.GARAGE_DOOR_OPENER,
    });
  }

  setTargetState(value, callback) {
    console.log("Setting door target, ", value);
    this.currentValue = value;
    this.target = value;
  
    const completion = () => {
      this.garageDoor.setCharacteristic(Characteristic.CurrentDoorState, value);
    }

    if (value == 0) {
      this.hardware.open(completion);
    } else {
      this.hardware.close(completion);
    }
  
    callback();
  }

  targetState(callback) {
    console.log("Getting door, ", this.target);
    callback(null, this.target);
  }

  currentState(callback) {
    console.log("Getting current, ", this.currentValue);
    callback(null, this.currentValue);
  }

  obstruction(callback) {
    console.log("Getting obstruction, ");
    callback(null, 0)
  }
}

module.exports = HomeKitGarage
