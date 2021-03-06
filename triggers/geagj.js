exports.name = "geagj"; 
exports.description = "geagj";

exports.main = function geagjTrigger(msg, botData) {
  if (msg.content.includes("geagj")) {
    msg.channel.send("geagj"); 
  }
}
