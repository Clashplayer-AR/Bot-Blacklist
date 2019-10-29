const Discord = require('discord.js')

const moment = require('moment');
require('moment-duration-format');
moment.locale('fr');

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

const staff = JSON.parse(fs.readFileSync("./json/staff.json", "utf8"))

module.exports.run = (client, message) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }

    const args = message.content.slice(2).trim().split(/ +/g);

    const argsp = message.content.trim().slice(9)

    if(!argsp) return message.channel.send(`**Merci de mettre un id d'utilisateur.**`)
    
    client.fetchUser(args[1]).then(user => {
        if(blacklist[user.id] && staff[user.id]){
            var embed = new Discord.RichEmbed()
            .setTitle(`Lookup **${user.tag}**`)
            .setColor('#36393f')
            .setThumbnail(user.avatarURL)
            .addField('Pseudo :', `**${user.tag}**`)
            .addField('ID :', `**${user.id}**`)
            .addField('Compte créer le :', `**${moment.utc(user.createdAt).format('LL')}**`)
            .addField('Bot ou humain :', user.bot ? "**Bot**" : "**Humain**")
            .addField('Grade :', `**${staff[user.id].grade}**`)
            .addField('Blacklist :', `**${blacklist[user.id].reason}**`)
            message.channel.send(embed)
        }

        if(blacklist[user.id] && !staff[user.id]){
            var embed = new Discord.RichEmbed()
            .setTitle(`Lookup **${user.tag}**`)
            .setColor('#36393f')
            .setThumbnail(user.avatarURL)
            .addField('Pseudo :', `**${user.tag}**`)
            .addField('ID :', `**${user.id}**`)
            .addField('Compte créer le :', `**${moment.utc(user.createdAt).format('LL')}**`)
            .addField('Bot ou humain :', user.bot ? "**Bot**" : "**Humain**")
            .addField('Grade :', `**Utilisateur**`)
            .addField('Blacklist :', `**${blacklist[user.id].reason}**`)
            message.channel.send(embed)
        }

        if(!blacklist[user.id] && staff[user.id]){
            var embed = new Discord.RichEmbed()
            .setTitle(`Lookup **${user.tag}**`)
            .setColor('#36393f')
            .setThumbnail(user.avatarURL)
            .addField('Pseudo :', `**${user.tag}**`)
            .addField('ID :', `**${user.id}**`)
            .addField('Compte créer le :', `**${moment.utc(user.createdAt).format('LL')}**`)
            .addField('Bot ou humain :', user.bot ? "**Bot**" : "**Humain**")
            .addField('Grade :', `**${staff[user.id].grade}**`)
            message.channel.send(embed)
        }

        if(!blacklist[user.id] && !staff[user.id]){
            var embed = new Discord.RichEmbed()
            .setTitle(`Lookup **${user.tag}**`)
            .setColor('#36393f')
            .setThumbnail(user.avatarURL)
            .addField('Pseudo :', `**${user.tag}**`)
            .addField('ID :', `**${user.id}**`)
            .addField('Compte créer le :', `**${moment.utc(user.createdAt).format('LL')}**`)
            .addField('Bot ou humain :', user.bot ? "**Bot**" : "**Humain**")
            .addField('Grade :', `**Utilisateur**`)
            message.channel.send(embed)
        }
    }).catch(err => {
      message.channel.send('Merci de mettre un **id** d\'utilisateur')
    })
}

module.exports.help = {
    name: "lookup"
}