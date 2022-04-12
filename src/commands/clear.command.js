module.exports = {
    name: "clear",
    description: "Usuwa czat!",
    args: true,
    usage: "<amount>",
    guildOnly: true,
    cooldown: 5,
    aliases: ["purge", "c"],

    run ( msg, args ) {
        const { channel } = msg

        const amount = parseInt(args[0])

        if (!Number.isInteger(amount)) {
            return channel.send("Podaj ile wiadomości chcesz usunąć?")

        }

        if (amount < 2) {
            return channel.send("Za mało minimum 1!!")
        }

        if (amount >= 101) {
            return channel.send("Za dużo maksymalnie 100!!")
        }

        channel.bulkDelete(amount)


        
        msg.reply(`Usunął ${amount} wiadomości`)
        channel.bulkDelete(2)
    }
}