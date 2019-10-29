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
            message.delete();
            var embed = new Discord.RichEmbed()
            .setColor("#36393f")
            .setTitle(`Information du serveur`)
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("Nom du serveur : ", `${message.guild.name}`, true)
            .addField("Créateur du serveur :", `${message.guild.owner.user.username}`, true)
            .addField("Nombre d'utilisateur totale :", `${message.guild.memberCount}`, true)
            .addField("Humains", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size)
            .addField("Bots", message.guild.members.filter(m => m.user.bot).size)
            .addField("Nombre de rôle :", `${message.guild.roles.size}`, true)
            .addField("Région :", `${message.guild.region}`)
            .addField('Tu as rejoins le :', moment.utc(message.member.joinedAt).format('LL'))
            .addField("Date de création :", moment.utc(message.guild.createdAt).format('LL'))
            .addField('Rôles', message.guild.roles.map(roles => `${roles.name}`).join(', '), true)
            .addField("Activité", "``"+message.guild.members.filter(mem => mem.presence.status === "online").size+"`` *En ligne* \n``"+message.guild.members.filter(mem => mem.presence.status === "idle").size+"`` *Idle* \n``"+message.guild.members.filter(mem => mem.presence.status === "dnd").size+"`` *Ne pas déranger* \n``"+message.guild.members.filter(mem => mem.presence.status === "offline").size+"`` *Invisible* \n", true)
            .setTimestamp()
            .setFooter("© 2018-2019  NYXOO-PROTECT V 1.0", client.user.displayAvatarURL)
            message.channel.send(embed)
}

module.exports.help = {
    name: 'serveurinfo'
}