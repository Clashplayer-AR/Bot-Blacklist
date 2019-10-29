const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    if(message.author.bot) return;
        message.delete(message.author);

        const args = message.content.slice(2).trim().split(/ +/g);

        const argsp = message.content.trim().slice(9)

        if(!argsp) return message.channel.send(`**Merci de mettre un id d'utilisateur.**`)

        client.fetchUser(args[1]).then(user => {
        
            

            if(!blacklist[args[1]]) return message.channel.send(`**<:565782461317906445:604187279790964751> L'id${argsp} ne semble pas être dans la blacklist .**`);

            let checkidtrueEmbed = new Discord.RichEmbed()
                .setTitle(" **CheckID :**")
                .setThumbnail(user.avatarURL)
                .addField(" **ID du BlackList :**", "`"+args[1]+"`")
                .addField(" **Nom du BlackList:**", "`"+user.tag+"`")
                .addField(" **BlackList : ?**", "`Cet utilisateur est dans la BlackList.`", )
                .addField("**Blacklisté le : **", "`"+blacklist[user.id].date+"`")
                .addField(" **Reason :**", `${blacklist[user.id].reason}`)
                .addField("**Blacklist par : **", "`"+blacklist[user.id].author+"`")
                //.addField(":fbleu: Raison du GBan :", "`"+args[2]+"`")
                .setFooter("© 2019 NYXOO-PROTECT V 1.0 ", client.user.displayAvatarURL)
                .setTimestamp()
                .setColor('#36393f')

                        if(blacklist[args[1]]) return message.channel.send(checkidtrueEmbed);
        }).catch((err) => {
    if (err) return message.channel.send(`Unknow ID`);
    });
}

module.exports.help = {
    name: "checkid"
}