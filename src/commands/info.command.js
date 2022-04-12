const {RichEmbed} = require('discord.js');

module.exports = {
    name: "info",
    description: "BOT INFO",

    run(msg) {
        const {botAuthor, botVersion, botName, botDescription} = require("../config/config_info.js")
        
        const embed = new RichEmbed()
        .setTitle(`${botName}`)
        .setColor(0x9500ff)
        .setDescription(`${botDescription}`)
        .addField("Autor:", botAuthor, true)
        .addField("Wersja:", botVersion, true)
  
        msg.channel.send(embed)
  
        msg.delete()
  
   }
    
}