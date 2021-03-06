/*
copy this into your browser to invite bot:
https://discordapp.com/oauth2/authorize?scope=bot&client_id=517053526418128899
*/

//Libraries
const Discord = require("discord.js");
const fs = require("fs");
const util = require("./utility.js");
let keepAlive = require('./keep_alive.js');

//Class libraries
const lib_lexer = require("./classes/lexer.js");
const lib_botdata = require ("./classes/botdata.js"); 

//Bot token definition (repl.it based)
const token = process.env.DISCORD_BOT_SECRET;

//Important variable definitions
let client = new Discord.Client();
let defaultCommandPrefix = "&";
let lexer = new lib_lexer.Lexer(" \n"); 
let botData = new lib_botdata.BotData(); 

client.on("ready", () => {
  console.log("You're gonna have a bad time");
  console.log(client.user.username);
});

//TODO: read botData from JSON file

console.log("Logging into client..."); 
client.login(token);
console.log("client.login() has been called")

client.on("guildCreate", guild => {
  //TODO: Log guild data
});

client.on("message", async function(msg) {
  let content = msg.content; 

  if (typeof(content) != "string" || msg.author.bot || msg.guild == null) {
    return;
  }

  let prefix = ""; 

  if (content.includes(`<@${client.user.id}>`)) {
    prefix = `<@${client.user.id}>`;
  }
  else if (content.includes(`<@!${client.user.id}>`)) {
    prefix = `<@!${client.user.id}>`;
  }
  else {
    prefix = defaultCommandPrefix; 
    //TODO: Custom prefixes for each guild
  }

  if (content.substr(0, prefix.length) == prefix) {
    //This is an attempt to communicate to the bot!
    try {
      //Removing prefix 
      content = content.replace(prefix, ""); 

      //Getting array of tokens  
      let tokens = lexer.tokenizeString(content); 

      //Getting command name
      let commandName = tokens.shift().toLowerCase(); 

      if (botData.commands.hasOwnProperty(commandName)) {
        //Running command script
        botData.commands[commandName].main(msg, tokens, botData); 
      }
      else {
        msg.channel.send("Invalid command!"); 
      }
    }
    catch (err) {
      console.log(err);
      console.log("Could not process a command. msg.content: \n" + msg.content);
    }
  } 
  
  //TODO: Add ability to process every message, regardless of whether it is or is not a command

}); //End of client message event handler
