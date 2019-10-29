const Discord = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');
const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message, args) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    if(message.author.bot) return;
            
            var mention = message.mentions.users.first() || message.author
            const member = message.guild.member(mention);
            message.delete();
            var embed = new Discord.RichEmbed()
            .setColor("#36393f")
            .setThumbnail(client.user.avatarURL)
            .setTitle(`Informations de ${mention.tag} :`, mention.avatarURL)
            .addField("Tag :", `${mention.tag}`, true)
            .addField("ID :",`${mention.id}`, true)
            .addField("Status :",`${mention.presence.status}`, true)
            .addField('A rejoin le serveur le :', `${moment.utc(member.joinedAt).format('LL')}`, true)
            .addField('Crée le:', `${moment.utc(mention.createdAt).format('LL')}`, true)
            .addField("Jeux", message.guild.member(mention).presence.game ? message.guild.member(mention).presence.game.name : "Ne joue pas", true)
            .addField('Rôles', member.roles.map(roles => `${roles.name}`).join(', '), true)
            .setTimestamp()
            .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0 ", client.user.displayAvatarURL)
            message.channel.send(embed)
}

module.exports.help = {
    name: "userinfo"
}