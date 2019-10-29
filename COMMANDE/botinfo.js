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
            var datetime = 1555068377019;
            var date = new Date(datetime);
            var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
        };

            var result = date.toLocaleDateString('fr', options);
            var embed = new Discord.RichEmbed()
            .setColor("#36393f")
            .setTitle(`Information du bot **${client.user.tag}**`)
            .setThumbnail(client.user.avatarURL)
            .addField("Créer le:", `Le bot NYXOO-PROTECT a été créer le ${moment.utc(client.user.createdAt).format('LL')} .`)
            .addField("A quoi sert le bot", `Le bot sert a faire de la gestion sur notre serveur et a vous protéger et nous protéger.`)
            .addField("Prefix du bot", `Le préfix du bot est "n!"`)
            .addField("Horaire d'ouverture du bot", `Le bot est tout le temp connecter !`)
            .addField("Nombre de serveur et membres", `Le bot possède ${client.guilds.size} serveurs ainsi que ${client.users.size} membres et ainsi que ${client.channels.size} channels.`)
            .addField("Discriminatoire", `#${client.user.discriminator}`)
            .addField("Lien :", `[Invite bot](https://discordapp.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D604191753624354839%26scope%3Dbot%26permissions%3D805314622) | [Support](https://discord.gg/ddd74ef)`)
            .setTimestamp()
            .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0 ", client.user.displayAvatarURL)
            message.channel.send(embed)
}

module.exports.help = {
    name: "botinfo"
}