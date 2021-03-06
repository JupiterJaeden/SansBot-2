exports.name = "help"; 
exports.description = "Prints a list of all commands"

exports.main = function helpCommand(msg, tokens, botData) {
  for (let name in botData.commands) { 
    msg.channel.send(
      `${name}: ${botData.commands[name].description}\n`
    ); 
  }
}

