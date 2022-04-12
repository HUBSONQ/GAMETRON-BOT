const { CategoryChannel, Message } = require("discord.js");

module.exports = {
    name: "clearall",
    description: "Usuwa czat!",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 5,
    aliases: ["purge all", "ca"],

    run ( msg, args ) {

        const { channel, guild, client } = msg


          
        channel.clone()
         .then(clone => console.log(`Cloned ${channel.name} to make a channel called ${clone.name}`))
         .catch(console.error);

         channel.delete('Making room for new channels')
         .then(deleted => console.log(`Deleted ${deleted.name} to make room for new channels`))
         .catch(console.error);

    }
}