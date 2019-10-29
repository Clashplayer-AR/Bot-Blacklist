const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message, args) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    if(message.author.bot) return;
        if (!message.channel.name.startsWith(`ticket-`)) {
        const embed8 = new Discord.RichEmbed()
        .setColor("#36393f")
        .addField(`Ticket`, `Vous devez être dans un salon de ticket.`)
        message.channel.send({ embed: embed8 });
        return
        }

        const embed9 = new Discord.RichEmbed()
        .setColor("#36393f")
        .addField(`Ticket`, 'Tapez \`n!confirmer\` pour confirmer.')
        message.channel.send({ embed: embed9 })
        .then((m) => {
        message.channel.awaitMessages(response => response.content === 'n!confirmer', {
            max: 1,
            time: 15000,
            errors: ['time'],
        })
        .then((collected) => {
            message.channel.delete();
            })
            .catch(() => {
            m.edit('').then(m2 => {
                m2.delete();
            }, 3000);
            });
        });
}

module.exports.help = {
    name: "add"
}
