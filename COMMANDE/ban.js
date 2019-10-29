const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message, args) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    if(message.author.bot) return;
            let reason = message.content.split(" ").slice(2)
            message.delete()
            let messageArray = message.content.split(" ");
            let argsp = messageArray.slice(1);
            let lz4 = argsp.join(" ").slice(21);
        if(message.author.bot) return;
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Vous n'avez pas la permission d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Veuillez mentionner un utilisateur ")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Vous ne pouvez pas bannir cet utilisateur ")
        if (!member.bannable) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Je ne peux pas bannir cet utilisateur ")
        if (!reason) return message.reply("Merci de mettre une raison pour bannir cet utilisateur.")
        message.guild.ban(member)
        var banmessage = new Discord.RichEmbed()
        .setTitle("<:emoji_50:571683413669576705> Succès !")
        .setColor("#36393f")
        .setDescription(`**Vous avez réussi a bannir ${member} avec succès <:emoji_41:571681763827384320> !**`)
        .setTimestamp()
        .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0 ", client.user.displayAvatarURL)
        message.channel.send(banmessage)


        member.send(`Vous avez été banni du serveur ${message.guild.name} pour raison de **${lz4}** <:emoji_38:571681931016798218> !`)
}

module.exports.help = {
    name: "ban"
}