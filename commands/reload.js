exports.name = "reload"; 
exports.description = "Reloads all commands & triggers (in theory)";

exports.main = function reloadCommand(msg, tokens, botData) {
  console.log("Reload command triggered, reloading all command modules..."); 
  botData.readCommandsFromDirectory(); 

  console.log("Reloading all trigger modules..."); 
  botData.readTriggersFromDirectory();

  msg.channel.send("Commands & triggers reloaded!"); 
}

