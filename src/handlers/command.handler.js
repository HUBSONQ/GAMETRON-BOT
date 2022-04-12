const { Collection } = require("discord.js")

const {readdirSync} = require("fs")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Command", "Load status")

const {prefix} = require("../config/config.js")

const chalk = require('chalk');


module.exports = (client) => {
    client.commands = new Collection()
    const cooldowns = new Collection()

    const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
      file.endsWith(".command.js"),
    )

    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)
    

    if (command.name) {
        client.commands.set(command.name, command)
        table.addRow(file, "✅")
    } else {
        table.addRow(file, "❌")
        continue
    }



    }

    console.log(table.toString())



       
       client.on("message", (msg) => {
         const { author, guild, channel } = msg
       
        if (author.bot){
         return
        }
       
        if (!msg.content.startsWith(prefix)) return
       
        const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g)
       
        const cmdName = args.shift().toLowerCase()
       
//      Wyświetlanie komend w konsoli  
        console.log(chalk.rgb(0,242,255)(cmdName))

//      Działanie aliasów 
        const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))

        if (!cmd) return
        
//      Blokada używania komend w DM
        if (cmd.guildOnly && msg.channel.type !== "text") {
            return msg.reply("Nie można używać w wiadomościach prywatnych!")
        }

//      Sprawdzanie czy są argumentów
        if (cmd.args && !args.length){
            let reply = `Nie wysłałeś żadnego argumentu ${msg.author}!`

//          Jak poprawnie używać
            if (cmd.usage) {
                reply +=`\nPoprawne użycie: \`${prefix}${cmdName} ${cmd.usage}\``
            }

            return msg.channel.send(reply)
        }

//      Sprawdzanie cooldawn
        if (!cooldowns.has(cmdName)) {
            cooldowns.set(cmdName, new Collection())
        }

        const now = Date.now()
        const timestamps = cooldowns.get(cmdName)
        const cooldownAmount = (cmd.cooldown || 3) * 1000

//      Dodaje cooldown
        if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return msg.reply(`Poczekaj ${timeLeft.toFixed(1,)} sekund zanim użyjesz \`${cmdName}\``)
            }
        }

//      Usuwa cooldown
        timestamps.set(msg.author.id, now)
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

//      Sprawdzanie czy komenda działa   
        try {
            cmd.run(msg, args)
        } catch(error) {
            console.log(error)
            msg.reply("Ta komenda nie działa. Zgłoś to administracji!")
        }
       
       })
}
