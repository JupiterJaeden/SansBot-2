const util = require("../utility.js"); 
const fs = require("fs"); 

class BotData { 
  static currentVersion = "2.0";

  /* NON-SERIALIZED */ 
  commands = {}; //Object with all commands 

  /* SERIALIZED */ 
  version = BotData.currentVersion; //Version format: <major>.<minor>

  constructor() {
    this.readCommandsFromDirectory(); 
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
        let module; 
        try {
          module = require(`../commands/${file}`);
        } 
        catch (err) {
          console.log(err);
        }
        this.commands[module.name.toLowerCase()] = module;
      }
    }
  }

}

exports.BotData = BotData; 