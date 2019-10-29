const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = async (client, message) => {
    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }
    try{
        
    message.delete()
    
    
    let messageArray = message.content.split(" ")
    let args = messageArray.slice(0)
    let messagep = args.join(" ").slice(9)
    var serv = await client.guilds.get(message.guild.id)
    var channellog = client.channels.find("id", "603899994394853376")
    if(!messagep) return message.reply("** Pour demander une urgence, merci de mettre une raison, nous n'acceptons pas les urgence sans raison pour éviter une mauvaise utilisation de la commande.**")
    message.reply("**<:alerte:603918351273820169> Urgence envoyé au staff de NYXOO-PROTECT, un membre du staff arriverra dans pas longtemp ! ** ")
    let embedlogs = new Discord.RichEmbed()
    .setTitle("Il y a une urgence !")
    .setDescription(`ID DU SERVEUR  : ${message.guild.id}`)
    .setColor("#36393f")
    .addField("Raison de l'urgence :", `${messagep}`)
    .addField("Serveur :", `Faite une invation a partir de la commande d/getinvite <id> pour aller sur le serveur nommé **${message.guild.name}** avec l'id **${message.guild.id}** !`)
    .addField("Auteur :", `L'auteur de cette urgence est **${message.author.tag}** avec id **${message.author.id}** !`)
    .setTimestamp()
    .setFooter("© 2018-2019 NYXOO-PRTECT V 1.0", client.user.displayAvatarURL)
    channellog.send(embedlogs)
    serv.channels.find(channel => {
        if(!serv.member(client.user).hasPermission("CREATE_INSTANT_INVITE")) return chanlogs.send(`Le bot n'a pas la permission de créer d'invitation !`)
        if(serv.member(client.user).hasPermission("CREATE_INSTANT_INVITE")){
            if(channel.type === `text`) return channel.createInvite(maxAges=0).then(invite => channellog.send(`Lien d'invitation : \n${invite.url}`)) 
        }
    })  
    channellog.send(`**<@&593474177336475650>**`)
    
    }catch(e){console.log("[ERROR]", e)}
        console.log(times+"\x1b[36m%s\x1b[0m","[INFO]","\x1b[0m","Command: "+"urgence"+" executed | By: "+message.author.displayName+" | In server: "+message.guild.name);

    
}



module.exports.help = {
    name: "urgence"
}