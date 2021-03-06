exports.name = "reload"; 
exports.description = "Reloads all commands from the commands/ directory into botData.commands"

exports.main = function reloadCommand(msg, tokens, botData) {
  console.log("Reload command triggered, reloading all command modules..."); 
  botData.readCommandsFromDirectory(); 

  msg.channel.send("Commands reloaded!"); 
}

