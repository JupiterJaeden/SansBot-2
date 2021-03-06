const util = require("../utility.js"); 
const fs = require("fs"); 

class BotData { 
  static currentVersion = "2.0";

  commands = {}; //Object with all commands 
  triggers = []; //Array with all triggers

  //Version format: <major>.<minor>
  version = BotData.currentVersion; 

  constructor() {
    this.readCommandsFromDirectory(); 
    this.readTriggersFromDirectory(); 
  }

  readData(filename) {
    //Read data from JSON file (assumed to be inside data folder)
  }

  writeData(filename) {
    //Write data to JSON file (assumed to be inside data folder)
  }

  readCommandsFromDirectory() { 
    console.log("Reading all commands into commands object"); 
    this.commands = {}; 

    //For some EXTREMELY confusing reason, this doesn't work when you put in the actually correct path of "../commands", you have to instead use the following
    let fileNames = fs.readdirSync("./commands");

    for (let file of fileNames) {
      if (file.endsWith(".js")) {
        console.log(file);
        try {
          let module = require(`../commands/${file}`);
          this.commands[module.name.toLowerCase()] = module;
        } 
        catch (err) {
          console.log(err);
        }
      }
    }
  }

  readTriggersFromDirectory() { 
    console.log("Reading all triggers into triggers object"); 
    this.triggers = []; 

    //Same weirdness as with the commands folder
    let fileNames = fs.readdirSync("./triggers");

    for (let file of fileNames) {
      if (file.endsWith(".js")) {
        console.log(file);
        try {
          let module = require(`../triggers/${file}`);
          this.triggers.push(module); 
        } 
        catch (err) {
          console.log(err);
        }
      }
    }
  }

}

exports.BotData = BotData; 