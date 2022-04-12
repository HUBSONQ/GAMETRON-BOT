const { token } = require("./config/config.js")
const Discord = require("discord.js")
const { Client } = require('discord.js');
const client = new Client();
const chalk = require('chalk');
const log = console.log
const commandHandler = require("./handlers/command.handler")

const settingsHandler = require("./handlers/settings.handler")

commandHandler(client)
settingsHandler(client)




client.on("ready", () => {
  log(chalk.yellow("Lubie ciasteczka!"))
  log(chalk.blue(`Zalogowano jako ${client.user.tag}!`))
  const time = (new Date().toLocaleTimeString())
  log(chalk.cyanBright(time))
 

  client.settings.forEach((config, guildId) => {
    const { guilds } = client
    // Check if guild exist
    if (guilds.has(guildId)) {
      const guild = guilds.get(guildId)
      // Check if available
      if (guild.available) {     
        // console.log("available")

        // Set Interval for each channel
        const clockChannels = config.clocks
        setInterval((fn) => {
          //const time = new Date().toLocaleTimeString().slice(0, 5)
          const time = new Date().toLocaleTimeString()
          const channelName = `🕥 ${time}`

          clockChannels.forEach((channelId, index) => {
            // Check if channel exists
            if (guild.channels.has(channelId)) {
              // log("channel exist")
              const channelToUpdate = guild.channels.get(channelId)
              channelToUpdate.setName(channelName)
            } else {
              // log("not exist")
              // Remove Id from config
              // that does not exist
              clockChannels.splice(index, 1)
              client.saveConfig(guildId)
            }
          })
          //log(channelName)
        },3000)
      }
    }
  })

 })
 


client.login(token)

client.on("debug", () => {})
client.on("error", () => {})
client.on("warn", () => {})