const Discord = require('discord.js')

const fs = require('fs')

const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));

module.exports.run = (client, message) => {

    if(blacklist[message.author.id]){
        return message.channel.send('**Vous êtes dans la liste noir du bot, donc vous ne pouvez pas utilisez le bot.**')
    }

    if (!message.guild) return

     
let args = message.content.trim().split(/ +/g)

        
        if(message.author.bot) return;
            message.delete()
    let count = args[1]
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("<:5316_Error_512x512_by_DW:604190444179423235> Vous n'avez pas la permission d'utiliser cette commande").then(message => message.delete(2500))

            

            if (!count) return message.channel.send("**Veuillez indiquer un nombre de messages à supprimer.**")

            if (isNaN(count)) return message.channel.send("**Veuillez indiquer un nombre valide de message a supprimer.**")

            if (count < 1 || count > 1000) return message.channel.send("**Veuillez mettre un nombre entre 1 et 1000 <:5316_Error_512x512_by_DW:604190444179423235> !**").then(message => message.delete(2500))

            message.channel.bulkDelete(parseInt(count) + 1)
            
            var embed = new Discord.RichEmbed()
            
            .setTitle("<:1697_Success_512x512_by_DW:604190338676031488> Succès !")
            .setColor("#36393f")
            .setDescription(`**Vous avez réussi a supprimé ${count} message(s) <:Clear:612962620919644171> !**`)
            .setTimestamp()
            .setFooter("© 2018-2019 NYXOO-PROTECT V 1.0", client.user.displayAvatarURL)
            if (!count < 1 || count > 1000) return message.channel.send(embed).then(message => message.delete(2500))
}

module.exports.help = {
    name: "clear"
}