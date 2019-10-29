const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message, args) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    if(message.author.bot) return;
        if (!message.channel.name.startsWith(`ticket-`)) {
        const embed6 = new Discord.RichEmbed()
        .setColor("#36393f")
        .addField(`Ticket`, `Vous devez être dans un salon de ticket.`)
        message.channel.send({ embed: embed6 });
        return
        }
        removedmember = message.mentions.members.first();
        message.channel.overwritePermissions(removedmember, { SEND_MESSAGES : false, VIEW_CHANNEL : false});
        const embed7 = new Discord.RichEmbed()
        .setColor("#36393f")
        .addField(`Ticket`, '**' + removedmember + '** a été retirer du ticket.')
        message.channel.send({ embed: embed7 });
    
}

module.exports.help = {
    name: "remove"
}